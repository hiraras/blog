## requestIdleCallback

回调函数会在绘制之后执行

传入一个参数 e，可以通过 e.timeRemaining()来知晓当前帧还剩多少空闲时间（即前面执行的内容执行完后还剩多少时间）

react fiber 就是依赖这个 api 实现的，但浏览器支持不太好，所以 react 开发者使用了一个 polyfill（自己实现的 api）
