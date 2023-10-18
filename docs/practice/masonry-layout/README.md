# 瀑布流布局

## js 计算方式

思路：

1. 布局方面使用 position 定位
2. 根据容器大小计算应该有多少列，每列之间的间隙大小
3. 批量获取图片，生成 img 标签并添加到容器中
4. 同时计算并设置图片的 left 和 top 位置

```html
<div class="imgs"></div>
```

```js
const ctnElem = document.getElementsByClassName("imgs")[0]; // 容器元素

const imgWidth = 200; // 图片宽度
const spaceWidth = 24; // 图片间的垂直间隙

// 计算当前容器大小能放几列，并算出剩余宽度下的间隙大小
const calcColumn = () => {
  const rect = ctnElem.getClientRects()[0];
  const { width } = rect;
  const columnNum = Math.floor(width / imgWidth);
  const spaceNum = columnNum + 1;
  const spaceWidth = (width - columnNum * imgWidth) / spaceNum;
  return {
    columnNum,
    spaceWidth,
  };
};

// 获取图片，并设置相关样式，每张图片加载完成重新布局
const getImgs = () => {
  for (let i = 0; i < 8; i++) {
    const img = document.createElement("img");
    img.src = `./assets/images/img (${i + 1}).jpeg`;
    img.style.position = "absolute";
    img.style.width = imgWidth + "px";
    img.onload = setPosition;
    ctnElem.appendChild(img);
  }
};

// 计算并设置每张图片的left和top，最后设置容器的高度（position定位，高度坍塌）
/**
 * 计算方式：
 * 根据列数定义一个初始值全为0的数组，每一项对应该列下一张图片的top值
 * 每次先找出top最小的那一列，这就是下一张图片要放置的列
 * 知道了哪一列就知道了left，再去数组中去top就能得到每张图片的位置
 * 然后更新数组，最后更新容器大小就完成了
 */
const setPosition = () => {
  const { columnNum, spaceWidth } = calcColumn();
  const topList = new Array(columnNum).fill(0);
  const imgs = ctnElem.getElementsByTagName("img");
  for (img of imgs) {
    const minTop = Math.min(...topList);
    const minTopIndex = topList.findIndex((top) => top === minTop);
    img.style.left = minTopIndex * (imgWidth + spaceWidth) + "px";
    img.style.top = topList[minTopIndex] + "px";
    const height = img.height;
    topList[minTopIndex] += height + spaceWidth;
  }
  const maxTop = Math.max(...topList);
  ctnElem.style.height = maxTop + "px";
};

getImgs();

window.onresize = setPosition;
```
