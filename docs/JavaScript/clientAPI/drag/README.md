# 拖拽 api

浏览器默认的拖拽在视觉方面只是一个元素的投影拖拽到另一个元素上。其他所有功能实际都需要自己操作 dom 实现

**注意：**如果拖拽事件发生在子元素，且事件绑定在父元素上，那事件中的 e.target 也会指向子元素，没有冒泡的行为

## 方法

- ondragstart 元素开始拖拽时触发，每次只触发一次
- ondragend 元素拖拽结束时触发
- ondragover 有拖拽元素在当前元素之上时触发；拖拽元素只要在上方就会一直触发，即便鼠标位置不动
- ondragenter 有拖拽元素被拖拽进当前元素的范围时触发，每次只触发一次
- ondragleave 在可拖动元素离开潜在放置目标元素时触发
- ondrag 元素被拖动时触发，像 dragover 也会一直触发
- ondrop 有元素被放下在当前元素时触发;一些元素浏览器默认不允许其他元素拖拽(div/tr/td 等)，所以可能不会触发这个事件，需要在 ondragover 中阻止默认事件

## dataTransfer

DataTransfer 对象用于保存拖动并放下（drag and drop）过程中的数据。它可以保存一项或多项数据，这些数据项可以是一种或者多种数据类型。[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)

一次拖拽中保存的数据是共享的，即 dragstart 中保存的数据，在 drop 事件中也能拿到

```js
elem.ondragstart = function (e) {
  // effectAllowed改变拖拽时操作类型（鼠标样子是操作类型的表现），必须是 none, copy, copyLink, copyMove, link, linkMove, move, all or uninitialized 之一
  e.dataTransfer.setData("text", "hhhh");
};

elem.ondrop = function (e) {
  console.log("dataTransfer", e.dataTransfer.getData("text")); // hhhh
};
```

## 实例

1. 奇数与偶数

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      .ctn {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
        height: 300px;
      }
      .ctn div {
        background-color: aqua;
        text-align: center;
        font-weight: bold;
      }
      .ball {
        border-radius: 100px;
        height: 200px;
        width: 200px;
        background-color: burlywood;
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        line-height: 200px;
        text-align: center;
      }

      .ctn .tag {
        background-color: chocolate;
        color: #000;
        padding: 8px 20px;
        display: inline-block;
        margin-right: 20px;
      }

      .ctn .error-tag {
        background-color: red;
      }

      .active {
        background-color: aquamarine !important;
      }
    </style>
  </head>
  <body>
    <div class="ctn">
      <div data-dragable="true">
        <h3>奇数</h3>
      </div>
      <div data-dragable="true">
        <h3>偶数</h3>
      </div>
    </div>
    <div class="ball" draggable="true"></div>
  </body>
  <script>
    const ctn = document.querySelector(".ctn");
    const ball = document.querySelector(".ball");

    function createNumber() {
      return Math.floor(Math.random() * 10);
    }

    function handleNext() {
      const num = createNumber();
      ball.textContent = num;
    }

    handleNext();

    // 浏览器默认的拖拽在视觉方面只是一个元素的投影拖拽到另一个元素上。其他所有功能实际都需要自己操作dom实现

    // 注意：如果拖拽事件发生在子元素，且事件绑定在父元素上，那事件中的e.target也会指向子元素，没有冒泡的行为
    ball.ondragstart = function (e) {
      // 改变拖拽时鼠标类型
      // 必须是 none, copy, copyLink, copyMove, link, linkMove, move, all or uninitialized 之一
      e.dataTransfer.effectAllowed = "move";
      // 元素开始拖拽时触发，每次只触发一次
      console.log(e.target);
    };

    ctn.ondragover = function (e) {
      e.preventDefault();
      // 有拖拽元素在当前元素之上时触发；拖拽元素只要在上方就会一直触发，即便鼠标位置不动
      // console.log('over', e.target)
    };

    ctn.ondragenter = function (e) {
      // 有拖拽元素被拖拽进当前元素的范围时触发，每次只触发一次
      console.log("enter", e.target);
      clearActive();
      if (e.target.dataset.dragable === "true") {
        e.target.classList.add("active");
      }
    };

    ctn.ondrop = function (e) {
      if (e.target.dataset.dragable !== "true") {
        clearActive();
        return;
      }
      const text = ball.textContent;
      const tagElem = createTag(text);
      if (parseInt(text) % 2 === 0 && e.target.textContent.includes("奇数")) {
        tagElem.classList.add("error-tag");
      }
      if (parseInt(text) % 2 === 1 && e.target.textContent.includes("偶数")) {
        tagElem.classList.add("error-tag");
      }
      e.target.appendChild(tagElem);
      handleNext();
      clearActive();
    };

    function createTag(text) {
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.textContent = text;
      return tag;
    }

    function clearActive() {
      document.querySelectorAll(".active").forEach((elem) => {
        elem.classList.remove("active");
      });
    }
  </script>
</html>
```
