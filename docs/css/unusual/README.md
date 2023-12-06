# 不常用的 css

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

- 渐变文本：

```css
.gradient-text {
  background-image: linear-gradient(60deg, #e21143, #ffb03a);
  background-clip: text;
  color: transparent;
}
```

- 文字环绕：

```html
<img src="assets/images/img (1).jpeg" class="img" />
<div>
  1. 最开始的时候，渲染主线程会进入一个无限循环 2.
  每一次循环会检查消息队列中是否有任务存在。如果有就取出第一个任务执行，执行完一个后进入下一次循环；如果没有则进入休眠状态。
  3.其他所有线程（包括其他进程的线程，浏览器线程可以监听用户交互比如点击事件，然后就将点击的回调放入消息队列）可以随时向消息队列添加任务。
  新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务。
  以上也能看出，浏览器的工作模式是：每个标签页维护自己的渲染主线程，渲染主线程中有个消息队列，执行了一些代码后，会将任务分发给其他线程/进程，等其他线程/进程处理完任务后，将回调放到消息队列，由消息队列按照排队的规则执行
  如果让渲染主线程等待这些任务的时机到达，就会导致主线程长期处于"阻塞"的状态，从而导致浏览器"卡死"
  ### JS 为何会阻碍渲染？ 因为 js 执行和 ui 的渲染都发生在渲染主线程，js
  任务没有执行完毕，自然就会阻碍渲染任务的执行
</div>
```

普通文字环绕

```css
.img {
  float: left;
}
```

圆形环绕

```css
.img {
  height: 100px;
  width: 100px;
  float: left;
  border-radius: 50%;
  /* shape-outside是专门用来设置元素文字环绕形状的属性。默认采用元素原本形状的矩形。用法和clip-path一致 */
  shape-outside: circle(50% at 50% 50%);
}
```

多边形环绕(三角形)

```html
<div class="triangle"></div>
<div>
  1. 最开始的时候，渲染主线程会进入一个无限循环 2.
  每一次循环会检查消息队列中是否有任务存在。如果有就取出第一个任务执行，执行完一个后进入下一次循环；如果没有则进入休眠状态。
  3.其他所有线程（包括其他进程的线程，浏览器线程可以监听用户交互比如点击事件，然后就将点击的回调放入消息队列）可以随时向消息队列添加任务。
  新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务。
  以上也能看出，浏览器的工作模式是：每个标签页维护自己的渲染主线程，渲染主线程中有个消息队列，执行了一些代码后，会将任务分发给其他线程/进程，等其他线程/进程处理完任务后，将回调放到消息队列，由消息队列按照排队的规则执行
  如果让渲染主线程等待这些任务的时机到达，就会导致主线程长期处于"阻塞"的状态，从而导致浏览器"卡死"
  ### JS 为何会阻碍渲染？ 因为 js 执行和 ui 的渲染都发生在渲染主线程，js
  任务没有执行完毕，自然就会阻碍渲染任务的执行
</div>
```

```css
.triangle {
  width: 100px;
  height: 100px;
  background-color: aqua;
  float: left;
  --shape: polygon(0 0, 0 100%, 100% 100%);
  shape-outside: var(--shape);
  clip-path: var(--shape);
}
```

- 彩色边框

1. 使用 border-image(不支持圆角)

```css
border: 4px solid;
border-image: linear-gradient(#8f41e9, #578aef);
border-image-slice: 4;
border-radius: 4px;
```

2. background-image & background-clip & background-origin

```css
border: 4px solid transparent;
border-radius: 16px;
background-clip: padding-box, border-box;
background-origin: padding-box, border-box;
background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #8f41e9, #578aef);
```
