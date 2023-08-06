# vite 插件

插件是什么？

vite 会在生命周期的不同阶段中去调用不同的插件以达到不同的目的

> 生命周期：vite 从开始执行到执行结束，那么这整个过程就是 vite 的生命周期，vite、webpack、vue、react、redux 等都有自己的生命周期

## 使用插件

```js
import { ViteAliases } from "vite-aliases";
{
  // ...,
  plugins: [
    ViteAliases({
      // ...options
    }),
  ];
}
```

## 创建自定义插件

在 plugins 数组里的每一个插件都是一个配置对象，该对象包含多个生命周期钩子，这些钩子会在 vite 生命周期的适当时机被调用，以处理不同时期的产物

在插件中，你可以直接 export 一个带生命周期钩子的对象[查看示例](#export-config-obj)，用来覆盖某些配置，也可以导出一个函数用来生成带生命周期钩子的对象，这样就可以传入一些插件配置

vite 是基于 rollup 构建的，使用 rollup 的打包能力来处理项目中的代码，所以 vite 的插件包括兼容 rollup 的插件和 vite 专属的插件

**vite 独有的生命周期钩子：**

1. config：用来修改配置的钩子，具体信息可以看下面的手写 [vite-aliases](#vite-aliases) 插件的注释
2. transformIndexHtml: 修改模板 html，具体信息可以看下面的手写 [CreateHtmlPlugin](#CreateHtmlPlugin) 插件的注释
3. configureServer: 可以用来修改 vite-server 的钩子，server 对象会作为参数传给它。钩子将在内部中间件被安装前调用，所以自定义的中间件将会比内部中间件早运行。如果想注入一个在内部中间件之后运行的中间件，可以返回一个函数，可看下面的 [VitePluginMock](#VitePluginMock)
4. configResolved: 整个配置文件的解析流程完全完毕以后会走的钩子，参数为最终的配置对象
5. configurePreviewServer: 与 configureServer 相同，但用于预览服务器

rollup 兼容的钩子：

具体查看 rollup 文档：[https://cn.rollupjs.org/plugin-development/](https://cn.rollupjs.org/plugin-development/)

<a name="export-config-obj"></a>

```js
// 直接导出一个配置对象
// 下面代码覆盖了vite.config.js中的 assetsInlineLimit 配置大小
module.exports = {
  config() {
    return {
      build: {
        assetsInlineLimit: 409600000, // 将图片大小小于该值的，转化为base64，默认为4kb
      },
    };
  },
};
```

<a name="vite-aliases"></a>

```js
// 导出一个函数
// 下面手写一个 vite-aliases 插件
const path = require("path");
const fs = require("fs");

const getFolders = (dirList = [], basePath) => {
  return dirList.filter((dir) => {
    const stat = fs.statSync(path.resolve(__dirname, `${basePath}/${dir}`));
    return stat.isDirectory();
  });
};

const getResolveAlias = (basePath = "") => {
  const dirs = fs.readdirSync(path.resolve(__dirname, basePath));
  const folders = getFolders(dirs, basePath);
  const alias = folders.reduce(
    (prev, folder) => {
      return {
        ...prev,
        [`@${folder}`]: path.resolve(__dirname, `${basePath}/${folder}`),
      };
    },
    {
      "@": path.resolve(__dirname, basePath),
    }
  );
  return alias;
};

module.exports = () => {
  return {
    // config 函数可以返回一个对象，这个对象是部分的viteConfig配置
    config(config, env) {
      // config: 目前的配置对象
      // env: {mode, command, ssrBuild}
      // mode 为环境（production），command为执行的命令（dev，build）,ssrBuild 跟服务端渲染有关
      const alias = getResolveAlias("../src");
      return {
        resolve: {
          alias,
        },
      };
    },
  };
};
```

<a name="CreateHtmlPlugin"></a>

```js
// CreateHtmlPlugin.js
module.exports = (options) => {
  return {
    // html是原始的html文件内容，ctx为请求的执行上下文 methods,url,header。。。
    // 这个钩子可能执行时机比较晚，就可能导致其他读取html的插件读到 <%= title %> 然后报错，因此需要将它的执行时机提前
    // transformIndexHtml(html, ctx) {
    //   return html.replace(/<%= title %>/g, options.inject.data.title);
    // },
    transformIndexHtml: {
      enforce: "pre", // 改写成对象形式，并加入该参数就能让它的执行时机提前
      transform(html, ctx) {
        return html.replace(/<%= title %>/g, options.inject.data.title);
      },
    },
  };
};

// config.js
import CreateHtmlPlugin from "./plugins/CreateHtmlPlugin";
{
  // ...,
  plugin: [
    CreateHtmlPlugin({
      inject: {
        data: {
          title: "home",
        },
      },
    }),
  ];
}
```

<a name="VitePluginMock"></a>

```js
// VitePluginMock.js
const path = require("path");
const fs = require("fs");

const getMockData = (mockPath) => {
  // 因为不知道用户的目录结构是怎么样的，所以不能使用__dirname，一般项目运行在根目录，所以直接使用process.cwd()获得根目录
  const dirPath = path.resolve(process.cwd(), `./${mockPath}`);
  const mockStat = fs.statSync(dirPath);
  let mockData = [];
  if (mockStat.isDirectory()) {
    const children = fs.readdirSync(dirPath);
    children.forEach((child) => {
      const childPath = path.resolve(dirPath, `./${child}`);
      mockData.push(...(require(childPath) || []));
    });
  } else {
    mockData.push(...(require(dirPath) || []));
  }
  return mockData;
};

export default (options) => {
  // 做的最主要的事情就是拦截http请求
  const { mockPath = "mock" } = options || {};
  return {
    configureServer(server) {
      // 添加中间件
      server.middlewares.use((req, res, next) => {
        const mockData = getMockData(mockPath);
        const target = mockData.find(
          (item) => item.method === req.method && item.url === req.url
        );
        if (target) {
          res.writeHead(200, { "Content-type": "application/json" });
          res.end(JSON.stringify(target.response({})));
        } else {
          next();
        }
      });
    },
  };
};

// /mock/index.js
const mockJS = require("mockjs");

const list = mockJS.mock({
  "data|100": [
    {
      name: "@cname", // 生成中文名
      ename: mockJS.Random.name(), // 生成英文名
      time: "@time", // 生成时间
      date: "@date", // 生成日期
      avatar: mockJS.Random.image("100x100"),
    },
  ],
});

module.exports = [
  {
    method: "POST",
    url: "/api/users",
    response: ({ body }) => {
      // body -> 请求体
      return {
        code: 0,
        msg: "success",
        ...list,
      };
    },
  },
];
```
