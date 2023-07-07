(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{347:function(t,a,v){"use strict";v.r(a);var _=v(14),r=Object(_.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"回流和重绘"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回流和重绘"}},[t._v("#")]),t._v(" 回流和重绘")]),t._v(" "),a("h3",{attrs:{id:"回流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回流"}},[t._v("#")]),t._v(" 回流")]),t._v(" "),a("p",[t._v("当页面上的 dom 发生形变（可能是宽高变化，可能是间隙变化等）导致 dom 的位置需要发生变化，浏览器就需要重新计算更新后的 dom 的位置，这个过程叫做回流")]),t._v(" "),a("h3",{attrs:{id:"重绘"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重绘"}},[t._v("#")]),t._v(" 重绘")]),t._v(" "),a("ul",[a("li",[t._v("当页面发生回流，则一定会伴随着重绘")]),t._v(" "),a("li",[t._v("当页面的 dom 的背景色、字体颜色、outline、阴影等发生变化，页面的 dom 位置不需要重新计算，只需要重新绘制时，会触发重绘")])]),t._v(" "),a("h3",{attrs:{id:"发生场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发生场景"}},[t._v("#")]),t._v(" 发生场景")]),t._v(" "),a("ol",[a("li",[t._v("修改 DOM 元素的位置和大小，例如通过 JavaScript 修改元素的样式属性、添加或删除元素等;")]),t._v(" "),a("li",[t._v("修改浏览器窗口的大小或滚动页面;")]),t._v(" "),a("li",[t._v("修改 DOM 树的结构，例如添加或删除元素、修改元素的属性等;")]),t._v(" "),a("li",[t._v("修改文本内容，例如通过 JavaScript 修改文本节点的内容或字体大小;")]),t._v(" "),a("li",[t._v("修改 CSS 样式，例如修改元素的背景颜色、字体颜色、边框等;")]),t._v(" "),a("li",[t._v("浏览器的初始渲染。")])]),t._v(" "),a("h3",{attrs:{id:"优化-尽量避免回流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化-尽量避免回流"}},[t._v("#")]),t._v(" 优化-尽量避免回流")]),t._v(" "),a("ol",[a("li",[t._v("使用 transform")]),t._v(" "),a("li",[t._v("创建多个 dom 节点时，使用 documentFragment")]),t._v(" "),a("li",[t._v("避免使用 table 布局，table 中每个元素大小的改动都将导致整个 table 的重新计算")]),t._v(" "),a("li",[t._v("对复杂动画，对其设置 position: fixed/absolute，尽可能使元素脱离文档流，减少对其他元素的影响")])])])}),[],!1,null,null,null);a.default=r.exports}}]);