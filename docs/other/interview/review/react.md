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

## Fragment 和 <></> 的区别

最终渲染结果是一样的，但是 Fragment 可以设置 key，所以在循环中使用时必须使用 Fragment

另外

```js
// 某些特殊场景（实际上很少这样用）
<React.Fragment data-testid="fragment-group">
    <div>内容1</div>
    <div>内容2</div>
</React.Fragment>
```

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

## React Fiber 架构

在 Fiber 架构之前，react 使用 Stack Reconciler

-   同步递归: 一旦开始渲染，就必须完成整个组件树的更新
-   无法中断: 如果组件树很大，会导致主线程长时间被占用
-   卡顿现象: 动画、用户输入等会被阻塞
