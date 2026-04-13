## 终止 http 请求

1. 终止 xhr 请求：调用 xhr 对象的 abort 方法
2. 终止$.ajax 请求：调用请求的方法的返回值上的 abort 方法
3. 终止 axios 请求：通过 AbortController 构造函数创建 controller 对象，将 controller 对象上的 signal 字段传给 axios 函数的 option 中，后续可以通过 controller 的 abort 方法取消
4. 终止 fetch 请求：通过 AbortController 构造函数创建 controller 对象，将 controller 对象上的 signal 字段传给 fetch 函数的 option 中，后续可以通过 controller 的 abort 方法取消（和 axios 一致）

> 注意：axios 和 fetch 使用 AbortController 取消时，取消了一次后，后续如果使用同一个实例进行请求，不会发出新请求，而是直接返回取消的结果，所以每次需要新建 AbortController 实例进行使用

```js
// 取消一次就一直取消
const abortController = new AbortController();
function get() {
    fetch("xxx", {
        signal: abortController.signal,
    });
}

function cancel() {
    abortController.abort();
}

// 正确用法
let abortController = new AbortController();
function get() {
    abortController = new AbortController();
    fetch("xxx", {
        signal: abortController.signal,
    });
}

function cancel() {
    abortController.abort();
}
```
