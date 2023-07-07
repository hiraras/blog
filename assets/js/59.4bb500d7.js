(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{329:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"css-隔离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css-隔离"}},[t._v("#")]),t._v(" css 隔离")]),t._v(" "),s("p",[t._v("子应用之间、父子应用之间的样式可能会存在冲突的情况")]),t._v(" "),s("h3",{attrs:{id:"解决-css-隔离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决-css-隔离"}},[t._v("#")]),t._v(" 解决-css 隔离")]),t._v(" "),s("ol",[s("li",[t._v("方案一：")])]),t._v(" "),s("ul",[s("li",[t._v("使用 shadow dom，在 shadow dom 中的元素样式不会影响到页面其他元素，但是存在 modal 这种节点挂在 body 上的组件，会造成样式丢失（因为样式是在 shadow dom 中，而 modal 挂在 body 上）")]),t._v(" "),s("li",[t._v("shadow-dom 其实是浏览器的一种能力，它允许在浏览器渲染文档（document）的时候向其中的 Dom 结构中插入一棵 DOM 元素子树，但是特殊的是，这棵子树（shadow-dom）并不在主 DOM 树中。"),s("a",{attrs:{href:"https://www.cnblogs.com/yf2196717/p/14732459.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("创建")])]),t._v(" "),s("div",{staticClass:"language-JavaScript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" div "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" sr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" div"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("attachShadow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("mode")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'open'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nsr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<h1>Hello Shadow DOM</h1>'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("方案二：")])]),t._v(" "),s("p",[t._v("为子应用的根节点添加属性，然后通过选择器隔离样式，实现类似于 vue 的 scoped")])])}),[],!1,null,null,null);s.default=r.exports}}]);