## 全局错误捕获

### 区别

addEventListener('error')：监听 js 运行时错误，会比 window.onerror 先触发，与 onerror 的功能相似，不过事件回调函数传参只有一个保存全部错误信息的参数，不能阻止默认事件处理函数的执行，**但能够全局捕获资源加载异常的错误**

注意：当资源加载异常时，错误是在**捕获**阶段发生的

```JavaScript
window.addEventListener('error', function(e) {
    console.log(e)
}, true)
```

### 捕获 promise 异常

```JavaScript
window.addEventListener('unhandledrejection', e => {
    // event类型为PromiseRejectionEvent，其中的reason字段包括了抛出错误的信息
    console.log('unhandledrejection', e)
})
Promise.reject('fail')
```

### window.onerror

捕获全局错误，但不能捕获 promise 错误

支持：

- 可以捕捉语法错误，也可以捕捉运行时错误；
- 可以拿到出错的信息，堆栈，出错的文件、行号、列号；
- 只要在当前页面执行的 js 脚本出错都会捕捉到，例如：浏览器插件的 javascript、或者 flash 抛出的异常等。
- 跨域的资源需要特殊头部支持。

问题：

- 基于安全考虑，无法捕获到跨域的异常。
- 不同浏览器异常信息支持不同，异常的堆栈不统一，甚至有些浏览器没有堆栈信息。
- 无法知道资源加载的异常。

解决:

- 第一个问题，可以设置标签的 crossorigin 属性和 js 所在的域名设置 CORS 来解决。
- 第二个问题，我们可以利用 TraceKit 第三方 npm 包解决堆栈信息不统一的情况，而针对一些老浏览器没有堆栈信息的，就需要你手动对代码进行埋点，用 try catch 埋点所有的函数/方法了
- 第三个问题，因为资源的加载错误不会冒泡，所以 window.onerror 无法捕获到，就需要改为 window.addEventListener 的方式在捕获阶段捕获异常，但是你需要防止和 window.onerror 重复上报。
