## node 的 path 模块

### 为什么 node 端读取文件要使用 path.resolve()拼接路径

如果我们写的是相对路径，那么 node 会尝试去拼接成绝对路径

```js
// main.js
// 不使用path
const fs = require("fs"); // 处理文件的模块（读文件、修改文件等一系列操作）
const result = fs.readFileSync("./variable.css");
console.log("result", result.toString());
```

上述例子，如果执行 node 命令的文件夹和 variable.css 文件在同一级，则能够正确读取到该文件

如果执行 node 命令的文件夹在不同地方就会找不到该文件，例如在上一级目录中执行 `node test/main.js`，就会找不到该文件

原因是：node 端去读取文件或者操作文件的时候，如果发现你用的是相对路径，则会去使用 `process.cwd()` 来进行对应的拼接，它会获取当前的 node 执行目录，也就是说 `./` 变成了 test 目录

### commonjs 规范注入几个变量

`__dirname`: 代表当前文件所在的目录地址

```js
// main.js
// 不使用path
const fs = require("fs"); // 处理文件的模块（读文件、修改文件等一系列操作）
const result = fs.readFileSync(__dirname + "/variable.css");
console.log("result", result.toString());
```

上述代码使用 `__dirname` 进行路径拼接，那么在其他目录下也可以得到正确的路径了

`__filename`: 代表当前文件的地址

### 所以为什么还要换成 path 呢？

有几个优点：

1. path 能帮我们处理不同系统的 `/`，mac 和 windows 系统使用的 `/` 方向不同
2. 如果使用 `__dirname + ` 这样拼接，后面的字符串就只能使用 `/xxxx` 的形式，容易让人多想一遍正确路径是什么，而使用了`path.resolve(__dirname, './xxxx')`，就能让人直观的知道以当前文件所在目录去找某一个文件

path 本质上就是一个字符串处理模块，它里面有非常多的字符串处理方法

path.resolve(): 拼接字符串
