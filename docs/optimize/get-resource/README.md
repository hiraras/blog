## 访问资源获取优化

**参考**[https://juejin.cn/post/7128369638794231839](https://juejin.cn/post/7128369638794231839)

可以在当前页面中提前下载用户可能会需要用到的资源，例如：其他页面的 js 资源

1. preload

在当前页面中，你可以指定可能或很快就需要的资源在其页面生命周期的早期——浏览器的主渲染机制介入前就进行预加载，这可以让对应的资源更早的得到加载并使用，也更不易阻塞页面的初步渲染，进而提升性能

关键字 preload 作为元素 <link> 的属性 rel 的值，表示用户十分有可能需要在当前浏览中加载目标资源，所以浏览器必须预先获取和缓存对应资源

**示例**

```html
<link
  as="script"
  rel="preload"
  href="/webpack-runtime-732352b70a6d0733ac95.js"
/>
```

可以预加载的资源有很多，现在浏览器支持的主要有：

- **audio**：音频文件，通常用于 audio 标签
- **document**: 旨在由 frame 或嵌入的 HTML 文档
- **embed**: 要嵌入到 embed 元素中的资源
- **fetch**: 要通过 fetch 或 XHR 请求访问的资源，例如 ArrayBuffer 或 JSON 文件
- **font**: 字体文件
- **image**: 图像文件
- **object**: 要嵌入到 object 元素中的资源
- **script**: JavaScript 文件
- **style**: CSS 样式表
- **track**: WebVTT 文件
- **worker**: 一个 JavaScript 网络工作者或共享工作者
- **video**: 视频文件，通常用于 video 标签

**注意**：使用 preload 作为 link 标签 rel 属性的属性值的话一定要记得在标签上添加 as 属性，其属性值就是要预加载的内容类型

2. preconnect

元素属性的关键字 preconnect 是提示浏览器用户可能需要来自目标域名的资源，因此浏览器可以通过抢先启动与该域名的连接来改善用户体验 —— MDN

简单来说就是提前告诉浏览器，在后面的 js 代码中可能会去请求这个域名下对应的资源，你可以先去把网络连接建立好，到时候发送对应请求时也就更加快速

**示例**

```html
<link rel="preconnect" href="https://www.google-analytics.com" />
```

3. dns-prefetch

DNS-prefetch (DNS 预获取) 是尝试在请求资源之前解析域名。这可能是后面要加载的文件，也可能是用户尝试打开的链接目标 —— MDN

那我们为什么要进行域名预解析呢？这里面其实涉及了一些网络请求的东西，下面简单介绍一下：

当浏览器从（第三方）服务器请求资源时，必须先将该跨域域名解析为 IP 地址，然后浏览器才能发出请求。此过程称为 DNS 解析。DNS 缓存可以帮助减少此延迟，而 DNS 解析可以导致请求增加明显的延迟。对于打开了与许多第三方的连接的网站，此延迟可能会大大降低加载性能。预解析域名就是为了在真正发请求的时候减少延迟，从而在一定程度上提高性能

通俗点来说，dns-prefetch 的作用就是告诉浏览器在给第三方服务器发送请求之前去把指定域名的解析工作给做了，这个优化方法一般会和上面的 preconnect 一起使用，这些都是性能优化的一些手段，我们也可以在自己项目中合适的地方来使用

**示例**

```html
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

4. prefetch

关键字 prefetch 作为元素 的属性 rel 的值，是为了提示浏览器，用户未来的浏览有可能需要加载目标资源，所以浏览器会事先获取和缓存对应资源，优化用户体验 ——MDN

上面的解释已经很通俗易懂了，就是告诉浏览器用户未来可能需要这些资源，这样浏览器可以提前获取这些资源，等到用户真正需要使用这些资源的时候一般都已经加载好了，内容展示就会十分的流畅

**示例**

```html
<link
  rel="prefetch"
  href="/page-data/docs/getting-started.html/page-data.json"
  crossorigin="anonymous"
  as="fetch"
/>
```
