# 浏览器渲染原理

当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。

在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。

整个渲染流程分为多个阶段，分别是：HTML 解析、样式计算、布局、分层、绘制、分块、光栅化、画

每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入。

这样，整个渲染流程就形成了一套组织严密的生产流水线。

- 第一步：解析 HTML （将 html 字符串转为对象形式的 DOM 树和 CSSOM（CSS Object Model） 树，方便后续操作；同时开放 js 改变这两个树的能力）

解析过程中遇到 CSS 解析 CSS，遇到 JS 执行 JS，为了提高效率，浏览器在 开始解析前，会启动一个预解析的线程，率先下载 HTML 中的外部 CSS 文件和外部 JS 文件，并解析部分 css 最后交给渲染主线程

如果主线程解析到 link 位置，此时外部的 CSS 文件还没有下载解析好，主线程不会等待，继续解析后续的 HTML。这是因为下载和解析 CSS 工作是在预解析线程中进行的。这就是 CSS 不会阻塞 HTML 解析的根本原因

如果主线程解析到 script 位置，会停止解析 HTML，转而等待 JS 文件下载好，并将全局代码解析执行完成后，才能继续解析 HTML。这是因为 JS 代码的执行过程可能修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是 JS 会阻塞 HTML 解析的根本原因。

第一步完成后会得到 DOM 树和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在 CSSOM 树中。

- 第二步：样式计算

主线程会遍历第一步得到的 DOM 树，结合 CSSOM 树依次为树中的每个节点计算出它最终的样式，称之为 Computed Style

在这一过程中，很多预设值会变成绝对值，比如 red 会变成 rgb(255,0,0)；相对单位会变为绝对单位如 em 会变成 px

这一步完成后，会得到一棵带有样式的 DOM 树。

- 第三步：布局

布局完成后会得到布局树 (layout 树)

布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。

**包含块**：根据不同定位包含块有所不同，例如没有设置定位的 div，包含块就是父 div；设置了 position: absolute 的 div，包含块就是最近的 position 为非 static 的元素。像 width: 80%就是根据包含块的宽度设置的。

大部分时候，DOM 树和布局树并非一一对应。

例如 display: none 的节点没有几何信息，因此不会生成到布局树；又比如使用了伪元素选择器，虽然 DOM 树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致 DOM 树和布局树无法一一对应。

- 第四步：分层（老的浏览器是没有的）

主线程会使用一套复杂的策略对整个布局树进行分层

分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率

滚动条、堆叠上下文、transform、opacity 等样式都会或多或少的影响分层结果，也可以通过 will-change 属性更大程度的影响分层结果

可以通过 chrome 浏览器控制台的[Layers]tab 来查看当前网页的分层情况

will-change:

如果一个元素里的内容，你知道它的某个属性是经常变动的例如 transform，就可以在 css 中为它设置 will-change: transform；能够为浏览器提供分层的信息（浏览器最终是否会分层还要看浏览器自己），切记也不能滥用该属性

- 第五步：绘制（渲染主线程的工作到此为止，剩余步骤交给其他线程完成）

这里的绘制，是为每一层生成如何绘制的指令（像是 canvas 绘画时的代码组成）

主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来

- 第六步：分块（分块是为了将整个网页当前接近视口区的内容先绘制出来，提高用户体验）

完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。

合成线程首先对每个图层进行分块，将其划分为更多的小区域

它会从线程池中拿取多个线程来完成分块工作

- 第七步：光栅化（将数据转化为位图的过程）

合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化

GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。

光栅化的结果，就是一块一块的位图

- 第八步：画

合成线程拿到每个层、每个块的位图后，生成一个个[指引（quad）]信息。这个指引信息就是具体像素信息了

指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形

变形发生在合成线程，与渲染主线程无关，这就是 transform 效率高的本质原因

合成线程会把 quad 交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

简化过程：

解析 html（link，js） -> dom 树、cssom 树
计算属性 -> dom 树&节点上带上最终的 css 信息（相对值也会变为绝对值）
布局 -> 计算几何信息 （layout 树）
分层 -> 将 dom 元素分层（优化重渲染），will-change
绘制 -> 将分层信息转化为类似 canvas 绘制代码的指令

----合成线程----

分块 -> 将每一层分为更小的块，优先绘制接近视口的块
光栅化 -> 将块信息转为位图信息，由 GPU 进程完成
画 -> 根据位图信息生成一个个指引信息（像素信息），交给 GPU（为什么已经有像素信息了还要交给 GPU 进程？是因为渲染进程为了安全是一个沙盒环境，不具有和硬件交互的能力，而 GPU 进程有这个能力），再交给显卡绘制到屏幕

## 面试题

1. 什么是 reflow（回流）？

reflow 的本质就是重新计算 layout 树

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息

浏览器在反复权衡下，最终决定获取属性立即 reflow

2. 什么是 repaint？

重绘的本质就是重新根据分层信息计算了绘制指令

当改动了可见样式后，就需要重新计算，会引发 repaint
由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint

3. 为什么 transform 的效率高？

<!-- 我的回答：因为 transform 属于图片的形变，发生在画的步骤，不会导致之前步骤的重新计算，同时这个形变工作是合成线程承担，不会影响到主线程效率 -->

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个[画]的阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响到 transform 的变化

## 有趣的例子

1. 网页因为 js 被卡死，但是并不会影响到页面滚动，因为滚动只影响到最后的画的步骤，发生在合成线程

```html
<button onclick="delay(5000)">delay</button>
<button onclick="log('xxxxx')">log</button>
<div>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
  <p>aijofaoeijeoaifj</p>
</div>
```

```js
function delay(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}
function log(msg) {
  // 会被卡死
  console.log(msg);
}
```

2. 网页被 js 卡死，但是使用了 transform 的动画继续运行，而使用 position 的动画被卡死。因为 transform 的变化只影响到最后一步画的步骤，使用的是合成线程

```html

```

<button onclick="delay(5000)">delay</button>

<div class="ball-wrapper">
    <div class="ball ball1"></div>
    <div class="ball ball2"></div>
</div>

```css
.ball {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: red;
  margin-top: 10px;
}
.ball-wrapper {
  position: relative;
}
.ball1 {
  animation: transformMove 1s infinite linear alternate-reverse;
}

.ball2 {
  position: relative;
  animation: positionMove 1s infinite linear alternate-reverse;
}

@keyframes positionMove {
  0% {
    left: 0;
  }
  100% {
    left: 300px;
  }
}

@keyframes transformMove {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(300px);
  }
}
```

```js
function delay(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}
```
