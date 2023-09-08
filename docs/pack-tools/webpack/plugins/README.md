## 常用 plugin

plugin 赋予了 webpack 各种灵活的功能，例如：打包优化、环境变量注入、资源管理等，目的是解决 loader 无法实现的功能；

它运行于整个项目编译，webpack 打包过程中会广播出许多事件，Plugin 会监听这些事件，在合适的时间调用 webapck 提供的 api 改变输出结果

- **define-plugin**：定义环境变量（webpack4 之后指定 mode 会自动配置）
- **ignore-plugin**：忽略部分文件
- **html-webpack-plugin**：简化 HTML 文件创造（依赖于 html-loader）
- **web-webpack-plugin**：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- **uglifyjs-webpack-plugin**：不支持 ES6 压缩（Webpack4 以前）
- **terser-webpack-plugin**：支持压缩 ES6（Webpack4 官方推荐）
- **webpack-parallel-uglify-plugin**：多进程执行代码压缩，提升构建速度（不再维护）[参考](https://juejin.cn/post/6844903911568965645)
- **mini-css-extract-plugin**：分离样式文件，css 提取为独立文件，支持按需加载（替代 extract-text-webpack-plugin）
- **serviceworker-webpack-plugin**：为网页应用增加离线缓存功能
- **clean-webpack-plugin**：目录清理
- **ModuleConcatenationPlugin**：开启 Scope Hoisting
- **speed-measure-webpack-plugin**：可以看到每个 Loader 合 Plugin 执行耗时（整个打包耗时、每个 plugin 和 loader 耗时）
- **webpack-bundle-analyzer**：可视化 webpack 输出文件的体积（业务组件、依赖第三方模块）
- **size-plugin**：监控资源体积变化，尽早发现问题
- **HotModuleReplacementPlugin**：模块热替换
- **node-polyfill-webpack-plugin**: 补全一些 node 环境的 api（一些包会用到 node 端的一些 api 例如 Buffer）
