## 面试复习

- js 基础：es6 文档、this、作用域、继承、正则、事件循环、new、垃圾回收
- css：flex、grid、bfc 条件及其应用
- 网络安全：常见攻击手段及预防
- 网络请求相关
- react：react、redux、react-router、hooks
- ts

相关链接：https://juejin.cn/post/6844903885488783374

meet48:

1. 使用 webpack-bundle-analyzer 分析打包产物构成，从而分析造成包过大的原因
2. 为页面做懒加载将 main.js 文件大小从 1.1m 降低到 600k
3. 使用 splitChunk 将 npm 包的代码拆分到单独的 js 文件中
4. 将部分体积较大的包如 react/react-dom 使用 cdn 的方式引入，并配置 webpack 相关参数，减少包大小
5. 为国际化 json 文件每次打包时添加文件指纹，解决时常发生的缓存问题
6. 编写 LangClear webpack 插件，在打包的时候清除语言文件中一些已经用不到的项，减少语言文件大小。因为这个文件是优先加载并会阻塞页面渲染，因此提高了首屏渲染的效率
