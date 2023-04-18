## flex 弹性布局

flex-grow: 有剩余空间时，元素按比例分配，默认值为 0，即默认不扩展

flex-shrink: 空间不够时，元素变窄的比例，默认值为 1，即默认缩小

flex-basis:
当方向轴上有剩余空间时，项目所占大小，默认为 auto，此时相当于没有；
如果 flex-grow 为 1，且兄弟元素也有 flex-grow 为 1 的元素，则 flex-basis 会共同作用，结果是元素宽度大于 flex-basis;

flex: 为 flex-grow flex-shrink flex-basis 的简写

- auto:1 1 auto
- 1:1 1 0%
- 2:2 1 0%
- none:0 0 auto
