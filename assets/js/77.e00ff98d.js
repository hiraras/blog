(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{348:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"访问资源获取优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#访问资源获取优化"}},[t._v("#")]),t._v(" 访问资源获取优化")]),t._v(" "),a("p",[a("strong",[t._v("参考")]),a("a",{attrs:{href:"https://juejin.cn/post/7128369638794231839",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://juejin.cn/post/7128369638794231839"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("可以在当前页面中提前下载用户可能会需要用到的资源，例如：其他页面的 js 资源")]),t._v(" "),a("ol",[a("li",[t._v("preload")])]),t._v(" "),a("p",[t._v("在当前页面中，你可以指定可能或很快就需要的资源在其页面生命周期的早期——浏览器的主渲染机制介入前就进行预加载，这可以让对应的资源更早的得到加载并使用，也更不易阻塞页面的初步渲染，进而提升性能")]),t._v(" "),a("p",[t._v("关键字 preload 作为元素 "),a("link"),t._v(" 的属性 rel 的值，表示用户十分有可能需要在当前浏览中加载目标资源，所以浏览器必须预先获取和缓存对应资源")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("as")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("script"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("preload"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("/webpack-runtime-732352b70a6d0733ac95.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("p",[t._v("可以预加载的资源有很多，现在浏览器支持的主要有：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("audio")]),t._v("：音频文件，通常用于 audio 标签")]),t._v(" "),a("li",[a("strong",[t._v("document")]),t._v(": 旨在由 frame 或嵌入的 HTML 文档")]),t._v(" "),a("li",[a("strong",[t._v("embed")]),t._v(": 要嵌入到 embed 元素中的资源")]),t._v(" "),a("li",[a("strong",[t._v("fetch")]),t._v(": 要通过 fetch 或 XHR 请求访问的资源，例如 ArrayBuffer 或 JSON 文件")]),t._v(" "),a("li",[a("strong",[t._v("font")]),t._v(": 字体文件")]),t._v(" "),a("li",[a("strong",[t._v("image")]),t._v(": 图像文件")]),t._v(" "),a("li",[a("strong",[t._v("object")]),t._v(": 要嵌入到 object 元素中的资源")]),t._v(" "),a("li",[a("strong",[t._v("script")]),t._v(": JavaScript 文件")]),t._v(" "),a("li",[a("strong",[t._v("style")]),t._v(": CSS 样式表")]),t._v(" "),a("li",[a("strong",[t._v("track")]),t._v(": WebVTT 文件")]),t._v(" "),a("li",[a("strong",[t._v("worker")]),t._v(": 一个 JavaScript 网络工作者或共享工作者")]),t._v(" "),a("li",[a("strong",[t._v("video")]),t._v(": 视频文件，通常用于 video 标签")])]),t._v(" "),a("p",[a("strong",[t._v("注意")]),t._v("：使用 preload 作为 link 标签 rel 属性的属性值的话一定要记得在标签上添加 as 属性，其属性值就是要预加载的内容类型")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("preconnect")])]),t._v(" "),a("p",[t._v("元素属性的关键字 preconnect 是提示浏览器用户可能需要来自目标域名的资源，因此浏览器可以通过抢先启动与该域名的连接来改善用户体验 —— MDN")]),t._v(" "),a("p",[t._v("简单来说就是提前告诉浏览器，在后面的 js 代码中可能会去请求这个域名下对应的资源，你可以先去把网络连接建立好，到时候发送对应请求时也就更加快速")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("preconnect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://www.google-analytics.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("dns-prefetch")])]),t._v(" "),a("p",[t._v("DNS-prefetch (DNS 预获取) 是尝试在请求资源之前解析域名。这可能是后面要加载的文件，也可能是用户尝试打开的链接目标 —— MDN")]),t._v(" "),a("p",[t._v("那我们为什么要进行域名预解析呢？这里面其实涉及了一些网络请求的东西，下面简单介绍一下：")]),t._v(" "),a("p",[t._v("当浏览器从（第三方）服务器请求资源时，必须先将该跨域域名解析为 IP 地址，然后浏览器才能发出请求。此过程称为 DNS 解析。DNS 缓存可以帮助减少此延迟，而 DNS 解析可以导致请求增加明显的延迟。对于打开了与许多第三方的连接的网站，此延迟可能会大大降低加载性能。预解析域名就是为了在真正发请求的时候减少延迟，从而在一定程度上提高性能")]),t._v(" "),a("p",[t._v("通俗点来说，dns-prefetch 的作用就是告诉浏览器在给第三方服务器发送请求之前去把指定域名的解析工作给做了，这个优化方法一般会和上面的 preconnect 一起使用，这些都是性能优化的一些手段，我们也可以在自己项目中合适的地方来使用")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("dns-prefetch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://www.google-analytics.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("prefetch")])]),t._v(" "),a("p",[t._v("关键字 prefetch 作为元素 的属性 rel 的值，是为了提示浏览器，用户未来的浏览有可能需要加载目标资源，所以浏览器会事先获取和缓存对应资源，优化用户体验 ——MDN")]),t._v(" "),a("p",[t._v("上面的解释已经很通俗易懂了，就是告诉浏览器用户未来可能需要这些资源，这样浏览器可以提前获取这些资源，等到用户真正需要使用这些资源的时候一般都已经加载好了，内容展示就会十分的流畅")]),t._v(" "),a("p",[a("strong",[t._v("示例")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("prefetch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("/page-data/docs/getting-started.html/page-data.json"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("crossorigin")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("anonymous"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("as")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("fetch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);