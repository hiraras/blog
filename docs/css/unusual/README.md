## 不常用的 css

- Caret-color  可以改变光标的颜色 可以尝试给 input 加上这个属性看看
- shape-outside  可以改变盒子的形状，从而改变布局
- display: flow-root BFC 清楚浮动的一种，常用的一般是 clear:both overflower:hidden
- background:concic-gradient(red 0 30%,green 30% 60%,blue 60% 100%)  角向渐变 可以用 css 画饼图
- background-attachment 指定背景如何附着在容器上，可以对背景进行固定不随窗口改变高度滑动
- filter:blur(10px)  背景虚化模糊，有时候很方便
- appearance: none： 不显示 input 样式
- backdrop-filter: blur(6px); 模糊当前容器下边的（与该容器重叠的）内容
- pointer-events: none;设置了该样式的元素，监听事件会失效，并且如果视图下层存在其他可点击元素，则点击会渗透到下层
- object-fit 属性指定元素的内容应该如何去适应指定容器的高度与宽度；object-fit 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等

- 多行文本文字溢出时显示...：

```less
-webkit-line-clamp: 3; // 将第3行超出部分的文字显示为...
overflow: hidden;
// 如果没有这个，则容器高度还是3行的高度，但超出的文字依然会显示
display: -webkit-box;
-webkit-box-orient: vertical;
```

- 滚动条样式：

::-webkit-scrollbar 滚动条整体部分，可以设置宽度啥的

::-webkit-scrollbar-button 滚动条两端的按钮

::-webkit-scrollbar-track 外层轨道

::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分(除去)

::-webkit-scrollbar-thumb 滚动条里面可以拖动的那个

::-webkit-scrollbar-corner 边角

::-webkit-resizer 定义右下角拖动块的样式

示例

```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
}
```

- 容器的缩放

```css
 {
  resize: both;
  overflow: auto;
}
```
