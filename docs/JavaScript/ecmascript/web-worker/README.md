## Web Worker

### 介绍

JavaScript 语言采用的是单线程模型，也就是所有任务只能在一个线程上完成，一次只能做一次。随着计算机计算能力的增强，尤其是多核 CPU 的出现，这就无法充分发挥计算机的计算能力

Web Worker 的作用就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者执行。在主线程运行的同时，workder 线程后台运行，两者互不干扰。可以将一些密集型或高延迟的任务分配给 Worker 线程，而不会阻塞主线程

Worker 线程一旦新建成功 ，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。但是这也造成 Worker 比较耗费资源，不应该过渡使用，一旦使用完毕就应该关闭

### 注意点

1. 同源限制： 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源
2. Dom 限制：Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 dom 对象，也无法使用 document、window、parent 这些对象，但是 Worker 可以使用 navigator 对象和 location 对象
3. 通信联系：Worker 线程和主线程不在一个上下文环境，它们不能直接通信，必须通过消息完成
4. 脚本限制：Worker 线程不能执行 alert 方法和 confirm 方法，但可以使用 XHR 对象发出 AJAX 请求
5. 文件限制：Worker 线程无法读取本地文件，即不能打开本机的系统文件，它所加载的脚本，必须来自网络

### API

**主线程：**

1. 构造函数

```js
/**
 * jsUrl: 脚本地址（必须同源）
 * options(可选): 配置
 * {
 *  name：可以用来区分Worker，在Worker线程内可以使用 self.name获取，未指定时，获取到的是空字符串
 *  type：指定woker类型，可以是classic或module，默认为classic，module模式，可以让Worker线程导入其他脚本时使用 ESModule 模式
 *  credentials：指定 woker 凭证，可以是omit、same-origin、include，如未指定或type是classic，将使用默认值omit（不要求凭证）
 * }
 */
var myWorker = new Worker(jsUrl, options);
```

2. 实例的属性和方法

| 属性&事件             | 描述                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| Worker.error          | 指定 error 事件的监听函数                                                                             |
| Worker.onmessage      | 指定 message 事件的监听函数，发过来的数据保存在 Event.data 中，也可以使用 addEventListener('message') |
| Worker.onmessageerror | 指定 messageerror 事件的监听函数，发送的数据无法序列化成字符串时，会触发这个事件                      |
| Worker.postMessage()  | 向 Worker 线程发送消息                                                                                |
| Worker.terminate()    | 立即终止 Worker 线程，终止后再次发送 postMessage 不会有响应                                           |

**Worker 线程**

Web Worker 有自己的全局对象，不是主线程的 window，而是一个专门为 Worker 定制的全局对象

| 属性&事件                             | 描述                                                                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| self.name                             | Worker 的名字，该属性只读，由构造函数指定                                                             |
| self.onmessage                        | 指定 message 事件的监听函数，发过来的数据保存在 Event.data 中，也可以使用 addEventListener('message') |
| self.onmessageerror                   | 指定 messageerror 事件的监听函数，发送的数据无法序列化成字符串时，会触发这个事件                      |
| self.close()                          | 在子线程关闭 Worker 线程                                                                              |
| self.postMessage()                    | 向产生这个 Worker 的线程发送消息                                                                      |
| self.importScripts(path1, path2, ...) | 在子线程加载其他 js 脚本，此方法不熟同源策略约束                                                      |

### 示例

1. 将会造成卡顿的任务放入 Worker 线程

如果在主线程执行 delay，会导致 input 框无法输入，而在 Worker 线程则不会卡顿

```html
<body>
  <input />
  <button onclick="clickHandle()">click</button>
</body>
```

```js
// 主线程
function clickHandle() {
  const Worker = new Worker("./test.js", { name: "test" });
  Worker.postMessage("start");
  Worker.onmessage = (e) => {
    const { data } = e;
    if (data === "end") {
      console.log("close Worker");
      Worker.terminate();
      return;
    }
    console.log(data);
  };
}
```

```js
// Worker 线程
// 模拟会造成卡顿的函数
function delay(ms = 1000) {
  const start = +new Date();
  while (start + ms >= +new Date()) {}
}

self.addEventListener("message", function (e) {
  const { data } = e;
  switch (data) {
    case "start":
      delay(5000);
      console.log("Worker delay end");
      self.postMessage("ok");
      break;
    default:
      self.postMessage("default");
  }
});
```

2. 加载同页面下的脚本代码

通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

```html
<!-- 这里有一段需要作为 Worker 线程脚本的代码，放在主线程页面，注意必须指定<script>标签的type属性是一个浏览器不认识的值，这里是app/Worker -->
<!DOCTYPE html>
  <body>
    <script id="Worker" type="app/Worker">
        addEventListener('message', function (e) {
            postMessage(e.data);
        }, false);
    </script>
  </body>
</html>
```

```js
// 读取上面的脚本，用 Worker 来处理
var blob = new Blob([document.querySelector("#Worker").textContent]);
var url = window.URL.createObjectURL(blob);
var Worker = new Worker(url);
Worker.postMessage("father message");
Worker.onmessage = function (e) {
  console.log(e.data); // father message
};
```

3. 将同页面的其他函数作为 Worker 线程的脚本

```js
function target() {
  self.onmessage = (e) => {
    console.log(e.data);
  };
}

var blob = new Blob([`(${target.toString()})()`]);
var url = window.URL.createObjectURL(blob);
var Worker = new Worker(url);
Worker.postMessage("father message");
```

### 数据通信

主线程与 Worker 之间的通信，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

```js
// 主线程
const obj = { a: 1 };
var Worker = new Worker("./test.js");
Worker.postMessage(obj);
Worker.onmessage = (e) => {
  console.log(obj); // {a: 1}
};
```

```js
// 子线程
self.addEventListener("message", function (e) {
  const { data } = e;
  data.a = 2;
  console.log("Worker", data); // Worker {a: 2}
  self.postMessage("end");
});
```

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型

```js
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
Worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage(
    "Inside Worker.js: uInt8Array.toString() = " + uInt8Array.toString()
  );
  postMessage(
    "Inside Worker.js: uInt8Array.byteLength = " + uInt8Array.byteLength
  );
};
```

但是拷贝方式发送二进制数据，会造成性能问题，例如主线程想 Worker 线程发送一个 500MB 文件，默认情况就会生成一个原文件的拷贝。为了解决这个问题，js 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的局面。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就方便了，不会产生性能负担

直接转移：

```js
// Transferable Objects 格式
Worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
Worker.postMessage(ab, [ab]);
```
