# Web Components

Web Components 是一组浏览器原生 API，允许你创建**可复用、封装良好**的自定义 HTML 标签。它由三项核心技术组成：

-   **Custom Elements**（自定义元素）：定义新的 HTML 标签
-   **Shadow DOM**（影子 DOM）：封装内部结构和样式
-   **HTML Templates**（模板）：声明惰性的 DOM 片段

下面从基础到进阶，介绍 Web Components 的完整使用方法。

---

## 一、快速开始：创建一个简单的 Web Component

```html
<!-- 1. 定义模板（可选但推荐） -->
<template id="user-card-template">
    <style>
        .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 8px;
            font-family: sans-serif;
        }
        .name {
            font-size: 1.2em;
            font-weight: bold;
            color: #2c3e50;
        }
        .email {
            color: #7f8c8d;
            font-size: 0.9em;
        }
    </style>
    <div class="card">
        <div class="name"><slot name="name">匿名用户</slot></div>
        <div class="email"><slot name="email">未提供邮箱</slot></div>
    </div>
</template>

<script>
    // 2. 定义组件类
    class UserCard extends HTMLElement {
        constructor() {
            super();
            // 3. 附加 Shadow DOM
            const shadow = this.attachShadow({ mode: "open" });

            // 4. 克隆模板内容
            const template = document.getElementById("user-card-template");
            const content = template.content.cloneNode(true);
            shadow.appendChild(content);
        }
    }

    // 5. 注册自定义元素
    customElements.define("user-card", UserCard);
</script>

<!-- 6. 使用组件 -->
<user-card>
    <span slot="name">张三</span>
    <span slot="email">zhang.san@example.com</span>
</user-card>
```

---

## 二、核心技术详解

### 1. Custom Elements（自定义元素）

#### 定义方式

```javascript
// 必须继承 HTMLElement 或其子类
class MyButton extends HTMLElement {
    constructor() {
        super(); // 必须先调用 super()
        // 初始化逻辑...
    }
}

// 注册：名称必须包含连字符
customElements.define("my-button", MyButton);
```

#### 生命周期回调

| 回调                         | 触发时机             | 用途                         |
| ---------------------------- | -------------------- | ---------------------------- |
| `constructor()`              | 元素创建或升级时     | 初始化状态、附加 Shadow DOM  |
| `connectedCallback()`        | 元素插入 DOM 时      | 获取数据、添加事件监听、渲染 |
| `disconnectedCallback()`     | 元素从 DOM 移除时    | 清理资源、移除事件监听       |
| `attributeChangedCallback()` | 监听的属性变化时     | 响应属性变化，更新视图       |
| `adoptedCallback()`          | 元素被移动到新文档时 | 较少使用                     |

```javascript
class MyCounter extends HTMLElement {
    static get observedAttributes() {
        return ["count"]; // 监听 count 属性变化
    }

    constructor() {
        super();
        this.count = 0;
    }

    connectedCallback() {
        this.render();
        this.button = this.shadowRoot.querySelector("button");
        this.button.addEventListener("click", () => this.increment());
    }

    disconnectedCallback() {
        this.button.removeEventListener("click", this.increment);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "count") {
            this.count = parseInt(newValue, 10);
            this.render();
        }
    }

    increment() {
        this.count++;
        this.setAttribute("count", this.count);
    }

    render() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: "open" });
        }
        this.shadowRoot.innerHTML = `
      <button>点击次数: ${this.count}</button>
    `;
    }
}

customElements.define("my-counter", MyCounter);
```

### 2. Shadow DOM（封装隔离）

```javascript
// open: 外部可通过 element.shadowRoot 访问
const shadowOpen = this.attachShadow({ mode: "open" });

// closed: 外部无法访问，element.shadowRoot 返回 null
const shadowClosed = this.attachShadow({ mode: "closed" });
```

**样式封装规则：**

-   外部样式不影响 Shadow DOM 内部
-   内部样式不影响外部
-   可继承属性（如 `color`、`font-family`）会从宿主继承

```javascript
// 在 Shadow DOM 内可用的特殊选择器
shadow.innerHTML = `
  <style>
    :host {           /* 选中宿主元素本身 */
      display: block;
      border: 1px solid;
    }
    :host-context(.dark-theme) {  /* 宿主在 .dark-theme 内时 */
      background: black;
      color: white;
    }
    ::slotted(.title) {   /* 样式化通过 slot 插入的内容 */
      font-weight: bold;
    }
  </style>
  <slot></slot>
`;
```

### 3. HTML Templates（模板）

```html
<!-- 模板不会被渲染，直到被 JS 激活 -->
<template id="my-template">
    <style>
        /* 样式 */
    </style>
    <div class="content">
        <!-- 定义插槽 -->
        <slot name="header">默认头部</slot>
        <slot>默认内容</slot>
    </div>
</template>

<script>
    const template = document.getElementById("my-template");
    const clone = template.content.cloneNode(true); // 深克隆
    // 使用 clone...
</script>
```

---

## 三、高级用法

### 1. 继承原生 HTML 元素

```javascript
// 扩展 <button> 元素
class SpecialButton extends HTMLButtonElement {
    constructor() {
        super();
        this.addEventListener("click", () => {
            this.textContent = "已点击!";
        });
    }
}

// 注册时指定 extends
customElements.define("special-button", SpecialButton, { extends: "button" });
```

```html
<!-- 使用 is 属性 -->
<button is="special-button">点击我</button>
```

### 2. 动态加载和懒加载

```javascript
// 当组件出现在视口中时才定义
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            import("./components/ExpensiveComponent.js");
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll("expensive-component").forEach((el) => {
    observer.observe(el);
});
```

### 3. 跨组件通信

```javascript
// 使用 CustomEvent 向上传递
this.dispatchEvent(
    new CustomEvent("my-event", {
        detail: { data: "some value" },
        bubbles: true, // 冒泡
        composed: true, // 穿透 Shadow DOM 边界
    })
);

// 父组件监听
document.addEventListener("my-event", (e) => {
    console.log(e.detail.data);
});
```

---

## 四、浏览器兼容性与注意事项

### 兼容性

-   **所有现代浏览器**（Chrome、Firefox、Safari、Edge）完全支持
-   **IE11**：需要 polyfill（不推荐）

### 注意事项

| 问题     | 解决方案                                              |
| -------- | ----------------------------------------------------- |
| SEO 问题 | 使用 SSR（如 Lit 的 SSR 支持）或服务端渲染            |
| 表单集成 | 手动实现 `FormData` 接口，使用 `ElementInternals` API |
| 可访问性 | 手动管理 ARIA 属性，确保键盘导航                      |
| 性能     | 避免在 `attributeChangedCallback` 中做重操作          |
| 测试     | 使用 Web Test Runner 或 Jest + jsdom                  |

### 与框架的互操作

```javascript
// React 中使用 Web Components
// 注意：React 对自定义事件和属性处理不够完善
function App() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        const handler = (e) => console.log(e.detail);
        el.addEventListener("my-event", handler);
        return () => el.removeEventListener("my-event", handler);
    }, []);

    return <user-card ref={ref} username="张三"></user-card>;
}
```

---

## 五、总结：什么时候用 Web Components？

**适合场景：**

-   跨框架共享的组件库（设计系统、UI 组件库）
-   长期维护、不依赖特定框架的项目
-   渐进式增强（在传统多页应用中添加交互组件）

**不太适合：**

-   复杂的应用状态管理（需要 Redux、MobX 等）
-   追求极致开发效率（React/Vue 生态更丰富）
-   需要大量 SSR 的场景

## 自己实现的 Counter 组件

```html
<my-counter>
    <div>公司：嘀嘀嘀</div>
    <div slot="info">用户信息: 年龄 - 20，姓名 - hirara</div>
</my-counter>
```

```js
class Counter extends HTMLElement {
    static get observedAttributes() {
        return ["count"]; // 监听 count 属性变化
    }
    count = 0;
    constructor() {
        super();
    }
    connectedCallback() {
        this.attachShadow({
            mode: "open",
        });
        this.render();
    }
    unconnectedCallback() {
        this.btn.removeEventListener("click", this.increment);
    }
    attributeChangedCallback() {
        this.render();
    }
    increment() {
        this.count++;
        this.setAttribute("count", this.count);
    }
    render() {
        this.shadowRoot.innerHTML = `
					<div>
						<span>${this.count}</span>
						<button id="btn">click</button>
						<slot></slot>
						<slot name="info"></slot>
					</div>
				`;
        this.btn = this.shadowRoot.querySelector("#btn");
        this.btn.addEventListener("click", () => this.increment());
    }
}

window.customElements.define("my-counter", Counter);
```
