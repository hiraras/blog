# shadow dom

Shadow DOM 是 Web Components 标准的核心技术之一，它的主要作用是**实现真正的样式和 DOM 结构封装**，让组件内部的代码与外部的页面环境相互隔离。

可以把它理解成一个“**DOM 中的独立微件**”。

## 一、什么是 Shadow DOM？

> Shadow DOM 允许将一个隐藏的、独立的 DOM 树附加到一个普通 DOM 元素上。

-   这个独立的 DOM 树就叫 **Shadow Tree**
-   它所依附的普通元素叫做 **Shadow Host**
-   两者之间的边界叫做 **Shadow Boundary**

**一个直观比喻：**

> 就像博物馆里的展柜。展柜（Shadow Host）是可见的，但里面的展品（Shadow Tree）与外界环境（主 DOM）在物理和规则上是隔离的——你不能直接伸手触碰，展柜内的灯光、温度也是独立控制的。

## 二、为什么需要 Shadow DOM？

在没有 Shadow DOM 的年代，开发组件会遇到两个核心问题：

1. **样式冲突**：组件的内部样式会泄露到外部，或者被外部样式意外覆盖。
2. **DOM 结构暴露**：组件使用者可能会通过选择器意外修改组件内部的 HTML 结构，导致组件损坏。

Shadow DOM 通过创建**样式边界**和**DOM 边界**完美解决了这两个问题。

## 三、基本用法示例

```html
<!DOCTYPE html>
<html>
    <body>
        <!-- 普通 div，作为宿主元素 -->
        <div id="myWidget"></div>

        <script>
            // 1. 选中宿主元素
            const host = document.getElementById("myWidget");

            // 2. 创建 Shadow DOM（mode: 'open' 表示外部可通过 JS 访问）
            const shadowRoot = host.attachShadow({ mode: "open" });

            // 3. 给 Shadow DOM 添加内容
            shadowRoot.innerHTML = `
      <style>
        /* 这个样式只影响 Shadow DOM 内部 */
        p {
          color: red;
          font-size: 20px;
        }
      </style>
      <p>我是 Shadow DOM 内部的文字</p>
    `;
        </script>

        <!-- 外部同样有 p 标签，不受影响 -->
        <p>我是外部的文字</p>
    </body>
</html>
```

**运行效果：**

-   外部 `<p>` 文字保持浏览器默认样式（黑色）
-   Shadow DOM 内部的 `<p>` 文字显示为红色、20px

## 四、核心概念详解

### 1. Shadow Host（影子宿主）

-   一个普通的 DOM 元素（如 `div`、`span`、`button`）
-   它是 Shadow Tree 的“挂载点”

### 2. Shadow Tree（影子树）

-   内部完全独立的 DOM 树结构
-   包含元素、属性、文本节点、样式表等

### 3. Shadow Boundary（影子边界）

-   宿主与影子树之间的界线
-   **外部样式无法穿透**进入内部
-   内部样式也不会泄露到外部

### 4. mode 模式

```js
attachShadow({ mode: "open" }); // 外部可通过 .shadowRoot 属性访问
attachShadow({ mode: "closed" }); // 外部无法访问，.shadowRoot 返回 null
```

## 五、样式隔离的细节

### 外部样式无法穿透（除了少数例外）

```css
/* 外部样式 */
div {
    background: yellow;
} /* 会影响宿主，但不会影响内部 */
p {
    color: green;
} /* 完全不影响 Shadow DOM 内部的 p */
```

### 内部样式也不会泄露

```css
/* Shadow DOM 内部样式 */
:host {
    display: block;
} /* 作用于宿主元素本身 */
:host-context(.dark-theme) {
} /* 根据外部环境调整宿主样式 */
::slotted(span) {
} /* 样式化通过 <slot> 插入的轻量 DOM */
```

### 可以穿透的少数情况（继承属性）

-   `color`、`font-family`、`line-height` 等**可继承属性**依然会从宿主继承
-   但内部显式定义的样式优先级更高

## 六、与 `<slot>` 配合实现内容分发

Shadow DOM 通常和 `<slot>` 一起使用，允许组件使用者插入自定义内容：

```html
<my-card>
    <span slot="title">我的标题</span>
    <p>卡片内容</p>
</my-card>

<script>
    class MyCard extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: "open" });
            shadow.innerHTML = `
        <style>.card { border: 1px solid #ccc; }</style>
        <div class="card">
          <header><slot name="title">默认标题</slot></header>
          <div class="content"><slot></slot></div>
        </div>
      `;
        }
    }
    customElements.define("my-card", MyCard);
</script>
```

## 七、实际应用场景

1. **浏览器原生控件**：`<video>`、`<audio>` 等内部就用了 Shadow DOM，你看不到它们的内部结构
2. **组件库**：Angular 默认开启 ViewEncapsulation.ShadowDom；Vue 可通过 `options.shadowRoot` 启用
3. **微前端子应用隔离**：用 Shadow DOM 隔离子应用的样式
4. **富文本编辑器**：隔离编辑器内容与页面样式

## 八、注意事项与限制

| 注意点       | 说明                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| 无法全局穿透 | 外部定义的关键帧动画（`@keyframes`）无法进入 Shadow DOM                |
| 事件重定向   | 从 Shadow DOM 内部冒泡出来的事件，`target` 会被重定向为宿主元素        |
| 焦点管理     | 需要手动处理内部可聚焦元素的焦点行为                                   |
| 性能         | 创建大量 Shadow DOM 会带来额外内存开销                                 |
| 调试         | Chrome DevTools 需要开启 "Show user agent shadow DOM" 才能看到内部结构 |

## 九、常见面试题

**Q: Shadow DOM 和虚拟 DOM 有什么区别？**  
A: Shadow DOM 是浏览器原生提供的**封装机制**，解决样式和 DOM 隔离；虚拟 DOM 是框架（如 React）在 JS 层面的**性能优化手段**，用于减少真实 DOM 操作。两者没有直接关系。

**Q: `mode: 'closed'` 就绝对安全吗？**  
A: 不完全。虽然 `element.shadowRoot` 返回 `null`，但依然可以通过其他方式（如递归遍历、原型链篡改）访问到内部，它更多是“防止意外访问”而非“安全边界”。

**Q: Shadow DOM 内部的元素能否被外部 JS 查询到？**  
A: 不能。`document.querySelector` 无法穿透 Shadow Boundary。必须通过宿主元素的 `.shadowRoot` 属性进入内部后，再查询。
