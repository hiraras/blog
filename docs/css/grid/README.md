## grid 网格布局

### 设置

- display: grid;
- display: inline-grid;

### 相关属性

1. grid-template-columns & grid-template-rows

- grid-template-columns: [line-name] \<track-size\> [line-name] \<track-size\> [line-name] \<track-size\>...[line-name]
- line-name: 线的名字，方便后边引用，使用时需带上[]；一条线可以使用多个名字，可以在[]内以空格隔开；可以省略
- track-size: 相邻两条线的距离，可以是长度、%、fr（相当于 flex 的比例）、auto（类似 1fr）；不可以省略
- track-size 还可以使用一些特殊"函数":
- repeat: repeat(3, 20px) === 20px 20px 20px;
- auto-fill: 当不知道容器大小的时候，不知道填写多少数量时可以使用，会自动填充满;
- repeat(auto-fill, 100px): 以 100px 的间隔填充网格
- minmax(minvalue, maxvalue): 表示长度在这范围之内，当和 auto-fill 一起使用时，auto-fill 会取尽可能大，即在满足 minmax 值的情况下，尽量多分几列；

minmax(300px, 400px) 这样设置的时候会取 400px 为元素宽度，所以直接设置两个具体的值没啥意义，通常结合 fr 使用

2. grid-template-areas: 可以为每个格子命名，这样使用:

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

- 也展示出了 areas 属性可以影响 rows，当设置 rows 为 auto 时，能够根据子元素排列渲染不同列数；

- **.** 可以表示一个无名格子

- 只要子元素引用的 area 在 areas 里合乎逻辑就能够正常渲染，否则不会渲染

3. grid-area:
   子元素通过这个属性设定位置、大小

4. column-gap、row-gap、gap:

- 设置格子之间的间距，可以理解为行、列的宽度，但是子元素跨越多个单元格的话不会被切分

- gap 是前两个的合并 gap: \<row-gap\> \<column-gap\>;

- 如果省略第 2 个则认为行和列一样

5. justify-items、align-items、place-items:

- 可以取 start、end、center、stretch；设定每个 item(不是每个 item 内的元素，grid 只对子元素有效)在网格的对其方式

6. justify-content、align-content、place-content:

- 可以取 start、end、center、stretch、space-around、space-between、space-evenly；
- 当子容器的大小小于当前容器时，可以设置每行/列在整个容器内的分布方式

7. grid-auto-columns、grid-auto-rows:

- 当网格中的网格项多余单元格，或被置于网格之外时，会自动创建格子来满足要求。可以用这两个属性指定隐式的格子的大小

8. grid-auto-flow: 控制自动放置算法的工作方式，

- row:默认，先填满行，当项目超出就换行;
- columns:先填满列，当项目超出就换列;
- row dense: 以行排列，可能会出现缺口，如果后面的项目有能填补空缺的，就填上;
- column dense: 同 row dense;

9. grid-column-end: 属性项目将横跨多少列，或者项目会在哪条列线

10. grid-row-end: 属性项目将横跨多少行，或者项目会在那条横线

11. grid-column-start： 列坐标

12. grid-row-start：行坐标
