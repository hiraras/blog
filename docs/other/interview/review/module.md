# 模块加载

## AMD 模式

需要引入 `RequireJS` 或 `curl.js`，才可以使用 `define()` 和 `require()`

1. 异步加载: 所有模块的加载都是非阻塞的，不会因为某个模块加载慢而导致浏览器“假死”。
2. 依赖前置: 在定义模块或首次 require 时，就明确列出了所有依赖，加载器会提前去下载这些依赖。
3. 回调写法: 必须将业务逻辑写在回调函数里，代码执行顺序依赖回调的嵌套或顺序。

```js
// 导出
define(function () {
  // 返回这个模块对外提供的 API
  return {
    hello: function () {
      console.log("hello, a.js");
    },
  };
});
// 引用
require(["a", "other"], function (a, other) {
  // 只有当 'a' 和 'other' 都加载完成后
  // 这个回调函数才会执行，并且接收它们作为参数
  a.hello(); // 调用 a 模块的方法
});
```

## CommonJS

运行时加载，同步加载模块(会造成阻塞，但读取速度很快，可以接受)，加载的模块是一个对象。模块第一次加载后会被缓存，后续直接返回缓存，几乎无开销

```js
// main.js - 主模块
console.log("1. 开始执行");

const math = require("./math.js"); // 这里会阻塞
console.log("3. 模块加载完成，继续执行");

const result = math.add(2, 3);
console.log("4. 计算结果:", result);

// math.js
console.log("2. 正在加载 math.js 模块...");

// 模拟一些耗时操作（比如读取文件、计算等）
function heavyComputation() {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return sum;
}
heavyComputation();

module.exports = {
  add: (a, b) => a + b,
};

console.log("2.5 math.js 模块加载完成");

// 输出结果
/**
 * 1. 开始执行
 * 2. 正在加载 math.js 模块...
 * 2.5 math.js 模块加载完成
 * 3. 模块加载完成，继续执行
 * 4. 计算结果: 5
 */
```

## ES5 Module

是静态导入。它可以在编译时就确定模块依赖关系，是目前现代浏览器和构建工具的标准方案。

```js
// main.js
import { a, add } from "a.js";

function add7(n) {
  return add(n + 1);
}

export default add7;

// a.js
export const a = 1;
function add(a, b) {
  return a + b;
}
export { add };
```

## UMD 模式

UMD 就是"写一次模块，在任何 JavaScript 环境下都能用"的通用打包方案

```js
// 针对不同环境，将相同的对象以不同环境要求的格式导出一遍，每个模块都需要调用一遍工具函数
(function (root, factory) {
  // 1. 检测是否支持 AMD (RequireJS)
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  }
  // 2. 检测是否支持 CommonJS (Node.js)
  else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  }
  // 3. 都不支持，挂载到全局对象 (浏览器 window)
  else {
    root.myModule = factory(root.jQuery);
  }
})(typeof self !== "undefined" ? self : this, function ($) {
  // 模块的实际代码
  return {
    hello: function () {
      console.log("Hello UMD");
    },
  };
});
```

本质是运行时加载，所以传统 UMD 模式是不支持 es6 Module 的 `import` 和 `export` 的。

但是 webpack、vite、rollup 等打包工具会将 es6 的 `import` 语句转换成可以导入 UMD 模式的形式，所以现代 UMD 模式支持所有的模块导入方式。
