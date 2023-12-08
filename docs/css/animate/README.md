# animate

动画的开关就是元素是否具有动画样式，可以通过添加/删除动画类来启动和移除，后续动画的表现（是否永久执行之类的）就是配置动画属性的事了

动画监听事件

```js
// 动画完成
dom.addEventListener("animationend", function () {
  // 这里this指向dom
});
// 过渡完成
dom.addEventListener(
  "transitionend",
  function () {
    // 也有冒泡的特性，也可以通过第三个参数决定是否冒泡
  },
  { once: true }
);
```
