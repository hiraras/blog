# Intersection Observer

提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。

## API

```js
const ob = new IntersectionObserver(
  function (entries) {
    // 回调，entries为交互信息列表，存放了所有观察对象和root元素的交叉情况
    // 一些还未交叉的元素信息也会在里面，但是交叉信息（isIntersecting属性）会是false
  },
  {
    root: null, // 测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 root 或其值为null，则默认使用顶级文档的视口。
    rootMargin: 0, // 指定root位置大小的基础上扩展多打的观察范围，单位为px或百分比，默认为“0px 0px 0px 0px”
    threshold: 0, // 值为 0-1，表示每个观察元素和根元素有多少交叉范围时触发。如0表示只要一交叉就触发，1为完全出现在根元素中，才触发
  }
);

// 观察某个元素
const box = document.querySelector(".box");
ob.observe(box);
// 解除观察
ob.unobserve(box);
```

## 示例

1. 以视口为根

```html
<style>
  * {
    margin: 0;
  }

  .box {
    background-color: aquamarine;
    height: 100vh;
  }

  .box2 {
    background-color: aqua;
  }

  .box3 {
    background-color: fuchsia;
  }
</style>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```

```js
const ob = new IntersectionObserver(
  function (entries) {
    console.log(entries);
  },
  {
    threshold: 0,
  }
);
const boxes = document.querySelectorAll(".box");
for (let box of boxes) {
  ob.observe(box);
}
```

2. 以父元素为根

```html
<style>
  * {
    margin: 0;
  }

  .box {
    background-color: aquamarine;
    height: 100vh;
  }

  .box2 {
    background-color: aqua;
  }

  .box3 {
    background-color: fuchsia;
  }

  .modal {
    width: 300px;
    height: 300px;
    background-color: black;
    max-height: 100vh;
    overflow-y: auto;
  }
</style>
<div class="modal">
  <div class="box"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>
</div>
```

```js
const ob = new IntersectionObserver(
  function (entries) {
    console.log(entries);
  },
  {
    root: document.querySelector(".modal"),
    threshold: 0,
  }
);
const boxes = document.querySelectorAll(".box");
for (let box of boxes) {
  ob.observe(box);
}
```
