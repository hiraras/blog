## vite

### 相较于 webpack 的优势

webpack 会对所有模块进行转化，每次修改一个文件的代码会对所有用上的文件执行这个操作，所以当项目一大起来会在开发时有卡顿，而 vite 类似于按需加载，每次只会解析正在被用到的文件，所以速度会很快

### vite 会不会取代 webpack？

不会，vite 是基于 es module 的，webpack 支持多种模块化，侧重点不一样，webpack 更多的关注兼容性，vite 侧重浏览器端的开发

### 安装

```
yarn create vite
```

1. 帮我们全局安装一个东西：create-vite (vite 的脚手架)
2. 直接运行这个 create-vite bin 目录下的一个执行配置

可能会存在这样的一个误区：**官网中使用对应 yarn create 构建项目的过程也是 vite 在做的事情**

create-vite 和 vite 的关系是什么？

create-vite 内置了 vite

### 为什么浏览器 script 标签设置 type="module" 后无法使用 import 'xxxx' 导入 node_modules 包

在默认情况下，我们的 esmodule 去导入资源的时候，要么是绝对路径，要么是相对路径（script 标签 type="module"），因此像 `import _ from 'lodash'` 这样的模块导入，在浏览器中无法无法找到对应的文件。

究其原因，是因为浏览器中加载资源是靠 http 请求，如果自动去 node_modules 目录下寻找资源的话，会发起很多个 http 请求，造成性能问题

而打包工具实际是运行在 node 端，是直接读取文件，不会有很多 http 请求

### vite 的预加载

在处理的过程中如果看到了有非绝对路径或者相对路径的引用，会尝试开启路径补全

找寻依赖的的过程是自当前目录依次向上查找的过程，直到搜寻到根目录或者搜寻到对应依赖为止

```js
import _ from "lodash";
// 被转化为
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=2e7ad70b";
```

### vite 的依赖预构建

vite 会找到对应的依赖，然后调用 esbuild（对 js 语法进行处理的一个库），将其他规范的代码转化成 esmodule 规范，然后放到当前目录下的 node_modules/.vite/deps，同时对 esmodule 规范的各个模块进行统一集成

解决了 3 个问题：

1. 不同的第三方包会有不同的导出格式，转化后统一变成了 esmodule 形式
2. 对路径的处理上可以直接使用.vite/deps，方便路径重写
3. 网络多包传输的性能问题，即一个库的引入发出一个 http 请求去获取 js 文件（也是原生 esmodule 规范不敢支持 node_modules 的原因之一），有了依赖预构建以后无论它有多少额外的 export 和 import，vite 都会尽可能的将他们进行集成最后只生成一个或几个模块

### vite.config.js 配置文件的语法提示

vite 可以直接在配置文件中导出一个对象以修改相关配置，但是在 vscode 中没有代码提示，此时可以使用两种方法进行定义，就可以具备代码提示的功能了

1.

```js
import { defineConfig } from "vite";
export default defineConfig({});
```

2.

```ts
/** @type import("vite").UserConfig */
const viteConfig = {};

// ts支持的一种语法，可以用来定义类型，以下代码定义test方法是一个返回值为string类型的函数
/**
 * @param
 * @return {string}
 *
 */
const test = () => {};
```

### defineConfig 用法

1. 传入一个对象，提供代码提示，返回的还是配置对象
2. 传入一个函数，返回一个配置对象，参数接受一个环境对象

```js
import { defineConfig } from "vite";
export default defineConfig(({ command }) => {
  // 开发环境为serve，生产环境为build
  console.log("command", command);
  return {};
});
```

### 一个问题：为什么 vite.config.js 命名运行在 node 环境，但是里边可以用 import/export 语法导入模块？(webpack 中不行)

因为 vite 在读取这个 vite.config.js 的时候会率先用 node 去解析文件语法，如果发现你是 esmodule 规范会直接将你的 esmodule 规范进行替换，变成 commonJS 规范

### vite 环境变量配置

#### node 环境

内部使用 dotenv 这个第三方库，它会自动读取.env 文件，并解析这个文件中的环境变量，并将其注入到 process 对象下(但是 vite 考虑按到和**其他配置**的一些冲突问题，它不会直接注入到 process 对象下)

**其他配置**涉及到 vite.config.js 中的一些配置，这些配置可能在 defineConfig 返回最终配置前就被需要读取

- root
- envDir: 用来配置当前环境变量的文件地址

vite 提供了一些补偿措施：可以调用 vite 的 loadEnv 来手动确认 env 文件

```js
import { loadEnv } from "vite";
export default defineConfig(({ mode }) => {
  // process.cwd() 返回当前node进程的工作目录
  // 第三个参数是注入的变量名前缀，默认是"VITE_"，即变量名为VITE_开头的变量会被注入
  // 可以传入一个数组，以匹配多种变量名
  const env = loadEnv(mode, process.cwd(), ["BASE_", "VITE_"]);
  return {};
});
```

**mode 的值**

- 执行`vite`命令，启动服务，此时为 development，会去读取 .env.development 中的环境变量
- 执行`vite build`命令，打包项目，此时为 production，会去读取 .env.production 中的环境变量
- 执行`vite --mode loc`命令，启动服务，此时为 loc，会去读取 .env.loc 中的环境变量

当调用 loadEnv 时，会做以下几件事：

1. 直接找到 .env 文件，并解析其中的环境变量放进一个对象里
2. 将 mode 的值拼接，得到对应的 .env.{mode} 文件名，然后根据提供的目录和这个文件名读取文件并解析，并放进一个对象
3. 合并两个对象，得到最终的 env 对象

#### 客户端

vite 会将对应的环境变量注入到 `import.meta.env` 中

注意：注入到客户端时 vite 会做一个拦截，它只会将 `VITE_` 开头的环境变量注入，可以配置 config 的 envPrefix，来控制注入多种名称的环境变量

```js
import { defineConfig } from "vite";
export default defineConfig({
  envPrefix: ["VITE_", "BASE_"], // VITE_ 和 BASE_ 开头的环境变量会被注入到 import.meta.env
});
```

### vite 是怎么让浏览器可以识别 .vue 文件的

1. vite 在开发阶段也会有一个开发服务器，它实际上就是一个 node 起的服务
2. 当浏览器请求这个服务下的文件时，这个服务会去匹配文件路径和文件类型，然后读取文件并返回文件字符串，并设置相应的 Content-Type 告诉浏览器如何解析（对于浏览器来说返回的都是字符串罢了，但是这个字符串的解析方式就可以根据 Content-Type 设置）
3. 在读取文件和返回内容之间还对文件进行一些操作，如果是 .vue 文件，读取完文件后会将其转化为 js 代码，涉及到了 AST 语法转换
4. 如果是 .vue 文件，在返回的时候会设置 Content-type="text/javascript"，让浏览器以 js 的方式解析 .vue 文件

### vite 中对 css 以及 css 模块化的处理

vite 天生就支持对 css 文件的直接处理

对 css 文件的处理

1. vite 读取到 css 文件的引用后，直接去使用 fs 模块读取 css 文件的代码
2. 创建一个 style 标签，将读取到的内容 copy 进 style 标签里
3. 将 style 标签插入到 index.html 的 head 中
4. 另外，将该 css 文件的内容替换为 js 脚本（方便热更新和 css 模块化），同时设置 Content-Type 为 js，从而让浏览器以 JS 脚本的形式来执行该 css 后缀文件

**css 模块化**

1. 将 css 文件命名为 `xxx.module.css`
2. 导入该 css 文件的时候使用 default 方式 `import styles from './xxx.module.css'`
3. styles 变量是个对象，保存了 css 文件的类名作为键，带 hash 值的真实类名为值
4. 使用的时候使用 styles.类名来使用，注入到 html 中的 css 类型就是带 hash 的类名

**原理：**

1. module 是一种约定，表示开启 css 模块化
2. 他会将你的所有类名进行一定进行规则的替换
3. 同时创建一个映射对象
4. 将替换后的内容塞入 style 标签然后放入 head 标签中
5. 将原 css 文件抹除，替换为 js 脚本（同 css 文件的处理方式）
6. 将创建的映射对象在脚本中进行默认导出

**less 预处理器**

只需要安装 less npm 包，同时开启 css 模块化也是命名文件为 `xxx.module.less`

### vite 配置文件中 css 配置流程（preprocessorOptions 篇）

主要是用来配置 css 预处理的一些全局参数

```js
// 在config文件中
{
  // ...,
  css: {
    preprocessorOptions: { // key + config，key代表预处理器的名
      less: {}, // 整个配置对象都会最终给到less的行参数（全局参数）
      sass: {}
    }
  }
}
```

如果没有使用构建工具，我们又想去编译 less 文件的话，需要安装 less 包，并使用 lessc 来编译

```r
yarn add less # lessc的编译器
# 类似于安装了node，就可以使用 node index.js 来执行脚本
# 安装了less后就可以使用lessc编译less文件
npx lessc style.less
```

**定义 less 全局变量（在 webpack 中使用 less-loader 配置）**

以前使用 less 变量会建一个文件，用来专门存储各种样式变量，通过使用 `@import url('')` 的方式引入到各个需要的地方，但是这个方式不适合用来做全局变量（主题切换等）

- 使用 @import 性能不是那么好
- 虽然配置到了一个文件中，但是可以预见许多文件都需要引用进来

```js
{
  // ...,
  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          mainColor: 'red', // 使用的时候使用 @mainColor
        }
      },
    }
  }
}
```

**css sourceMap**

文件之间的索引

压缩之后的文件代码的行无法追踪，使用 sourceMap 可以映射回源文件的代码位置

```js
{
  // ...,
  css: {
    preprocessorOptions: {
      less: {},
    },
    devSourceMap: true
  }
}
```

### postcss

vite 天生对 postcss 有非常良好的支持

postcss 保证了 css 在执行起来是万无一失的

1. 保证在各个浏览器中的兼容性（前缀补全）
2. 对未来 css 属性的使用降级问题（使用 var(全局变量)）

**postcss 工作流程：**

我们写的代码 ---> postcss ---> less ---> 再次对未来的高级 css 语法进行降级 ---> 前缀补全 ---> 浏览器客户端

其中 postcss 可以对 less 中的嵌套、变量等写法进行转化，即 postcss 可以包括 less；语法降级、前缀补全是 postcss 的功能

注意：postcss 原来是支持 less 的一些编译功能，提供了一些插件来帮助编译，但是因为每次 less 和 sass 一更新就会导致提供的插件也需要更新，好像没什么必要而且需要成本，所以目前这些插件就不再维护了

**所以产生了一个新的说法：postcss 是后处理器（先处理完 less、sass 的一些语法，再来进行 css 降级等）**

**使用：**

1. 安装依赖

```r
# postcss-cli 提供了一些命令
yarn add postcss-cli postcss -D
# 使用postcss编译css文件，输出为result.css
npx postcss style.css -o result.css
```

2. 书写描述文件

postcss.config.js

```js
// postcss打包过程实际还有许多插件要用到
// 例如降级插件、编译插件等
// 使用 postcss-preset-env 插件里边就包含了这些东西

const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv(/* pluginOptions */)],
};
```

测试：

```css
/* 源文件 */
:root {
  --globalColor: skyblue;
}

.text {
  color: var(--globalColor);
  display: flex;
}
```

```r
npx postcss high-css.css -o result.css
```

```css
/* 结果 */
:root {
  --globalColor: skyblue;
}

.text {
  /* 多加了一句这个，保证了第版本浏览器的识别 */
  color: skyblue;
  color: var(--globalColor);
  display: flex;
}
```

**注意**：如果定义的变量在另一个文件里（定义了一个 variable.css 文件，用来保存各种变量）,那么这个文件不会做降级处理(没有上面的 color: skyblue)，因为 postcss 处理变量是以文件为单位的，这个文件处理完里边的变量就被丢弃了，所以需要配置 variable.css 文件里的变量一直有效

```js
{
  // ...,
  postcss: {
    plugins: [
      postcssPresetEnv({
        importFrom: path.resolve(__dirname, "./variable.css"),
      }),
    ],
  },
}
```

### 在 vite 中配置 postcss

```js
const postcssPresetEnv = require('postcss-preset-env')

{
  // ...,
  css: {
    devSourceMap: true,
    postcss: {
      // 这里的配置就是 postcss.config.js 的配置
      plugins: [postcssPresetEnv] // 不需要配置其他项的时候可以直接传入不需要 postcssPresetEnv()
    }
  }
}
```

**也可以直接使用 postcss.config.js，会自动读取**

都有的话，vite.config.js 里的优先级高于 postcss.config.js

### vite 加载静态资源

在 node 中，除了动态 Api 以外，99%都可以被视作静态资源

vite 对静态资源基本上是开箱即用的

**img:**

```js
import src from "./src/assets/images/plane.jpg";
const img = document.createElement("img");
img.src = src;
document.body.appendChild(img);
```

**json**

```json
{
  "name": "alice",
  "age": 20
}
```

```js
import { name, age } from "./src/assets/json/index.json";
console.log(name, age); // json读取可以直接读取部分属性哦！而且可以tree-shaking
```

**svg**

svg: scalable vector graphics 可伸缩矢量图形

优点：

1. svg 时不会失真的
2. 尺寸小

缺点：

没法很好的去表示层次丰富的图片信息

**加载 svg 的两种方法**

1. 使用 img 标签加载

```js
// 把它视作图片来加载，方便，但是不能修改颜色
import src from "@/assets/svgs/hamburger.svg";
// 等同于 import src from "@/assets/svgs/hamburger.svg?url";
const img = document.createElement("img");
img.src = src;
document.body.appendChild(img);
```

2. 读取文件内容（svg 图片是一组 svg 的代码）,放到 html 中

```js
// 读取最原始的字符串代码
import src from "@/assets/svgs/hamburger.svg?raw";
document.body.innerHTML += src;
const svgElement = document.getElementsByTagName("svg")[0];
svgElement.onmouseenter = function () {
  // 通过设置fill来设置 svg 图片的颜色
  this.style.fill = "red";
};
```

### 配置路径别名

```js
{
  // ...,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
}
```

**resolve.alias 原理**

在 vite 服务端读取到对应文件时，会根据 alias 配置替换源文件中的对应的字符串，将它替换为可以正常读取的文件路径，本质就是做了一个字符串的 replace 操作

### vite 配置文件中对静态资源在生产环境中的配置

```js
{
  // ...,
  build: {
    rollupOptions: {
      // 配置rollup的一些构建策略
      output: {
        // ext为拓展名，name为文件名，hash代表将你的文件名和文件内容进行组合计算的结果
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    assetsInlineLimit: 4096, // 将图片大小小于该值的，转化为base64，默认为4kb
    outDir: "dist", // 打包输出目录
    assetsDir: "static", // 静态资源的目录
    emptyOutDir: true, // 清除输出目录中的所有文件
  },
}
```

## vite 插件

插件是什么？

vite 会在生命周期的不同阶段中去调用不同的插件以达到不同的目的

> 生命周期：vite 从开始执行到执行结束，那么这整个过程就是 vite 的生命周期，vite、webpack、vue、react、redux 等都有自己的生命周期

### 使用插件

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

### 手写自定义插件

在 plugins 数组里的每一个插件都是一个配置对象，该对象包含多个生命周期钩子，这些钩子会在 vite 生命周期的适当时机被调用，以处理不同时期的产物

在插件中，你可以直接 export 一个带生命周期钩子的对象，用来覆盖某些配置，也可以导出一个函数用来生成带生命周期钩子的对象，这样就可以传入一些插件配置

vite 是基于 rollup 构建的，使用 rollup 的打包能力来处理项目中的代码，所以 vite 的插件包括兼容 rollup 的插件和 vite 专属的插件

vite 独有的生命周期钩子：

1. config：用来修改配置的钩子，具体信息可以看下面的手写 vite-aliases 插件的注释
2. transformIndexHtml: 修改模板 html，具体信息可以看下面的手写 CreateHtmlPlugin 插件的注释
3. configureServer: 可以用来修改 vite-server 的钩子，server 对象会作为参数传给它。钩子将在内部中间件被安装前调用，所以自定义的中间件将会比内部中间件早运行。如果想注入一个在内部中间件之后运行的中间件，可以返回一个函数，可看下面的 VitePluginMock
4. configResolved: 整个配置文件的解析流程完全完毕以后会走的钩子，参数为最终的配置对象
5. configurePreviewServer: 与 configureServer 相同，但用于预览服务器

rollup 兼容的钩子：

具体查看 rollup 文档：[https://cn.rollupjs.org/plugin-development/](https://cn.rollupjs.org/plugin-development/)

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
      enforce: "pre",
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

```js
// VitePluginMock.js
const path = require("path");
const fs = require("fs");

const getMockData = (mockPath) => {
  // 因为不知道用户的目录是怎么样的，所以不能使用__dirname，一般项目运行在根目录，所以直接使用process.cwd()获得根目录
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

### vite 和 ts

vite 天生支持 ts，但空项目只会有些提示，约束的力度很小，为了凸显 ts，需要一些配置将其能够影响到开发（直接报错、打包失败等）

这里使用 vite-plugin-checker 进行检查，它依赖于 typescript 所以还需要安装 typescript 包

```js
import Checker from "vite-plugin-checker";

{
  plugins: [
    // ...
    Checker({ typescript: true }),
  ];
}
```

如果它还检查了 node_modules 包中的 ts，可以配置 tsconfig.json

```json
{
  "compilerOptions": {
    "skipLibCheck": true // 跳过node_modules目录的检查
  }
}
```

关于 import.meta

引入 ts 后，ts 默认会将代码编译为 es3，导致 import 报错，所需要将配置改为 esnext

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

然后会显示 env 不在 import.meta 上，这时需要在根目录添加 vite 的声明文件 vite-env.d.ts，在里面导入 vite/client，这样 env 就能被找到了

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
```

这时还有一个问题，env 的类型只有一些 vite 提供的环境变量，自定义的环境变量还是没有提示，可以在这个文件中添加一个 interface ImportMetaEnv 来声明，这样就有了

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  BASENAME: string;
}
```
