# dialog

dialog 是浏览器提供的原生弹窗。有两个模式（没有蒙层和有蒙层）

## 没有蒙层

```html
<body>
  <button onclick="dialog.show()">弹窗</button>
  <dialog id="dialog">
    <div>这是标题</div>
    <input />
    <button onclick="dialog.close()">关闭</button>
  </dialog>
</body>
```

## 有蒙层

**有蒙层的情况下有以下特性**

1. dialog 会被渲染到文档外的一个#top-layer，可以通过 Elements 面板查看
2. 自己使用 div 实现的弹窗，当使用 tab 键切换元素焦点的时候会切换到蒙层底部的元素，而有蒙层的 dialog 不会切到底部元素

```html
<body>
  <button onclick="dialog.showModal()">弹窗</button>
  <dialog id="dialog">
    <div>这是标题</div>
    <input />
    <button onclick="dialog.close()">关闭</button>
  </dialog>
</body>
```

## 设置 css

```css
<style>
    #dialog {
        border-radius: 10px;
        border-color: #ccc;
    }
    /* 蒙层的样式 */
    #dialog::backdrop {
        background: rgba(20, 40, 80, 0.6);
        backdrop-filter: blur(3px);
    }
</style>
```
