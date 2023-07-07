(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{286:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"全局错误捕获"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局错误捕获"}},[t._v("#")]),t._v(" 全局错误捕获")]),t._v(" "),s("h3",{attrs:{id:"区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#区别"}},[t._v("#")]),t._v(" 区别")]),t._v(" "),s("p",[t._v("addEventListener('error')：监听 js 运行时错误，会比 window.onerror 先触发，与 onerror 的功能相似，不过事件回调函数传参只有一个保存全部错误信息的参数，不能阻止默认事件处理函数的执行，"),s("strong",[t._v("但能够全局捕获资源加载异常的错误")])]),t._v(" "),s("p",[t._v("注意：当资源加载异常时，错误是在"),s("strong",[t._v("捕获")]),t._v("阶段发生的")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"捕获-promise-异常"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#捕获-promise-异常"}},[t._v("#")]),t._v(" 捕获 promise 异常")]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unhandledrejection'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// event类型为PromiseRejectionEvent，其中的reason字段包括了抛出错误的信息")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unhandledrejection'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nPromise"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fail'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"window-onerror"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#window-onerror"}},[t._v("#")]),t._v(" window.onerror")]),t._v(" "),s("p",[t._v("捕获全局错误，但不能捕获 promise 错误")]),t._v(" "),s("p",[t._v("支持：")]),t._v(" "),s("ul",[s("li",[t._v("可以捕捉语法错误，也可以捕捉运行时错误；")]),t._v(" "),s("li",[t._v("可以拿到出错的信息，堆栈，出错的文件、行号、列号；")]),t._v(" "),s("li",[t._v("只要在当前页面执行的 js 脚本出错都会捕捉到，例如：浏览器插件的 javascript、或者 flash 抛出的异常等。")]),t._v(" "),s("li",[t._v("跨域的资源需要特殊头部支持。")])]),t._v(" "),s("p",[t._v("问题：")]),t._v(" "),s("ul",[s("li",[t._v("基于安全考虑，无法捕获到跨域的异常。")]),t._v(" "),s("li",[t._v("不同浏览器异常信息支持不同，异常的堆栈不统一，甚至有些浏览器没有堆栈信息。")]),t._v(" "),s("li",[t._v("无法知道资源加载的异常。")])]),t._v(" "),s("p",[t._v("解决:")]),t._v(" "),s("ul",[s("li",[t._v("第一个问题，可以设置标签的 crossorigin 属性和 js 所在的域名设置 CORS 来解决。")]),t._v(" "),s("li",[t._v("第二个问题，我们可以利用 TraceKit 第三方 npm 包解决堆栈信息不统一的情况，而针对一些老浏览器没有堆栈信息的，就需要你手动对代码进行埋点，用 try catch 埋点所有的函数/方法了")]),t._v(" "),s("li",[t._v("第三个问题，因为资源的加载错误不会冒泡，所以 window.onerror 无法捕获到，就需要改为 window.addEventListener 的方式在捕获阶段捕获异常，但是你需要防止和 window.onerror 重复上报。")])])])}),[],!1,null,null,null);s.default=r.exports}}]);