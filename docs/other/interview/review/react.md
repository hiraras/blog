# React

## React 状态更新的步骤

### Fiber 版本之前

组件状态发生更新时，从该节点开始，遍历整棵子树。
遍历过程(整个过程不可中断，可能造成界面阻塞)：

-   执行子树包含的所有组件的 render 方法，生成新的虚拟 dom 树(如果组件的`shouldComponentUpdate`返回 false 则跳过执行 render)
-   生成新的虚拟 dom 树期间，每次重新运行 render 方法后会直接 diff 并记录下发生的变更(协调阶段，边遍历边 diff)
-   将 diff 算法对比出来的结果转为真实 dom 修改需要的操作(commit 阶段)

### Fiber 版本

Fiber 版本中 React 维护了两棵树(逻辑上的两棵)，current 和 WIP，以下介绍不同阶段它们的变化和关系

1. 挂载阶段

-   react 在初始化的时候就会创建一个 root `{ alternate: null }`，即便它是空壳对象，并将赋值给 current
-   根据 root 创建 wip 版本的根节点，此时`wip.alternate`指向`current`，`current.alternate`指向 wip
-   执行各个子组件，并生成 Fiber 节点(render 的过程中)，同时将子节点的 Fiber 的 `alternate` 设置为 `null`
-   遍历完所有组件后得到完整的 wip 树
-   将 wip 树 commit 更新到界面(Fiber 树是虚拟 dom 的高级描述，不需要转为虚拟 dom)
-   将 current 指向 wip，alternate 指向一开始的空壳对象
-   这一阶段执行完，current 指向挂载阶段的 Fiber 树，只有根节点的 alternate 指向 wip(这时为空壳对象)，子节点的 alternate 都为 null

1. 第一次更新阶段

-   wip 指向空壳对象(挂载阶段的旧树)
-   按深度优先执行子组件，生成新的 Fiber，新的 Fiber 和 current 对应的 Fiber 进行 reconcile(diff + 标记副作用)，同时设置 alternate 循环引用
-   遍历完所有组件后得到完整的 wip 树
-   将 wip 树 commit 更新到界面(Fiber 树是虚拟 dom 的高级描述，不需要转为虚拟 dom)
-   将 current 指向 wip，alternate 指向上一渲染帧的 current Fiber 树，所有节点的 alternate 都循环引用与之对应的新旧 Fiber

3. 后续更新

-   wip 指向旧的渲染帧的 Fiber 树(`wip = current.alternate`)
-   按深度优先遍历子组件，如果组件的 state/props 没有发生变化且命中 bailout，则不执行函数体，直接复用 Fiber
-   如果组件发生了更新，先获得新的`memoizedState`，然后执行函数体获得新的 JSX(组件状态发生了更新组件的 Fiber 容器不变，Fiber 中记录的 memoizedState 会变化，jsx 相关的变化则是对应的 child 属性，所以组件本身的 Fiber 是可以复用的)
-   将 current 中的旧 Fiber 和 JSX 进行 reconcile(先执行旧 Fiber 和 JSX 的 diff，如果可复用则用 current 的 alternate，不可复用则重建 Fiber)
-   遍历完所有组件后得到完整的 wip 树
-   将 wip 树 commit 更新到界面(Fiber 树是虚拟 dom 的高级描述，不需要转为虚拟 dom)
-   将 current 指向 wip，alternate 指向上一个的渲染帧的 current Fiber 树，所有节点的 alternate 都循环引用与之对应的新旧 Fiber

如果更新过程发生了中断

-   已经经历过 reconcile 的节点(它的副作用标记)会保存在 wip 上，所以可以根据情况直接复用，而避免重复工作
-   如果中断后的更新让前面的无法复用，则重新 reconcile
-   后续过程和上面[后续更新]的步骤一样

总结 Fiber 的核心是：用 alternate 做对象复用，用 current 做 diff 基准，用 wip 构建下一帧

## hooks 为什么不能写在 条件/循环语句中

hooks 在组件中是以链表的方式存储的，如果放在条件/循环语句中可能因为条件或循环体的变化导致链表发生变化，从而进一步导致状态错乱，数据丢失，组件崩溃等现象

`eslint-plugin-react-hooks`这个 eslint 插件会检测出破坏这个规则的代码

hooks 的链表存储在 `fiber` 节点的 `memoizedState` 属性上

```js
// 一个使用 Hooks 的组件
function Counter() {
    const [count, setCount] = useState(0); // Hook 1
    const [name, setName] = useState("React"); // Hook 2

    useEffect(() => {
        // Hook 3
        console.log("effect");
    }, [count]);

    return <div>{count}</div>;
}

// 对应的 Fiber 节点中的 Hooks 链表结构
const fiber = {
    memoizedState: {
        memoizedState: 0, // count 的值
        next: {
            // 指向下一个 Hook
            memoizedState: "React", // name 的值
            next: {
                memoizedState: {
                    create: () => console.log("effect"),
                    deps: [0],
                    destroy: undefined,
                },
                next: null,
            },
        },
    },
};
```

## react 的 getSnapshotBeforeUpdate()函数，为什么可以实现提前计算新的布局，浏览器不是还没更新吗

```js
// Commit 阶段的执行顺序
1. 执行 DOM 更新（增/删/改）
   ↓
2. 浏览器重新计算布局（Layout/Reflow）← DOM 已更新
   ↓
3. 执行 getSnapshotBeforeUpdate() ← 此时布局已计算完成
   ↓
4. 执行 componentDidUpdate()
   ↓
5. 浏览器绘制（Paint）← 用户看到更新
```

## React 原生组件

### Fragment

代码片段，渲染时不会产生另外的 html 元素

-   Fragment 和 <></> 的区别

最终渲染结果是一样的，但是 Fragment 可以设置 key，所以在循环中使用时必须使用 Fragment

另外

```js
// 某些特殊场景（实际上很少这样用）
<React.Fragment data-testid="fragment-group">
    <div>内容1</div>
    <div>内容2</div>
</React.Fragment>
```

### Profiler

React 提供的性能分析工具

1. 识别渲染瓶颈：检测哪些组件渲染耗时过长
2. 分析渲染频率：查看组件是否发生了不必要的重复渲染
3. 定位优化目标：确定哪些组件值得使用 React.memo、useMemo、useCallback 等优化手段
4. 对比优化前后效果：验证优化措施是否真正有效

```js
import { Profiler } from "react";

function onRenderCallback(
    id, // Profiler 树的标识
    phase, // "mount" 或 "update"
    actualDuration, // 本次渲染耗时
    baseDuration, // 无缓存时的预估耗时
    startTime, // 开始渲染的时间戳
    commitTime, // 提交渲染的时间戳
    interactions // 交互集合
) {
    console.log(`${id} - ${phase} 阶段耗时: ${actualDuration}ms`);
}

function App() {
    return (
        <Profiler id="App" onRender={onRenderCallback}>
            <MyComponent />
        </Profiler>
    );
}
```

### StickMode

React 提供的一个开发环境专用的工具，用于帮助开发者发现应用中潜在的问题。它不会在生产环境中运行，因此没有性能影响。

帮助发现以下四类问题:

1. 不安全的生命周期 - 检测已废弃的生命周期方法（如 componentWillMount、componentWillReceiveProps、componentWillUpdate）
2. 遗留 API 使用 - 检测 findDOMNode、旧版 context 等已废弃 API
3. 意外副作用 - 通过双重调用检测副作用相关代码是否健壮
4. 废弃的 ref API - 检测字符串 ref 等旧用法

```js
function App() {
    return (
        <div>
            <Header />
            <StrictMode>
                {/* 只对这部分组件生效 */}
                <ProblematicComponent />
                <LegacyComponent />
            </StrictMode>
            <Footer />
        </div>
    );
}
```

核心机制：双重调用 - 在开发环境下，它会刻意将某些操作执行两次

1. 组件函数体（函数组件和类组件的 render 方法）
2. useState / useReducer 的初始化函数
3. useMemo / useCallback 的回调函数
4. useEffect / useLayoutEffect / useInsertionEffect 的清理函数和回调

### Suspense

React 提供的一个声明式加载状态管理组件，允许组件在等待某些异步操作（如数据获取、代码分割）时，优雅地显示 fallback 内容（如 loading 状态）

它的核心理念是：让组件只关心"数据准备好了吗？"，而不关心"如何等待数据"。

**核心作用**

1. 代码分割 - 配合 React.lazy 实现路由级别的按需加载
2. 数据获取 - 与支持 Suspense 的数据框架（如 Relay、Next.js、SWR）配合使用
3. 资源加载 - 管理图片、样式等资源的加载状态
4. 统一 loading 管理 - 避免组件树中分散的 loading 状态逻辑

## React 原生 hooks

### useActionState

```jsx
import { useActionState } from "react";

async function submitForm(prevState, formData) {
    // prevState: 上一次的状态
    // formData: 表单提交的数据

    const name = formData.get("name");
    const email = formData.get("email");

    try {
        // 模拟异步提交
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) throw new Error("提交失败");

        return {
            success: true,
            message: "用户创建成功！",
            data: await response.json(),
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            errors: { name: "用户名无效" }, // 字段级错误
        };
    }
}

function UserForm() {
    const [state, formAction, isPending] = useActionState(submitForm, {
        success: null,
        message: "",
        errors: {},
    });

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="name">姓名</label>
                <input type="text" id="name" name="name" />
                {state.errors?.name && (
                    <span style={{ color: "red" }}>{state.errors.name}</span>
                )}
            </div>

            <div>
                <label htmlFor="email">邮箱</label>
                <input type="email" id="email" name="email" />
            </div>

            <button type="submit" disabled={isPending}>
                {isPending ? "提交中..." : "提交"}
            </button>

            {state.message && (
                <p style={{ color: state.success ? "green" : "red" }}>
                    {state.message}
                </p>
            )}
        </form>
    );
}
```

### useCallback

让开发者在 re-renders 的时候缓存函数定义

```js
const handleSubmit = useCallback(
    (orderDetails) => {
        post("/product/" + productId + "/buy", {
            referrer,
            orderDetails,
        });
    },
    [productId, referrer]
);
```

### useContext

让开发者在组件中订阅 Context

```js
const theme = useContext(ThemeContext);
```

### useDebugValue

React 开发工具 Hook，用于在 React DevTools 中为自定义 Hook 添加自定义标签，方便调试时快速识别 Hook 的当前状态。

```js
import { useState, useEffect, useDebugValue } from "react";

function useFriendStatus(friendId) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        // 订阅好友状态
        const status = subscribeToFriendStatus(friendId);
        setIsOnline(status);
    }, [friendId]);

    // 在 DevTools 中显示 "FriendStatus: Online" 或 "Offline"
    useDebugValue(isOnline ? "Online" : "Offline");

    return isOnline;
}

// 使用时，在 DevTools 中可以看到 Hook 的调试信息
function FriendComponent({ friendId }) {
    const isOnline = useFriendStatus(friendId);
    return <div>{isOnline ? "在线" : "离线"}</div>;
}
```

### useDeferredValue

用于延迟更新某个值的状态，让 React 可以优先处理更紧急的更新，而将非紧急的更新延后执行

核心作用：在并发渲染中标记某些更新为"低优先级"，避免阻塞用户交互。

```js
import { useState, useDeferredValue } from "react";

function SearchComponent() {
    const [input, setInput] = useState("");
    const deferredInput = useDeferredValue(input);

    return (
        <div>
            {/* 紧急更新：立即响应输入 */}
            <input value={input} onChange={(e) => setInput(e.target.value)} />

            {/* 延迟更新：使用 deferredInput 渲染 */}
            <SlowList query={deferredInput} />
        </div>
    );
}

function SlowList({ query }) {
    // 假设这是一个渲染很慢的列表
    return (
        <div>
            {Array(10000)
                .fill()
                .map((_, i) => (
                    <div key={i}>结果: {query}</div>
                ))}
        </div>
    );
}
```

### useEffect 和 useLayoutEffect

```js
// useEffect 第一次必执行，后续每次执行都会先执行一边清理函数，再重新使用传入的函数注册副作用
useEffect(() => {
    console.log("副作用执行");
    return () => {
        console.log("清理函数执行");
    };
}, [count]);
```

```js
// useLayoutEffect是 useEffect 的另一个版本，发生在浏览器绘制之前，在函数组件中基本等同于 getSnapshotBeforeUpdate的触发时间，实际上class的getSnapshotBeforeUpdate在它之前执行
useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
}, []);
// 如果在useLayoutEffect里执行getBoundingClientRect/读取dom高度等操作，会触发重排，但新的重排会和之前的合并，最后只触发一次浏览器绘制

/**
 * 
React 更新 DOM
useLayoutEffect 执行
读取布局属性 → 强制同步计算布局
修改 DOM 样式
浏览器绘制（一次绘制，显示最终结果）
 */
```

### useEffectEvent

React 19 引入的实验性 Hook，用于解决 Effect 中依赖项过于复杂的问题。它允许你在 Effect 中调用不触发 Effect 重新执行的函数

```js
const eventHandler = useEffectEvent(callback);
// callback：包含非响应式逻辑的函数
// 返回的函数在 Effect 中调用时，不会影响 Effect 的依赖数组

// 示例
function Component({ userId, onLogin }) {
    // ❌ 响应式值：变化会触发 Effect 重新执行
    const [count, setCount] = useState(0);

    // ✅ 非响应式：通过 useEffectEvent 包装，变化不触发 Effect
    const handleLogin = useEffectEvent(() => {
        onLogin();
        console.log("当前 count:", count); // 可以读取最新值
    });

    useEffect(() => {
        handleLogin(); // 调用时不依赖 handleLogin 的稳定性
    }, [userId]); // 只需依赖真正的响应式值
}
```

### useId

React 18 引入的 Hook，用于生成唯一且稳定的 ID，主要用于解决服务端渲染（SSR）和客户端渲染中 ID 不一致的问题

```js
const id = useId();
```

### useImperativeHandle

React 提供的 Hook，用于自定义暴露给父组件的实例值（通常是 ref 对象）。它允许子组件有选择性地暴露内部方法或属性，而不是将整个 DOM 节点或组件实例暴露给父组件。

```js
// ❌ 默认情况下，forwardRef 暴露整个 DOM 节点
const ChildInput = forwardRef((props, ref) => {
    return <input ref={ref} type="text" />;
});

function Parent() {
    const inputRef = useRef(null);

    // 父组件可以访问 DOM 的所有属性和方法
    inputRef.current.focus();
    inputRef.current.value = "xxx";
    inputRef.current.style.color = "red";
    // 暴露了过多细节

    return <ChildInput ref={inputRef} />;
}

// 自定义暴露给父组件的方法，这样父组件就只能使用 inputRef.current上的 focus,clear,getValue 3个函数
useImperativeHandle(ref, () => ({
    focus: () => {
        inputRef.current.focus();
    },
    clear: () => {
        inputRef.current.value = "";
    },
    getValue: () => {
        return inputRef.current.value;
    },
}));
```

### useMemo

缓存计算结果

```js
const cachedValue = useMemo(calculateValue, dependencies);
```

### useOptimistic

React 19 引入的 Hook，用于实现乐观更新（Optimistic UI）。它允许你在异步操作完成前立即更新 UI，让用户感觉响应更快，如果操作失败则回滚到之前的状态。

核心作用：在等待异步操作（如表单提交、网络请求）时，立即显示预期的结果，提升用户体验。

```js
import { useOptimistic, useState } from "react";

function MessageList() {
    const [messages, setMessages] = useState([{ id: 1, text: "Hello" }]);

    // 定义乐观更新逻辑
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (currentMessages, newMessage) => {
            return [...currentMessages, newMessage];
        }
    );

    const sendMessage = async (text) => {
        const tempId = Date.now();
        const newMessage = { id: tempId, text, isPending: true };

        // 立即显示（乐观更新）
        addOptimisticMessage(newMessage);

        try {
            // 实际发送请求
            const response = await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify({ text }),
            });
            const savedMessage = await response.json();

            // 用真实数据替换临时数据
            setMessages((prev) =>
                prev.map((msg) => (msg.id === tempId ? savedMessage : msg))
            );
        } catch (error) {
            // 失败时回滚
            setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
        }
    };

    return (
        <div>
            {optimisticMessages.map((msg) => (
                <div key={msg.id} style={{ opacity: msg.isPending ? 0.5 : 1 }}>
                    {msg.text}
                </div>
            ))}
            <button onClick={() => sendMessage("新消息")}>发送</button>
        </div>
    );
}
```

### useState

保存组件状态

```js
const [state, setState] = useState(initialState)
const [state, setState] = useState(() => {
    return initialState
}))
```

#### 合并更新

合并更新是指同一个事件循环中多个 setState 调用被批量处理，只触发一次重新渲染的优化机制

| 场景                       | React17 及以前 | React 18 (createRoot) |
| -------------------------- | -------------- | --------------------- |
| 同步事件                   | 合并           | 合并                  |
| 异步回调(setTimeout)       | 不合并         | 合并                  |
| Promise 回调               | 不合并         | 合并                  |
| 原生事件(addEventListener) | 不合并         | 不合并                |
| flushSync                  | 不合并         | 不合并                |

React 18 引入自动批处理，让异步事件的多个 state 合并操作也合并到了一起，可以使用 flushSync 强制不合并（等待 dom 强制更新）

```js
import { flushSync } from "react-dom";

const handleClick = () => {
    // 立即渲染
    flushSync(() => {
        setCount(1);
    });
    console.log("count 已更新，DOM 已更新");

    // 这个更新会单独渲染
    setName("hello");
};
// 执行该函数后
// 渲染 (第一次)
// count 已更新，DOM 已更新
// 渲染 (第二次)
```

### useReducer

React 提供的状态管理 Hook，是 useState 的替代方案，适用于复杂状态逻辑或多个子值的场景。它通过 reducer 函数来管理状态更新，使状态变化更可预测。

```js
const [state, dispatch] = useReducer(reducer, initialState, init?);
```

-   reducer：函数 (state, action) => newState，定义状态如何变化
-   initialState：初始状态
-   init：可选，延迟初始化函数
-   state：当前状态
-   dispatch：触发更新的函数

```js
import { useReducer } from "react";

// 定义 reducer 函数，它的定义让状态的更新限制在指定范围，更加可控可预测
function counterReducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return { count: 0 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <div>
            <div>计数: {state.count}</div>
            <button onClick={() => dispatch({ type: "increment" })}>+1</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
            <button onClick={() => dispatch({ type: "reset" })}>重置</button>
        </div>
    );
}
```

### useRef

创建 ref 对象，ref 对象可用来保存不会随 state 变化的值，也可以传给 dom，从而获得 dom 的引用

```js
const ref = useRef(initialValue);
```

### useSyncExternalStore

React 18 引入的 Hook，用于订阅外部数据源（如 Redux store、全局状态、浏览器 API）并确保在并发渲染下读取的数据是一致的。

```js
import { useSyncExternalStore } from "react";

// 外部 store（非 React 状态）
let count = 0;
const listeners = new Set();

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    return count;
}

function increment() {
    count++;
    listeners.forEach((listener) => listener());
}

function Counter() {
    const count = useSyncExternalStore(subscribe, getSnapshot);

    return (
        <div>
            <div>计数: {count}</div>
            <button onClick={increment}>+1</button>
        </div>
    );
}
```

### useTransition

React 18 引入的 Hook，用于将某些状态更新标记为非紧急的过渡更新，让 React 可以中断这些更新，优先处理更紧急的用户交互（如输入、点击）

核心作用：区分紧急更新和非紧急更新，保持 UI 响应流畅。

```js
const [isPending, startTransition] = useTransition();
// isPending：布尔值，表示过渡是否正在进行
// startTransition：函数，将回调中的更新标记为过渡更新
```

```js
function GoodSearch() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value); // 立即响应

        startTransition(() => {
            // 可中断的更新
            const results = performExpensiveSearch(value);
            setResults(results);
        });
    };

    return <input onChange={handleChange} />;
}
// 输入流畅，搜索延迟处理
```

### 路由守卫

```js
// CustomRoute
import { useNavigates } from '@/store/useNavigates'
import { useSSOLogin } from '@/store/useSSOLogin'
import { useUserInfo } from '@/store/useUserInfo'
import React, { useMemo } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

type Props = {
  checkNavigate?: boolean
} & RouteProps

const LOGIN_CHECK_PATH = ['/profile', '/snh48vote/center']

function checkLoginPath(path: string | readonly string[]) {
  if (typeof path === 'string') {
    return LOGIN_CHECK_PATH.some((p) => path.startsWith(p))
  }
  return path.some((item) => {
    return LOGIN_CHECK_PATH.some((p) => item.startsWith(p))
  })
}

const CustomRoute: React.FC<Props> = ({ checkNavigate = false, ...props }) => {
  const { navigates, hasGotten } = useNavigates()
  const { info } = useUserInfo()
  const { isChecked } = useSSOLogin()
  const { pathname } = useLocation()
  const isActive = pathname === props.path

  const checkLogin = useMemo(() => {
    if (props.path === undefined) {
      return false
    }
    return checkLoginPath(props.path)
  }, [props.path])

  if (checkLogin || checkNavigate) {
    if (!isActive) {
      return <Route {...props} />
    }
    if (checkNavigate && !hasGotten) {
      return null
    }
    if (checkNavigate && hasGotten) {
      if (!navigates.some((n) => n.path === props.path && n.visible)) {
        return <Redirect to="/" />
      }
    }
    if (checkLogin && !isChecked) {
      return null
    }
    if (checkLogin && isChecked) {
      if (!info) {
        return <Redirect to="/" />
      }
    }
  }

  return <Route {...props} />
}

export default React.memo(CustomRoute)
```
