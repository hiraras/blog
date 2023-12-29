# 创建类似于 vue 的 cli 工具

[项目地址](https://github.com/hiraras/koa2-cli)

## 步骤

1. 分析模板项目（产物）有哪些文件（下面的例子主要有 index.js、package.json）
2. 创建目录
3. 使用 ejs 创建模板
4. 获得用户输入
5. 使用 ejs 注入变量并获得最终代码
6. 创建文件
7. 使用 execa 执行安装依赖的命令
8. 配置 package.json 的 bin 字段并调整项目目录，使项目能作为全局命令使用
9. 优化产物（prettier），为各个步骤打印相应日志
10. 发布

## 创建最终要生成的参考文件

**index.js**

```js
const Koa = require("koa2");
const app = new Koa();

// koa-static 部分可以根据用户选择决定是否生成
const serve = require("koa-static");
app.use(serve(__dirname + "/static"));

// koa-router 部分可以根据用户选择决定是否生成
const Router = require("koa-router");
const router = new Router();

// 添加一个简单的路由示例
router.get("/", async (ctx) => {
  ctx.body = "Hello, Koa!";
});

// 将路由挂载到应用
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
```

**package.json**

name、koa-router、koa-static 需要根据用户的选择变化

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.9",
    "koa2": "^2.0.0-alpha.7",
    "koa-router": "^12.0.1",
    "koa-static": "^5.0.0"
  }
}
```

**node_modules**

这里需要实现依赖自动安装

## 实现文件生成

**index.js**

```js
import fs from "fs";

// 创建输出目录
fs.mkdirSync(getRootPath());
// 创建 index.js
fs.writeFileSync(`${getRootPath()}/index.js`, "index");
// 创建 package.json
fs.writeFileSync(`${getRootPath()}/package.json`, "{}");

function getRootPath() {
  return `./${config.projectName}`;
}
```

## 使用 ejs 动态生成文件

**index.js**

```js
import fs from "fs";
import createIndexTemplate from "./fileCreators/createIndex.js";
import createPackageTemplate from "./fileCreators/createPackage.js";

const config = {
  projectName: "test",
  port: 3000,
  middleware: {
    router: true,
    static: false,
  },
};

// 创建输出目录
fs.mkdirSync(getRootPath());
// 创建 index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));
// 创建 package.json
fs.writeFileSync(
  `${getRootPath()}/package.json`,
  createPackageTemplate(config)
);

function getRootPath() {
  return `./${config.projectName}`;
}
```

**createIndex.js**

```js
import fs from "fs";
import ejs from "ejs";
import path from "path";
// 使用了esm，__dirname 变量就没了，所以需要借助这个函数确定路径
import { fileURLToPath } from "url";

export default (config) => {
  // import.meta.url 指向当前文件的路径
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(
    path.resolve(__dirname, "../../templates/index.ejs")
  );

  // 获得最终字符串
  const code = ejs.render(template.toString(), {
    middleware: config.middleware, // middleware在模板中能直接使用
  });

  return code;
};
```

**index.ejs**

```ejs
const Koa = require('koa2');
const app = new Koa();

<% if (middleware.static) { %>
const serve = require('koa-static')
app.use(serve(__dirname + '/static'))
<% } %>

<% if (middleware.router) { %>
const Router = require('koa-router');
const router = new Router();

// 添加一个简单的路由示例
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa!';
});

// 将路由挂载到应用
app.use(router.routes());
app.use(router.allowedMethods());
<% } %>

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
```

**createPackage.js**

```js
import fs from "fs";
import ejs from "ejs";
import path from "path";
// 使用了esm，__dirname 变量就没了，所以需要借助这个函数确定路径
import { fileURLToPath } from "url";

export default (config) => {
  // import.meta.url 指向当前文件的路径
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(
    path.resolve(__dirname, "../../templates/package.ejs")
  );

  // 获得最终字符串
  const code = ejs.render(template.toString(), {
    middleware: config.middleware,
    projectName: config.projectName,
  });

  return code;
};
```

**package.ejs**

```ejs
{
    "name": "<%= projectName %>",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "node index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "ejs": "^3.1.9",
        "koa2": "^2.0.0-alpha.7"
        <% if (middleware.router) { %>
            ,"koa-router": "^12.0.1"
        <% } %>
        <% if (middleware.static) { %>
            ,"koa-static": "^5.0.0"
        <% } %>

    }
}
```

## 获得用户输入

**index.js**

```js
import fs from "fs";
import createIndexTemplate from "./fileCreators/createIndex.js";
import createPackageTemplate from "./fileCreators/createPackage.js";
import inquirer from "inquirer";

const answer = await inquirer.prompt([
  {
    type: "input", // 类型
    name: "projectName", // 得到的值对应的键名
    message: "set project name", // 提示文案
    validate(val) {
      // 如果未输入，重新提示
      if (val) return true;
      return "Please enter project name";
    },
  },
  {
    type: "number",
    name: "port",
    default() {
      // 默认值
      return 3000;
    },
    message: "set port number",
  },
  {
    type: "checkbox",
    name: "middleware",
    message: "select middlewares",
    choices: [
      // 多选类型的选项
      {
        name: "koaStatic",
      },
      {
        name: "koaRouter",
      },
    ],
  },
]);

function haveMiddleware(middlewares, name) {
  return middlewares.includes(name);
}

const config = {
  projectName: answer.projectName,
  port: answer.port,
  middleware: {
    router: haveMiddleware(answer.middleware, "koaRouter"),
    static: haveMiddleware(answer.middleware, "koaStatic"),
  },
};

// 创建输出目录
fs.mkdirSync(getRootPath());
// 创建 index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));
// 创建 package.json
fs.writeFileSync(
  `${getRootPath()}/package.json`,
  createPackageTemplate(config)
);

function getRootPath() {
  return `./${config.projectName}`;
}
```

**至此能够获得最终的 index.js 和 package.json 文件**

## 安装依赖

```js
import { execa } from "execa";

// 放在文件生成之后
execa("yarn", {
  cwd: getRootPath(), // 指定yarn命令执行目录,
  stdio: "inherit", // 设定命令行显示安装过程
});
```

## 优化

1. 产物代码格式优化，因为 ejs 文件的条件语句等原因，产物代码比较乱不可避免，所以需要借助 prettier 工具格式化代码

**createIndex.js**

```js
import fs from "fs";
import ejs from "ejs";
import path from "path";
// 使用了esm，__dirname 变量就没了，所以需要借助这个函数确定路径
import { fileURLToPath } from "url";
import prettier from "prettier";

export default (config) => {
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(
    path.resolve(__dirname, "../../templates/index.ejs")
  );

  const code = ejs.render(template.toString(), {
    middleware: config.middleware,
  });
  // 返回的是promise，node可以在顶层使用await
  // json文件的话，parser要设置为 'json'
  return prettier.format(code, { parser: "babel" });
};
```

2. 构建步骤可以适当添加日志，配合 chalk 美化

```js
import chalk from "chalk";
console.log(chalk.blue("创建文件夹"));
console.log(chalk.blue("创建 index.js"));
console.log(chalk.blue("创建 package.json"));
console.log(chalk.blue("安装依赖:"));
// ...
```

## 将项目变更为全局可用

1. 创建 bin 目录，并把除 package.json yarn.lock node_modules 外的所有项目文件放到 bin 目录下
2. 配置 package.json 的 bin 字段为入口文件 `"bin": "./bin/index.js",`
3. 在入口文件添加 `#!/usr/bin/env node` ，表明执行这个脚本的时候使用 node 解释
4. 使用 `npm link` 将包加到全局环境，link 之后使用的命令就是 package.json 的 name 字段
5. 因为目录变化可能导致一些读取操作报错，需要修正

## 发布

使用 `npm publish` 发布

发布的时候可能把 node_modules 的内容也发布，可以在 package.json 文件中指定文件

```json
{
  "name": "setup-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": "./bin/index.js",
  "type": "module",
  "files": ["bin", "package.json"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "rm -rf ./dir && node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chalk": "^5.3.0",
    "ejs": "^3.1.9",
    "execa": "^8.0.1",
    "inquirer": "^9.2.12",
    "koa-router": "^12.0.1",
    "koa-static": "^5.0.0",
    "koa2": "^2.0.0-alpha.7",
    "prettier": "^3.1.1"
  }
}
```
