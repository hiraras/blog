(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{295:function(t,a,s){"use strict";s.r(a);var v=s(14),r=Object(v.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件循环"}},[t._v("#")]),t._v(" 事件循环")]),t._v(" "),a("h3",{attrs:{id:"为什么会有事件循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为什么会有事件循环"}},[t._v("#")]),t._v(" 为什么会有事件循环？")]),t._v(" "),a("p",[t._v("js 是一个单线程的语言，所以无法实现异步任务机制，故浏览器通过实现事件循环机制来做到")]),t._v(" "),a("p",[t._v("js 有一个宏队列和微队列；一个宏任务加上微队列里的所有方法构成一个周期，不断循环执行这个周期就是所谓的事件循环")]),t._v(" "),a("h3",{attrs:{id:"执行顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行顺序"}},[t._v("#")]),t._v(" 执行顺序")]),t._v(" "),a("p",[t._v("先执行宏队列里的第一个方法，完成后再去清空当前微队列里有的微任务，当微队列任务清空后，再执行第二个宏任务，在这个宏任务中如果微队列又增加了新的微任务（微任务执行的时候创建了新的微任务，那它也会在本轮执行），则再次清空微队列，最后再往后执行下一个宏任务，以此类推")]),t._v(" "),a("h3",{attrs:{id:"分类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分类"}},[t._v("#")]),t._v(" 分类")]),t._v(" "),a("p",[t._v("宏任务：")]),t._v(" "),a("ol",[a("li",[t._v("script 代码块，其中 new Promise()的参数函数会立即执行，async 函数 如果执行了，在第一个 await 之前的代码也会立即执行")]),t._v(" "),a("li",[t._v("setTimeout、setInterval")]),t._v(" "),a("li",[t._v("dom 监听")]),t._v(" "),a("li",[t._v("UI rendering")]),t._v(" "),a("li",[t._v("ajax")])]),t._v(" "),a("p",[t._v("微任务：")]),t._v(" "),a("ol",[a("li",[t._v("promise.then 的回调")]),t._v(" "),a("li",[t._v("queueMicrotask,接受一个函数，并放入当前微任务队列")]),t._v(" "),a("li",[t._v("Mutation Observer API")])])])}),[],!1,null,null,null);a.default=r.exports}}]);