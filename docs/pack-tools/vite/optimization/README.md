# vite 性能优化

## 性能优化分为多个部分

1. 开发时的构建速度优化

- webpack 在这方面下的功夫很多，例如：cache-loader
- vite 是按需加载，所以我们不需要太关心这个

2. 页面性能指标

- 首屏渲染时长 fcp(first content paint)
  - 懒加载
  - http 优化：强缓存和协商缓存
    - 强缓存：服务端给响应头追加一些字段（expires），客户端会记住这些字段，在 expires 没有到达之前，无论怎么刷新页面，浏览器都不会重新请求页面，而是从缓存里读取
    - 协商缓存：是否使用缓存要跟后端协商，当服务端给我们打上协商缓存的标记以后，客户端在下次刷新页面需要重新请求资源时会发送一个协商请求给到服务器，服务端如果说需要变化，则会响应具体的内容，如果服务端觉得没变化则会响应 304
- 页面中最大元素的一个时长 lcp(largest content paint)

3. js 逻辑

- 我们要注意副作用的清除(计时器、事件监听等)
- 我们在写法上的注意事项：requestAnimationFrame、requestIdleCallback
  - 浏览器的帧：16.6ms 去更新一次（执行 js 逻辑以及重排重绘等），假设我的 js 执行逻辑超过了 16.6ms，重排重绘就没时间了，就会出现掉帧现象
- 防抖、节流、数据量很大时候的遍历等，推荐使用 lodash 等工具库，内部使用了很多提升性能的方法，一些代码的最佳实践
- 对作用域的一个控制
  ```js
  const arr = new Array(100000); // 有很多元素的数组
  for (let i = 0, len = arr.length; i < len; i++) {
    // 这样每次只需要去取最近的作用域中的len变量，而不需要去更外边取arr变量，更减少了读取length属性的时间
  }
  ```

4. css

- 关注继承属性：能继承的就不要重复写
- 尽量避免太过于深的 css 嵌套

5. 构建优化：vite（rollup） webpack

- 优化体积：压缩、treeshaking、图片资源压缩，cdn 加载，分包等

## 分包策略

不分包有什么问题？

- 首先文件会很大，造成 http 请求缓慢，不利于首屏渲染
- 另外一些工具包的代码也会被打进去，即每次打包都会将同一份代码打包
- 如果使用指纹的方式防止浏览器缓存 js 文件，那么工具包的代码也会跟着重新被加载，分包的话，因为工具包的代码不会改变，也就是打包结果是稳定的，就可以利用浏览器缓存分包 js 文件从而提升性能

```js
{
  build: {
    minify: false, // 是否压缩
    rollupOptions: {
      // 配置rollup的一些构建策略
      output: {
        // ext为拓展名，name为文件名，hash代表将你的文件名和文件内容进行组合计算的结果
        assetFileNames: "[hash].[name].[ext]",
        manualChunks: (id) => {
          // id为打包的各个模块名
          // 这里将node_modules中的模块打包到vendor文件中去
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  }
}
```

## gzip 压缩

将所有的静态文件进行压缩，以达到减少体积的目的

服务端 -> 压缩文件

客户端 -> 收到压缩包 -> 解压缩

在 vite 中可以使用 vite-plugin-compression 插件来进行压缩，最终会生成 xxx.js.gz 的文件

将这个压缩文件给到后端或运维后（原来这个压缩是后端做的，这里交给了前端，让他们直接用），后面请求 js 文件时，后端去拿.gz 后缀的文件，然后会设置一个响应头 Content-encoding=gzip （告诉浏览器该文件是使用 gzip 压缩过的）

浏览器收到响应结果，发现响应头里有 gzip 对应的字段，直接解压得到原原本本的 js 文件（浏览器要承担一定的解压时间）

所以如果压缩效率比较低的文件就没必要使用

## 动态导入

动态导入和按需加载是异曲同工

直接使用 import() 语法，vite 用的 es 原生的动态导入语法

## cdn 加速

Content Delivery Network，内容分发网络，是一种用于在全球范围内分发网络内容的服务器，通过将内容（网页、图片、视频等）存储在离用户更近的服务器节点上，以加速用户对这些内容的访问速度，提供更快的加载和更好的用户体验，CDN 可以有效减少服务器的负载，提供网站的可用性和性能

在 vite 中可以使用 vite-plugin-cdn-import 插件，来配置哪些资源使用 cdn，它会在 header 插入一个 script 标签，将配置的 cdn 地址引入，同时修改一些 rollup 的配置，让代码变成全局使用变量的形式

可以得到很多 npm 模块 cdn 地址的工具网站: [jsdelivr](https://www.jsdelivr.com/)

```js
import viteCDNPlugin from "vite-plugin-cdn-import";
{
  plugins: [
    viteCDNPlugin({
      modules: [
        {
          name: "lodash", // 包名
          var: "_", // 模块导出的变量名,jQuery就是 $
          path: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js", // cdn地址
        },
      ],
    }),
  ];
}
```

在 webpack 中，可以使用 webpack-cdn-plugin 插件

注意：

- 一些包可能无法使用这种方式，需要尝试后决定是否使用 cdn 加速（React、ReactDOM 没试成功，lodash 成功了）
- 要确保 cdn 的包文件是正确的（地址、版本等）

```js
const HTMLWebpackPlugin = require("html-webpack-plugin");
const WebpackCDNPlugin = require("webpack-cdn-plugin");

{
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.ejs", // 如果需要指定入口html文件需要加上这个插件，注意顺序
    }),
    new WebpackCDNPlugin({
      modules: [
        {
          name: "lodash", // 包名
          var: "_", // 模块导出的变量名,jQuery就是 $
          prodUrl: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js", // cdn地址
        },
      ],
    }),
  ],
}
```
