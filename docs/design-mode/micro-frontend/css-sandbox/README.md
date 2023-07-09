## css 隔离

子应用之间、父子应用之间的样式可能会存在冲突的情况

### 解决-css 隔离

1. 方案一：

- 使用 shadow dom，在 shadow dom 中的元素样式不会影响到页面其他元素，但是存在 modal 这种节点挂在 body 上的组件，会造成样式丢失（因为样式是在 shadow dom 中，而 modal 挂在 body 上）
- shadow-dom 其实是浏览器的一种能力，它允许在浏览器渲染文档（document）的时候向其中的 Dom 结构中插入一棵 DOM 元素子树，但是特殊的是，这棵子树（shadow-dom）并不在主 DOM 树中。[参考](https://www.cnblogs.com/yf2196717/p/14732459.html)
- 创建

```JavaScript
const div = document.createElement('div');
const sr = div.attachShadow({mode: 'open'});
sr.innerHTML = '<h1>Hello Shadow DOM</h1>';
```

2. 方案二：

为子应用的根节点添加属性，然后通过选择器隔离样式，实现类似于 vue 的 scoped
