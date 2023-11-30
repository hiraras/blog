# js 操作 css 的方法

cssom 树的根节点为 StyleSheetList，其中包括了几种样式表：

1. 内部样式表 <style>
2. 外部样式表 <link>
3. 行内样式表 <div style="">
4. 浏览器默认样式表（div 的 display 之所以为 block，就是因为默认样式表中的定义）

除了<浏览器默认样式表>无法操作其他的均能操作

## 操作方法

1. 行内样式表

```js
dom.style.color = "red";
```

2. 内部样式 & 外部样式

```js
// 获取样式表集合，每个样式表对象有很多css规则且可以操作
const { styleSheets } = document;
// 在第一个样式表中添加一个规则，第一个参数为选择器，第二个参数为值
// 相当于在一个style/link中添加了 div{ color: red !important } 的代码
styleSheets[0].addRule("div", "color: red !important");
```
