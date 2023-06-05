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
