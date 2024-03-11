## 终止 http 请求

1. 终止 xhr 请求：调用 xhr 对象的 abort 方法
2. 终止$.ajax 请求：调用请求的方法的返回值上的 abort 方法
3. 终止 axios 请求：调用方法时，在 option 列表中添加 cancelToken 字段，值为 axios.CancelToken.source 方法返回的对象上的 token 字段；或使用 new CancelToken(function(cancelMethod) {})，传递回调函数，回调函数的参数为取消函数
4. 终止 fetch 请求：通过 AbortController 构造函数创建 controller 对象，将 controller 对象上的 signal 字段传给 fetch 函数的 option 中，后续可以通过 controller 的 abort 方法取消
