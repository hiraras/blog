## CSS 基础/特性

### 优先级

!important > style > id 选择器 > 类选择器 > 标签选择器，权重相等时后边的 css 会被应用

### 清除浮动

1. 需要在父元素里边的最后添加一个元素并添加 clear 属性，如果是使用::after 伪元素，除了设置 clear 还要设置 display: block 才会生效
2. 设置父元素 bfc

### z-index

1. z-index 只能影响 position 值不是 static 的元素
2. 没有定义 z-index 时，层叠顺序按照在 DOM 中出现的顺序堆叠（越后边的越上边），非静态元素（及其子元素）始终出现在静态元素上边，而不管它出现的顺序
3. 有定义时，每个元素都各自应用自己的堆叠上下文，即它的子元素的 z-index 相对于父元素，如果 A 的子元素 C 具有比 B 的子元素 D 更高的 z-index 值，但是 A 的 z-index 小于 B，那么 B 和 D 还是会显示在 A 和 C 之上

### transform

改变 transform 或 opacity 不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）

### 伪类

:root 伪类选择文档的根元素（html）

### margin

margin-left 和 margin-top 会使元素向左和向上移动
margin-right 和 margin-bottom 会使自身在布局中所占的位置减少， 使右边的元素或下边的元素向自身移动

### 特殊字符

css 显示特殊字符：content: '\符号代码' 参考：https://www.webhek.com/post/html-enerty-code/

### BFC

block formatter context（块级格式上下文）是 web 页面可视化 css 渲染的部分，是块级盒布局发生的区域，也是浮动元素与其他元素交互的区域

#### 触发 BFC

- position：非 static 或 relative
- float：非 none
- display：inline-block、flex、inline-flex、table-cell、table-caption
- overflow：非 visible

#### 应用

1. 解决 margin 重叠
2. 两列布局(一个元素 float 的话能有文字环绕效果，设置了 bfc 后就能变成两列布局)
3. 如果一个元素内部子元素全都通过设置 float 脱离了文档流，可以设置 bfc，撑开该元素

### 隐藏元素

1. visibility：hidden; 占据位置、但无法点击
2. opacity: 0; 占据位置、且可以点击
3. display:none; 不占据位置，且无法点击
4. position: aboslute;left: -999999px; 移出屏幕
5. width: 0;height: 0;overflow: hidden; 设置宽高不可见
