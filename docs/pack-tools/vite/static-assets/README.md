# vite 中的静态资源

在 node 中，除了动态 Api 以外，99%都可以被视作静态资源

vite 对静态资源基本上是开箱即用的

## img

```js
import src from "./src/assets/images/plane.jpg";
const img = document.createElement("img");
img.src = src;
document.body.appendChild(img);
```

## json

```json
{
  "name": "alice",
  "age": 20
}
```

```js
import { name, age } from "./src/assets/json/index.json";
console.log(name, age); // json读取可以直接读取部分属性哦！而且可以tree-shaking
```

## svg

svg: scalable vector graphics 可伸缩矢量图形

优点：

1. svg 时不会失真的
2. 尺寸小

缺点：

没法很好的去表示层次丰富的图片信息

svg 有两种加载方式

1. 使用 img 标签加载

```js
// 把它视作图片来加载，方便，但是不能修改颜色
import src from "@/assets/svgs/hamburger.svg";
// 等同于 import src from "@/assets/svgs/hamburger.svg?url";
const img = document.createElement("img");
img.src = src;
document.body.appendChild(img);
```

2. 读取文件内容（svg 图片是一组 svg 的代码），放到 html 中

```js
// 读取最原始的字符串代码
import src from "@/assets/svgs/hamburger.svg?raw";
document.body.innerHTML += src;
const svgElement = document.getElementsByTagName("svg")[0];
svgElement.onmouseenter = function () {
  // 通过设置fill来设置 svg 图片的颜色
  this.style.fill = "red";
};
```

## vite 配置文件中对静态资源在生产环境中的配置

```js
{
  // ...,
  build: {
    minify: false, // 是否压缩
    rollupOptions: {
      // 配置rollup的一些构建策略
      output: {
        // ext为拓展名，name为文件名，hash代表将你的文件名和文件内容进行组合计算的结果
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    assetsInlineLimit: 4096, // 将图片大小小于该值的，转化为base64，默认为4kb
    outDir: "dist", // 打包输出目录
    assetsDir: "static", // 静态资源的目录
    emptyOutDir: true, // 清除输出目录中的所有文件
  },
}
```
