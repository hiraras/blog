(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{382:function(t,s,a){"use strict";a.r(s);var r=a(14),l=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"sql-注入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sql-注入"}},[t._v("#")]),t._v(" SQL 注入")]),t._v(" "),s("h3",{attrs:{id:"描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#描述"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),s("p",[t._v("黑客在请求中拼接 sql 脚本（如：输入框内输入 sql 脚本），如果后端未对输入框的内容进行转义操作，会让黑客的 sql 脚本执行，可能对服务端造成巨大破坏或数据泄露")]),t._v(" "),s("h3",{attrs:{id:"防御方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#防御方式"}},[t._v("#")]),t._v(" 防御方式")]),t._v(" "),s("ol",[s("li",[t._v("对系统使用员进行管理分级：能防止一般用户执行一些非常危险操作，例如 drop table，当一般用户被攻击了也不会成功")]),t._v(" "),s("li",[t._v("参数传值：禁止将变量直接写入到 SQL 语句中，必须设置相应的参数来传递相应变量。")]),t._v(" "),s("li",[t._v("基础过滤：对用户提交内容的单引号、双引号、冒号等字符进行转换或过滤，使黑客的攻击失败")])])])}),[],!1,null,null,null);s.default=l.exports}}]);