## requestIdleCallback

回调函数会在绘制之后执行

传入一个参数 e，可以通过 e.timeRemaining()来知晓当前帧还剩多少空闲时间（即前面执行的内容执行完后还剩多少时间）

react fiber 就是依赖这个 api 实现的，但浏览器支持不太好，所以 react 开发者使用了一个 polyfill（自己实现的 api）

旧的 react 的更新流程：当父组件状态改变时，子组件也会重新渲染（重新调用 render），可以通过 PureComponent、React.memo 进行优化，避免无脑更新，旧的流程更新时 diff 算法无法暂停记录当前节点，而后继续在之前的位置计算，而 fiber 使用新的结构（链表）各个节点记录了子节点、父节点、下一个兄弟节点的引用，使得 diff 算法可以暂停，只要记录了当前遍历的位置，就能继续之前的进度。**fiber 实际是细化了 diff 的粒度**

vue 使用 defineProperty 的 setter 和 getter（3.0 为 proxy）可以确切的知道哪个组件进行了更新，所以只需要更新对应组件就行，不会像 react 那样暴力的直接更新整个子树。

不过无法说明孰好孰坏，因为 vue 的这种实现增加了监听成本
