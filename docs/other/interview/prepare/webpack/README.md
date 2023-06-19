webpack：

公共代码怎么抽离？

抽离原因：当某个模块被多个入口引用时，它会被打包多次（最终打包出来的文件里，它们都有相同的代码），造成项目文件变大

使用 `optimization.splitChunks` 配置 webpack，分离公共模块。[参考](https://www.cnblogs.com/as3Gui/p/16977574.html)

webpack5:

1. 内置清除输出目录，之前的版本需要借助`clean-webpack-plugin`的插件，来帮助清除上次构建的 dist 产物，现在只需要配置参数

```js
//webpack.config.js
module.exports = {
  output: {
    clean: true,
  },
};
```

2. moduleIds & chunkIds 的优化

- 在 webpack5 之前，没有从 entry 打包的 chunk，都会以 1、2、3 的文件命名方式输出，这样删除某些文件由于顺序变了可能会导致缓存失效，在 5 中，生产环境下默认使用了 deterministic 的方式生成短 hash 值来分配给 modules 和 chunks 来解决上述问题

3. 更智能的 tree shaking

4. 联邦模块：让 webpack 达到了线上 Runtime 的效果，让代码直接在项目间利用 cdn 直接共享，不再需要本地安装 npm 包（可以解决组件库在多个项目中的更新问题）

优化：

1. 开发环境性能优化

- 优化打包速度（HMR 热模块替换）
- 优化代码调试（source-map）

2. 生产环境性能优化

**优化代码打包速度**

- oneof：提高 loader 的匹配效率
- babel 缓存，优化二次打包
- 多进程打包
- externals（外部扩展）：它可以规定哪个文件不需要打包，从而让它通过 CDN 引入
- ddl：动态链接库，防止某一些引用库的多次引用，从而导致多次打包

**优化代码运行性能**

- 缓存
- tree-shaking
- code split
- 懒加载和预加载
- pwa

thread-loader 配置：

```js
use: [
  {
    loader: "thread-loader",
    // 有同样配置的 loader 会共享一个 worker 池(worker pool)
    options: {
      // 产生的 worker 的数量，默认是 cpu 的核心数
      workers: 2,

      // 一个 worker 进程中并行执行工作的数量
      // 默认为 20
      workerParallelJobs: 50,

      // 额外的 node.js 参数
      workerNodeArgs: ["--max-old-space-size", "1024"],

      // 闲置时定时删除 worker 进程
      // 默认为 500ms
      // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
      poolTimeout: 2000,

      // 池(pool)分配给 worker 的工作数量
      // 默认为 200
      // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
      poolParallelJobs: 50,

      // 池(pool)的名称
      // 可以修改名称来创建其余选项都一样的池(pool)
      name: "my-pool",
    },
  },
  "expensive-loader",
];
```

tree-shaking: 默认情况下会启用 tree-shaking。我们只需要确保在最终编译时使用生产模式。

1. 使用 ES2015 模块，并且注意不要被 babel 转换成 CommonJs
2. 生产环境中 webpack 配置中 mode 设置为 production
3. package.json 设置合适的 sideEffects
4. 多个对象不要集中在一个变量中导出

```js
module.exports = {
  mode: "production",
};
```

前端工程化的理解？

工程化需要借助 webpack、vite 等构建工具。浏览器能识别的只有 html、js、css，对一些好用的语法、工具（es6+，less、ts）无法直接识别，所以需要一些工具对这些无法识别的语法进行转化，这个过程可能需要开发者每次修改某些文件就通过命令进行重新转化，非常麻烦，也容易出错（转化可能需要多个步骤，需要确保步骤的准确），使用构建工具，监听文件变化并自动进行转化工作，让开发者将主要精力集中在代码开发上就是工程化

简而言之，通过构建工具将复杂的前端项目，自动的进行编译、转化、优化等操作，让代码能在浏览器运行

一个构建工具承担了哪些脏活累活

1. 模块化开发支持：支持直接从 node_modules 里引入代码 + 多种模块化支持
2. 处理代码兼容性：比如 babel 语法降级，less、ts 语法转换（其实是将这些语法对应的处理工具集成进来自动化处理）
3. 提高项目性能：压缩文件，代码分割
4. 优化开发体验：

- 构建工具自动监听文件的变化，当文件变化后自动帮你调用对应的集成工具进行重新打包，然后浏览器重新运行（热更新）
- 开发服务器：跨域的问题

webpack 随着项目增大打包效率持续下降，并很难提升（跟构建过程有关）

如果一旦要改将会动到 webpack 的大动脉

webpack 支持多种模块化

```js
// 这一段代码最终会到浏览器里取运行

const lodash = require('lodash') // commonjs
const Vue from 'vue' // es module
```

webpack 的编译原理：AST 抽象语法分析工具 分析出你写的这个 js 文件有哪些导入和导出操作

构建工具是运行在服务端的

```js
// webpack转化结果，多种模块化语法进行了兼容
const lodash = webpack_require("lodash");
const Vue = webpack_require("vue");
```

```js
(function (modules) {
  function webpack_require() {
    // ...
  }
  // 入口是 index.js ，通过webpack配置
  modules[entry](webpack_require);
})({
  "index.js": (webpack_require) => {
    const lodash = webpack_require("lodash");
    const Vue = webpack_require("vue");
  },
});
```

因为 webpack 支持多种模块化，它一开始必须要统一模块化代码，意味着它需要将所有的依赖全部读一遍
