# 通用打包优化-产物体积

## 针对 babel 的优化

众所周知，在工程化项目里，为了使用最新的 es 语法并兼容低版本浏览器，需要用 babel 将源代码编译为低版本可以使用的代码。同时还会引入一些 polyfill 让低版本浏览器能够使用一些[原生]方法。但是对于现代浏览器，这些添加的方法会造成额外的打包体积。

乍一看好像为了项目正常运行没法优化，实际上可以通过生成两套代码，一套不添加 polyfill 一套添加 polyfill，然后利用 script 标签的特性，在不同版本浏览器加载不同 js 达到优化的目的

特性：

1. script 标签的脚本，只有一些浏览器能识别的 type 类型才会自动执行 (text/javascript、application/javascript)；现代浏览器支持 type="module"而老的浏览器环境不支持
2. 在现代浏览器中，如果 script 标签具有 nomodule 属性，那么该 script 的代码（引入的脚本文件也是）不会运行；而这个属性在不支持该属性的浏览器环境会被忽略
3. 只要支持 type="module"的浏览器环境，就能支持 nomodule 属性

```html
<!-- 有两个脚本：a.js 和 b.js -->
<script src="a.js" type="module"></script>
<script src="b.js" nomodule></script>

<!-- 当在现代浏览器中：type="module"和nomodule都能够识别所以会执行a.js，而b.js会被忽略 -->
<!-- 当在老浏览器中：type="module"和nomodule都不支持。此时type="module"的脚本因为不识别该类型而不执行。而nomodule属性被忽略b.js会执行 -->
```

通过上述例子就能用来针对 babel 进行优化
