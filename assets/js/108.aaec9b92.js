(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{379:function(t,o,n){"use strict";n.r(o);var e=n(14),r=Object(e.a)({},(function(){var t=this,o=t._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h2",{attrs:{id:"终止-http-请求"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#终止-http-请求"}},[t._v("#")]),t._v(" 终止 http 请求")]),t._v(" "),o("ol",[o("li",[t._v("终止 xhr 请求：调用 xhr 对象的 abort 方法")]),t._v(" "),o("li",[t._v("终止$.ajax 请求：调用请求的方法的返回值上的 abort 方法")]),t._v(" "),o("li",[t._v("终止 axios 请求：调用方法时，在 option 列表中添加 cancelToken 字段，值为 axios.CancelToken.source 方法返回的对象上的 token 字段；或使用 new CancelToken(function(cancelMethod) {})，传递回调函数，回调函数的参数为取消函数")]),t._v(" "),o("li",[t._v("终止 fetch 请求：通过 AbortController 构造函数创建 controller 对象，将 controller 对象上的 signal 字段传给 fetch 函数的 option 中，后续可以通过 controller 的 abort 方法取消")])])])}),[],!1,null,null,null);o.default=r.exports}}]);