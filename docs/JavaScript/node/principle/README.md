## node 的原理

### 模块执行

实际上每个模块都会在一个立即执行函数里执行，可以通过下面代码验证

```js
// main.js
console.log("arguments", arguments); // 啥也不干直接输出arguments参数
```

会打印出 5 个参数

1. module.exports
2. require 函数
3. module 信息
4. `__filename`
5. `__dirname`

所以这几个东西能直接在模块中使用
