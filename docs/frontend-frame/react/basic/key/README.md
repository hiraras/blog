## key

key，是 react 中一个特殊的 props，你无法在 props 取到 key

作用：

1. 帮助列表的排序、插入、删除等操作，react 在一次更新中对比就的 key，如果 key 相同，则保留组件否则会更新或删除或添加组件（有可能造成状态混乱）
2. 利用 key 更新的话组件会重建的特性，可以在父组件重置子组件状态
