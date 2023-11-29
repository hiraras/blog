# 浏览器指纹

[参考](https://www.bilibili.com/list/watchlater?bvid=BV1RM411Q7Yn&oid=535056835)

是一种技术，它能让你在用户没有登录的时候，知道你是谁。

## 实现

它基于世界上很难出现两个完全一样的浏览器环境，包括 ip 地址，js 代码的全套 API（不同浏览器、不同浏览器版本 api 可能有或多或少的差别）。例如使用 canvas 相关 api，相同代码绘制出来的图像虽然肉眼可能区别不出来，但转为图像数据就会有所不同。

```js
// 一个示例
function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;

  const ctx = canvas.getContext("2d");

  // 绘制不同图案
  ctx.fillStyle = "rgb(128, 0, 0)";
  ctx.fillRect(10, 10, 100, 100);

  ctx.fillStyle = "rgb(0, 128, 0)";
  ctx.fillRect(50, 50, 100, 100);

  ctx.strokeStyle = "rgb(0,0,128)";
  ctx.lineWidth = 5;
  ctx.strokeRect(30, 30, 80, 80);

  ctx.font = "20px Arial"; // 字体
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillText("Hello", 60, 110);

  // 转为一个包含图像数据的Base64字符串
  const dataURL = canvas.toDataURL();

  const hash = hashCode(dataURL); // 转换为hash，hash为一个数字，hash字符串实际是这个数字转为十六进制后的字符串
  return hash;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 将hash值转为32位整数
  }
  return hash;
}
```

## 第三方库

[fingerprintjs](https://github.com/fingerprintjs/fingerprintjs)
