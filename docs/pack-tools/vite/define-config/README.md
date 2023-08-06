# vite defineConfig 配置方法

在项目中新建一个 vite.config.js 作为配置文件，导出一个对象作为配置对象，默认是没有代码提示的，有两种方法让它具备提示功能

1. 使用 defineConfig

```js
// 可以预见，就是为传入的对象添加了类型，然后再返回出去
import { defineConfig } from "vite";
export default defineConfig({});
```

2. 使用 ts 的注释语法

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

## defineConfig 用法

1. 传入一个对象，提供代码提示，返回的还是配置对象
2. 传入一个函数，返回一个配置对象，参数接受一个环境对象

```js
// 传入一个函数
import { defineConfig } from "vite";
export default defineConfig(({ command }) => {
  // 开发环境为serve，生产环境为build
  console.log("command", command);
  return {};
});
```

### 一个问题：为什么 vite.config.js 明明运行在 node 环境，但是里边可以用 import/export 语法导入模块？(webpack 中不行)

因为 vite 在读取这个 vite.config.js 的时候会率先用 node 去解析文件语法，如果发现你是 esmodule 规范会直接将你的 esmodule 规范进行替换，变成 commonJS 规范
