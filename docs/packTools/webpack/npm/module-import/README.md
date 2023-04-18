## CJS、ESM、AMD、UMD

es6 之前 JavaScript 一直没有自己的模块，所以社区出现了 CommonJS 和 AMD，CommonJS 用于服务端，AMD 应用于客户端

### 介绍

- ESM：es6 的 import 和 export
- CJS：CommonJS 的缩写，适用在服务端，采用 require 导入，module.exports 导出，导出的对象是值的浅拷贝，并具有缓存，第一次加载后（运行时加载）会完整运行模块并导出一个对象，后续加载都在缓存里取；最终导出的对象在 module.exports 上，而 exports 变量的引用默认就是 module.exports
- AMD：客户端的模块导入方式，导入是异步的，对应了 A（async），调用时使用 define 函数

```JavaScript
define(['dep1', 'dep2'], function(dep1, dep2) {
    return function(){}
})
// 或
define(function(require) {
    var dep1 = require('dep1')
    return function(){}
})
```

- UMD：代表通用模块定义（Universal Module Definition）
  在前端和后端都适用，与 CJS 和 AMD 不同，UMD 更像是一种配置多个模块系统的模式

### ESM 和 CJS 差异

- commonJS 引入是值的拷贝，import 引入的是值的引用
- commonJS 是运行时加载，import 是编译时输出
- commonJS 模块的 require()是同步加载模块，import 是异步加载，有一个独立的模块依赖的解析阶段

第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成
