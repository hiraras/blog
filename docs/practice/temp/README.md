# 临时

## 分层模型

将网络传输这个大问题，分层进行解决

- 物理层（光纤/双绞线/同轴电缆/集线器）：不同设备如何处理不同信号
- 数据链路层（MAC/交换机）：如何在一个子网中找到对方
- 网络层（IP/路由器）：如何在互联网中找到对方
- 传输层（TCP/UDP）：如何保证消息的可靠传递
- 应用层（HTTP/FTP/DNS/SMTP/POP3）：跟具体应用相关的消息格式

## URL（应用层 ）

统一资源定位符，用于定位网络服务

它表达了：从网络中哪台计算机（domain）中的哪个程序（port）寻找那个服务（path），并注明了获取服务的具体细节（query），以及要用什么样的协议通信（schema）

一些细节：

- 当协议是 http 端口为 80 时，端口可以省略
- 当协议是 https 端口为 443 时，端口可以省略
- schema/domain/path 是必填的，其他的根据具体

## HTTP

该协议规定了两个方面的内容：

1. 传递消息的模式
2. 传递消息的格式

### 传递消息的模式

HTTP 使用了一种极为简单的消息传递模式，[请求-响应]模式。

发起请求的称之为客户端，接受请求并完成响应的称之为服务器

[请求-响应]完成后，一次交互结束。

### 传递消息的格式

HTTP 的消息格式是一种纯文本的格式，文本分为三个部分

1. 请求行
2. 请求头
3. 请求体

```
GET  /api/movies?page=2&size=10 HTTP1.1
Host: study.duyiedu.com
token: xxxx


```

上面代码第一行为请求行，GET 为请求方法，后跟 path 和 query，再跟上请求协议

换行后为请求头，请求头的每个参数一列

隔一个空行后为请求体，即便不传也需要空一行；请求体本质也只是字符串，里面包含需要传递的数据，如何书写数据格式让服务端能够读取需要和服务端约定。同时搭配请求头里的 Content-Type 告诉服务端如何解析数据

浏览器中 GET 请求一般没有请求体所以 Content-Type 一般没有，也说明了 Content-Type 一般是告诉服务端如何解析请求体的数据

### 响应

服务器返回的响应也是字符串，和请求一样分为三个部分

1. 请求行
2. 请求头
3. 请求体

### 浏览器的通信能力

浏览器帮用户发出请求的时候需要完整的 URL 地址，比如在 a 标签的 href 属性上写上一个相对路径，实际上点击后发出的请求浏览器会自动将其转化为完整的 URL 再发出请求

这样就分为两个情况，绝对路径和相对路径

绝对路径：最终生成的 URL 与当前资源的 path 部分互不依赖

示例：https://www.baidu.com/a/b/1.html 这个资源下

```
/1.html -> https://www.baidu.com/1.html
/s/2.html -> https://www.baidu.com/s/2.html
```

相对路径：最终生成的 URL 根据当前资源的 path 部分推导出来

示例：https://www.baidu.com/a/b/1.html 这个资源下

```
./2.html -> https://www.baidu.com/a/b/2.html  ./ 指向的是 /a/b/这个path部分，也就是倒数第一个斜杠
../3.html ->  https://www.baidu.com/a/3.html ../ 指向的是 /a/ 这个path部分，也就是倒数第二个斜杠
4.html === ./4.html -> https://www.baidu.com/a/b/4.html
```

base64 也是一种 url，称之为 data url（url 本质是获取资源，一般的 url 是描述资源所在位置；base64 是一种能够完全描述目标资源数据的 url，故不需要请求）。另，html 标签只要支持 url 的地方都支持 data url，例如 <script src="data url"></script>。这为动态加载 js 提供可能

form 表单：就是浏览器提供给用户的发起请求的元素

问：我能够直接通过 js 发起请求，还有必要用到 form 吗？

答：有些情况是有必要的，如果需求上需要用户在输入某些字段后敲回车直接触发请求，那么需要对各个表单组件添加回车的监听，复杂点的情况下还要判断是否是 ctrl+enter/alt+enter 等组合键的监听；还有中文输入情况下是确定拼音还是提交的判断，而 form 天然支持回车提交，能省去很多麻烦

如果既不想通过 form 发送请求，又想获得 form 的默认行为可以参照以下示例

```html
<body>
  <form>
    <label>账号: <input type="text" name="username" /></label>
    <label>密码: <input type="password" name="pwd" /></label>
    <button type="submot">submit</button>
  </form>
</body>
<script>
  const form = document.querySelector("form");
  form.onsubmit = (e) => {
    // 能阻止表单的提交行为和浏览器的自动刷新行为
    // 为什么会自动刷新，其实就是表单请求的方式为借助浏览器自动发起请求的能力，改变了当前窗口的URL，相当于用地址栏请求。而平时使用的ajax方式则是借用代码发起请求的能力
    e.preventDefault();
    console.log("submit");
  };
</script>
```

请求行和请求头中只支持 ASCII 编码的字符，如果有中文会自动编码为特殊字符(js 中的 encodeURIComponent)

### 浏览器自动解析响应的能力

浏览器能自动解析处理服务器响应的结果

常见的处理：

1. 识别响应吗：浏览器能够自动识别响应码，当出现一些特殊的响应码时浏览器会自动完成处理，比如 301（资源永久重定向）、302（资源临时重定向）
2. 根据响应结果做不同处理：浏览器能够自动分析响应头中的 Content-Type，根据不同的值进行不同处理

```js
async function readStream() {
  const resp = await fetch("");
  // 流式读取
  const reader = resp.body.getReader();
  const textDecoder = new TextDecoder();
  while (1) {
    // vale 为二进制数据
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    console.log(textDecoder.decode(value));
  }
}
```

## 跨域问题及解决方案

同源策略是一套浏览器安全机制，当一个源的文档和脚本，与另一个源的资源进行通信时，同源策略就会对这个通信做出不同程度的限制。

简单来说，同源策略对同源资源放行，对异源资源限制

因此限制造成的开发问题，称之为跨域（异源问题）

源 = 协议（schema） + 域名（domain） + 端口（port）

### 浏览器如何限制异源请求

浏览器出于多方面的考量，指定了非常繁杂的规则来限制各种跨域请求，但总体的原则非常简单：

对标签发出的跨域请求轻微限制
对 AJAX 发出的跨域请求严厉限制

### 解决方案

#### CORS

基本理念

- 只要服务器明确表示允许，则效验通过
- 服务器明确拒绝或没有表示，则效验不通过

请求分类，简单请求也可能跨域，只能用来判断是否会发起 OPTIONS 预检请求

- 简单请求
  - 请求方式 GET/POST/HEAD 之一
  - 头部字段满足 CORS 安全规范（浏览器默认自带的头部字段都是满足安全规范的，只要开发者不改动和新增头部，就不会打破此条规则）
  - 如果有 Content-Type ，必须是这几个值(text/plain、multipart/form-data、application/x-www-form-urlencoded)
- 预检请求
  - 除了简单请求的都是预检请求

预检请求下，浏览器会认为该请求可能有风险，会先自己发出一个 OPTIONS 请求，询问服务端是否可以通信，如果不可以直接出发跨域错误

具体过程如下：

浏览器会添加几个头，大致告诉服务端这次请求的信息

- Origin -> 源
- Access-Control-Request-Method -> 实际要发出的请求方式
- Access-Control-Request-Headers -> 这次请求有哪些头做了修改

服务端要通过这个检查需要返回几个头对应

- Access-Control-Allow-Origin -> 允许的源
- Access-Control-Allow-Methods -> 允许的请求方式（可以有多个）
- Access-Control-Allow-Headers -> 这次请求有哪些头做了修改（允许修改的头）

修改都能满足的情况下才会通过 OPTIONS 请求发出真正的请求

**cookie**

- 有 cookie 的情况，服务端需要返回头 Access-Control-Allow-Credentials: true
- 对于一个附带身份凭证的请求，若服务器没有明确告知，浏览器仍然视为跨域被拒绝。
- 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 为 \*

**关于跨域获取响应头**

在跨域访问时，JS 只能拿到一些最基本的响应头，如：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置 Access-Control-Expose-Headers: authorization, a, b

#### JSONP

利用标签跨域限制没那么强的特性，借助标签进行 http 请求

请求：

- 仅能使用 GET 请求
- 容易产生安全隐患(XSS 攻击)
- 容易被非法站点调用

#### 代理

通过自己的服务器做中间商，绕过浏览器的跨域

### 如何选择

最重要的是保证生产环境和开发环境的一致
