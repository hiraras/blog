# Event

js 中的通用事件对象

```js
const btn = document.querySelector("button");
setTimeout(function () {
    const e = new Event("test-event", { bubbles: true }); // 设置冒泡
    e.data = 111;
    btn.dispatchEvent(e);
}, 1000);
// btn开始的事件冒泡到document然后触发事件
document.addEventListener(
    "test-event",
    function (e) {
        console.log(e); // e.data === 111
    },
    false
);
```

# CustomEvent

如果需要在触发事件的同时，传递数据，应该使用 CustomEvent,它是标准的传递数据的方案

```js
const btn = document.querySelector("button");
setTimeout(function () {
    const e = new CustomEvent("test-event", {
        bubbles: true,
        detail: { a: 1, name: "hirara" },
    });
    e.data = 111;
    btn.dispatchEvent(e);
}, 1000);

document.addEventListener(
    "test-event",
    function (e) {
        console.log(e); // e.detail可以取到传递的数据，e.data === 1,也可以收到数据，但不标准
    },
    false
);
```

# 其他事件

事件监听时，如果监听的是 click 事件，但是 dispatchEvent 时传入的是 Event 类型的事件，也可以触发事件，但无法拿到真实点击时可以获取的 clientX/clientY 等鼠标点击的信息

```js
// 模拟完整鼠标点击（包含坐标、按键状态）
const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 200,
    button: 0, // 左键
    ctrlKey: true,
});
button.dispatchEvent(clickEvent);

// 模拟键盘输入
const keyEvent = new KeyboardEvent("keydown", {
    key: "Enter",
    code: "Enter",
    shiftKey: false,
    bubbles: true,
});
input.dispatchEvent(keyEvent);
```

总的来说，需要使用 js 来触发事件系统时，虽然只要事件名对应上，就可以触发对应事件，但还是要根据需要，正确选择对应的事件类型

| 构造器                                | 适用场景                           | 可携带信息                      | 能否冒泡（默认）             | 能否取消默认行为                |
| ------------------------------------- | ---------------------------------- | ------------------------------- | ---------------------------- | ------------------------------- |
| `new Event(type, options)`            | 通用、自定义事件名，无特殊数据需求 | 无专用数据字段                  | 可配置（`bubbles: true`）    | 可配置（`cancelable: true`）    |
| `new CustomEvent(type, options)`      | 需要传递自定义数据                 | `detail` 字段可携带任意 JS 数据 | 可配置                       | 可配置                          |
| `new MouseEvent(type, options)`       | 模拟鼠标操作（点击、移动、滚轮等） | 鼠标坐标、按键、修饰键等        | 默认 `bubbles: true`，可配置 | 默认 `cancelable: true`，可配置 |
| `new KeyboardEvent`                   | 模拟键盘操作                       | 按键码、修饰键等                | 默认 `bubbles: true`         | 默认 `cancelable: true`         |
| `new FocusEvent`                      | 模拟焦点变化                       | `relatedTarget`                 | 默认 `bubbles: false`        | 可配置                          |
| `new InputEvent`                      | 模拟输入事件                       | 输入数据、输入法组合等          | 默认 `bubbles: true`         | 可配置                          |
| `new PointerEvent` / `new TouchEvent` | 模拟指针/触摸操作                  | 压力、倾斜角、触摸点等          | 默认 `bubbles: true`         | 可配置                          |
