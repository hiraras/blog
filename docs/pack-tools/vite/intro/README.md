# vite 简介

一个新型的前端构建工具，包括两部分：

1. 一个开发服务器，基于原生 es 模块提供了丰富的内建功能，如速度快到惊人的模块热更新
2. 一套构建指令，使用 rollup 打包代码，并且是预配置的，可输出用于生产环境的高度优化过的静态资源

## 相较于 webpack 的优势

webpack 会对所有模块进行转化，每次修改一个文件的代码会对所有用上的文件执行这个操作，所以当项目一大起来会在开发时有卡顿，而 vite 类似于按需加载，每次只会解析正在被用到的文件，所以速度会很快

## vite 会不会取代 webpack？

不会，vite 是基于 es module 的，webpack 支持多种模块化，侧重点不一样，webpack 更多的关注兼容性，vite 侧重浏览器端的开发

## vite 在开发阶段为什么很快？

1. vite 利用了原生浏览器支持 esmodule 的特性，使一些代码可以直接使用而不需要经过编译
2. 在第一点的基础上，它对一些模块进行了预加载，减少了一些重复编译
3. 最关键的是实现了模块的按需加载，大大减少了不必要模块的编译

## 安装

```r
npm create vite@latest
```

```r
yarn create vite
```

做了如下工作：

1. 帮我们全局安装一个东西：create-vite (vite 的脚手架)
2. 直接运行这个 create-vite bin 目录下的一个执行配置

可能会存在这样的一个误区：

**官网中使用对应 yarn create 构建项目的过程也是 vite 在做的事情**

create-vite 和 vite 的关系是什么？

create-vite 内置了 vite

## 为什么浏览器 script 标签设置 type="module" 后无法使用 import 'xxxx' 导入 node_modules 包

在默认情况下，我们的 esmodule 去导入资源的时候，要么是绝对路径，要么是相对路径（script 标签 type="module"），因此像 `import _ from 'lodash'` 这样的模块导入，在浏览器中无法无法找到对应的文件。

究其原因，是因为浏览器中加载资源是靠 http 请求，如果自动去 node_modules 目录下寻找资源的话，会发起很多个 http 请求，造成性能问题

而打包工具实际是运行在 node 端，是直接读取文件，不会有很多 http 请求

## vite 的预加载

在处理模块导入导出的过程中如果看到了有非绝对路径或者相对路径的引用，会尝试开启路径补全

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

### vite 是怎么让浏览器可以识别 .vue 文件的

1. vite 在开发阶段也会有一个开发服务器，它实际上就是一个 node 起的服务
2. 当浏览器请求这个服务下的文件时，这个服务会去匹配文件路径和文件类型，然后读取文件并返回文件字符串
3. 在读取文件和返回内容之间还对文件进行一些操作，如果是 .vue 文件，读取完文件后会将其转化为 js 代码，涉及到了 AST 语法转换
4. 在返回的时候会设置 Content-type="text/javascript"，让浏览器以 js 的方式解析 .vue 文件 （对于浏览器来说返回的都是字符串罢了，但是这个字符串在浏览器的解析方式就可以根据 Content-Type 设置）

参考视频教程:

[Vite 世界指南](https://www.bilibili.com/video/BV1GN4y1M7P5/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=fb868bb15616b14f8bafac1e50cca8e7)

[官网](https://vitejs.dev/)

[实践仓库](https://github.com/hiraras/vite-study)
