(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{351:function(v,_,i){"use strict";i.r(_);var l=i(14),e=Object(l.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("开场自我介绍")]),v._v(" "),_("p",[v._v("你好，我叫马福坚，18 年毕业于浙江树人大学，专业是数字媒体技术，毕业后就一直从事前端方面的工作，主要技术栈使用的是 react；\n我比较擅长的方向是代码优化，包括组件抽离、代码重构等，另外也做过一些基建和组件库方面的提效工作。\n另外在工作之余我喜欢在掘金、博客园等平台学习知识，以上就是我的自我介绍，谢谢")]),v._v(" "),_("p",[v._v("http 请求池")]),v._v(" "),_("p",[v._v("0.1+0.2 精度为什么会丢失？")]),v._v(" "),_("ol",[_("li",[v._v("js 使用二进制进行数值计算，使用 ieee（双精度浮点）标准进行存储")]),v._v(" "),_("li",[v._v("小数十进制转化为二进制时可能会出现无限循环的情况，0.1 就会，而 ieee 标准存储空间是有限的，这时候会丢失一次精度")]),v._v(" "),_("li",[v._v("在计算的时候还会丢失一次")])]),v._v(" "),_("p",[v._v("为什么找了这么久的工作？")]),v._v(" "),_("ol",[_("li",[v._v("今年刚开始找工作的时候，没有准备好，面了几家后也有些被打击到，就停了一段时间")]),v._v(" "),_("li",[v._v("反省后，去总结了一些自身的问题，做了更充足的准备才重新开始")])]),v._v(" "),_("p",[v._v("看你跳槽挺频繁，跳槽原因是什么？")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("上一家")]),v._v(" "),_("ul",[_("li",[v._v("上一家的项目数量挺多的，挺有挑战性，经常会接触到一些新的东西挺好的。")]),v._v(" "),_("li",[v._v("但是因为是外派的，待遇方面会有些坑所以想找个自研的")]),v._v(" "),_("li",[v._v("工作环境方面，同事之间各自负责自己的项目，比较孤立")]),v._v(" "),_("li",[v._v("家里比较希望我回浙江，离家近一点")])])]),v._v(" "),_("li",[_("p",[v._v("之前的公司")]),v._v(" "),_("ul",[_("li",[v._v("之前几家，因为工作年限短，同时在公司里一直负责一个项目，对自己发展局限比较大，就想出去多接触一些项目")])])])]),v._v(" "),_("p",[v._v("之前一直在杭州，为什么去了武汉？")]),v._v(" "),_("p",[v._v("一直呆在杭州，想去其他城市看看，增长一下自己的见识")]),v._v(" "),_("p",[v._v("那为啥回来了？")]),v._v(" "),_("ol",[_("li",[v._v("家里觉得太远了，比较希望我回来")]),v._v(" "),_("li",[v._v("在武汉呆了一年多，发现城市之间都差不多，另外一个人在那还是比较孤单的，所以借着这次换工作就回来了")])]),v._v(" "),_("p",[v._v("websocket 是什么？")]),v._v(" "),_("p",[v._v("html5 开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议，基于 TCP 传输协议，让浏览器和服务器之间具备实时双向通信的能力")]),v._v(" "),_("p",[v._v("优点：概括的说：支持双向通信，更灵活、更高效，可扩展性更好")]),v._v(" "),_("p",[v._v("怎么实现断线重连？")]),v._v(" "),_("p",[v._v("若某时间段内客户端发送了消息，而服务端没有返回，则认定为断线；这个时候会触发 websocket 的 onclose 事件，需要重新连接服务")]),v._v(" "),_("p",[v._v("为什么需要心跳？")]),v._v(" "),_("p",[v._v("websocket 为了保持客户端与服务端的实时双向通信，需要保证连接没有断开，对于长时间没有数据往来的连接，一直保持连接会造成资源的浪费。\n但是有些场景下，虽然客户端与服务端没有数据往来，但仍需要保持连接，这时候可以采用心跳，让服务端知道这个连接不能断开")]),v._v(" "),_("p",[v._v("你们是怎么进行 code review 的？")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("形式上各公司都是不一样的，按照公司的规矩来，可能是参与人员到一个办公室直接通过 git 的 mr 来进行")])]),v._v(" "),_("li",[_("p",[v._v("review 的内容会包括以下几点")]),v._v(" "),_("ul",[_("li",[v._v("代码的规范性，例如函数参数过多时使用解构的方式来定义（比较绝对，一定程度上必须遵守的）")]),v._v(" "),_("li",[v._v("ts 方面是不是在没必要的时候使用了 any")]),v._v(" "),_("li",[v._v("一个功能完成了会让相关同学演示一下，如果其他人觉得有分歧，会记录并在会后及时向产品确认")]),v._v(" "),_("li",[v._v("一些代码实践方面的问题，如果同事觉得有更好方案，会提出来，并讨论是否有必要优化（多种实现的对比）")])])])]),v._v(" "),_("p",[v._v("你是怎么建立这个错误上报模块的？")]),v._v(" "),_("ol",[_("li",[v._v("首先是在项目中注意到一些问题不容易被发现，提出了这个问题")]),v._v(" "),_("li",[v._v("建立了这个 issue 后，和后端同学确定实现方案")]),v._v(" "),_("li",[v._v("通过平台提供的错误捕获 api（例如 vue 的全局错误捕获钩子，react 的错误边界，小程序的全局错误捕获钩子，window.onerror）对项目里的错误进行统一捕获")]),v._v(" "),_("li",[v._v("将错误信息以指定格式发送到后端保存")]),v._v(" "),_("li",[v._v("建立一个查看错误的后台，供客服、产品、测试等相关人员进行查看，然后反馈到开发人员")])]),v._v(" "),_("p",[v._v("为什么使用了 immer？")]),v._v(" "),_("ol",[_("li",[v._v("在 react 中需要保持数据的不可变性，即每次更新状态时，需要返回一个全新的对象，所以经常会使用扩展运算符或 Object.assgin 来生成新的状态，但这种写法层级深了的时候会很不清晰，使用 immer 能直接操作深层数据，让代码更清晰，也减少了开发者的心智负担")]),v._v(" "),_("li",[v._v("另外，immer 每次修改对象只会修改发生变化的那部分及其祖先，更加高效")])]),v._v(" "),_("p",[v._v("什么是不可变性？")]),v._v(" "),_("p",[v._v("不可变性指的是不直接修改数据，而是使用新的数据替换旧的数据")]),v._v(" "),_("p",[v._v("为什么需要保证不可变性？")]),v._v(" "),_("ol",[_("li",[v._v("撤销和回退操作在开发中是很常见的，不直接在数据上进行修改，可以帮助我们更好的回溯数据")]),v._v(" "),_("li",[v._v("更容易跟踪数据的改变")]),v._v(" "),_("li",[v._v("方便确定 React 重新渲染的时机")])]),v._v(" "),_("p",[v._v("immer 的原理是什么？")]),v._v(" "),_("p",[v._v("内部使用了 proxy，对原始对象做了代理拦截，核心是 produce 函数，produce 工作分为 3 个阶段")]),v._v(" "),_("ol",[_("li",[v._v("创建代理：在触发 get 操作的时候，会根据值的类型进行不同的返回，基本类型就直接返回，引用类型会为该值创建代理（第一次创建后会进行缓存优化）")]),v._v(" "),_("li",[v._v("修改代理：在修改的时候进行浅拷贝，父节点及祖先节点也进行浅拷贝，并在浅拷贝的对象上进行修改")]),v._v(" "),_("li",[v._v("定稿：遍历对象树，如果发现修改了代理，就返回浅拷贝对象，没有修改就返回原始值")])]),v._v(" "),_("p",[v._v("保证对象只是改变的属性产生新的引用，其他没发生改变的属性仍然使用旧的引用")]),v._v(" "),_("p",[v._v("什么是 redux？")]),v._v(" "),_("p",[v._v("redux 就是一个 js 容器，用于全局的状态管理")]),v._v(" "),_("p",[v._v("为什么需要它？")]),v._v(" "),_("p",[v._v("react 中，数据的传递是单向的，即从父组件逐层传递给子组件，但一些场景下，可能一个祖先组件的状态需要经过很多层来传递到目标组件，会造成代码冗余和数据流的不清晰，使用 redux 可以将一些状态保存在全局范围内，避免了这个问题")]),v._v(" "),_("p",[v._v("redux 的工作过程是什么？")]),v._v(" "),_("ol",[_("li",[v._v("创建一个 store，并传入一个 reducer 函数，第二个参数作为初始状态，最后一个参数为 applyMiddleware(如果没有第二个参数，它可以放在第二个参数的位置)")]),v._v(" "),_("li",[v._v("用户在视图层，通过 dispatch 发出一个 action")]),v._v(" "),_("li",[v._v("执行 reducer 函数，生成一个新的 state")]),v._v(" "),_("li",[v._v("store 的变化触发订阅函数，在 react 中就是 render 函数")]),v._v(" "),_("li",[v._v("react 根据新的 state 渲染新的视图")])]),v._v(" "),_("p",[v._v("什么是纯函数？")]),v._v(" "),_("p",[v._v("纯函数是指，相同的输入每次必定返回相同的结果的函数，具有以下约束：")]),v._v(" "),_("ol",[_("li",[v._v("内部不调用系统 i/o api")]),v._v(" "),_("li",[v._v("内部不调用 random、date 等多次调用返回不同结果的 api")]),v._v(" "),_("li",[v._v("不得改写参数")]),v._v(" "),_("li",[v._v("调用时不改变原先已经存在的值")])]),v._v(" "),_("p",[v._v("reducer 为什么是纯函数？")]),v._v(" "),_("p",[v._v("在 react 中，视图是通过状态驱动的，即相同的状态，必定渲染出相同的 ui，为此 reducer 必须为纯函数才能保持这种关系。")]),v._v(" "),_("p",[v._v("为什么需要 redux-saga|redux-thunk？")]),v._v(" "),_("p",[v._v("redux 发出 action 后，reducer 必须立刻给出一个新的 state，这个过程是同步的，当业务上是异步的时候，这时发出一个 action 是不够的，因为异步请求会有多个状态（例如发出时、请求中、返回结果），所以需要借助中间件的帮助，让 react 可以在不同阶段发送 action，具体原理是中间件改造了 dispatch 方法，让它能接受非对象的值")]),v._v(" "),_("p",[v._v("redux 的透传原理？")]),v._v(" "),_("p",[v._v("React-Redux 提供了 Provider 组件，可以让容器组件拿到 state，原理是使用 React 组件的 context 属性")]),v._v(" "),_("p",[v._v("redux-saga 的思想？")]),v._v(" "),_("p",[v._v("使用 generator 函数创建多个 effect 任务，提供 take、takeEvery 等 api 创建 action 的监听并执行对应的 saga 任务，通过 put 发出 dispatch，通过在 rootSage 使用 all 开启所有监听")]),v._v(" "),_("p",[v._v("使用 map 保存 http 请求的原理，有什么注意事项？")]),v._v(" "),_("p",[v._v("使用场景：适用于可能会频繁发送重复请求的情况")]),v._v(" "),_("p",[v._v("操作：通过 map，将请求的关键信息作为 key，对应的请求结果作为值保存，每当有相同的请求就使用旧的请求结果，不走 http 请求")]),v._v(" "),_("p",[v._v("注意事项：")]),v._v(" "),_("ol",[_("li",[v._v("保证请求的唯一性，通过请求参数效验")]),v._v(" "),_("li",[v._v("保证缓存数据的时效性\n"),_("ul",[_("li",[v._v("碰到的是很少会改动的数据，则不需要太在意")]),v._v(" "),_("li",[v._v("如果系统里有其他入口可以修改对应数据，需要在修改的时候去除缓存，在需要的时候重新获取")]),v._v(" "),_("li",[v._v("如果刷新的时候保存缓存，则需要保存到 localStorage 中")])])])]),v._v(" "),_("p",[v._v("TypeScript：")]),v._v(" "),_("p",[v._v("ts 的作用？")]),v._v(" "),_("ol",[_("li",[v._v("js 不具备类型检查的功能，ts 能够让开发者在开发的时候就进行类型检查，减少错误发生的可能，提高项目代码的健壮性")]),v._v(" "),_("li",[v._v("配合开发工具，做到代码提示，减少拼写错误等低级 bug，也能提高效率")]),v._v(" "),_("li",[v._v("可以当做函数、组件、接口等的说明文档供开发者阅读")])]),v._v(" "),_("p",[v._v("type 和 interface 的区别？")]),v._v(" "),_("ol",[_("li",[v._v("type 也叫类型别名，可以用来声明基本类型、联合类型、元组、对象类型等数据类型，而 interface 只能用来声明对象类型的数据类型")]),v._v(" "),_("li",[v._v("两者都可以被继承，但 interface 使用 extends 关键字继承，type 使用 & 符号继承")]),v._v(" "),_("li",[v._v("interface 具有声明合并现象，即如果多次声明一个同名接口，ts 会将它们合并到一个接口中，而使用 type 声明同名类型会报错")])]),v._v(" "),_("p",[v._v("泛型是什么？")]),v._v(" "),_("p",[v._v("是一种类型变量，用于创造通用的类、接口、函数类型")]),v._v(" "),_("p",[v._v("使用可视化涉及了哪些功能？")]),v._v(" "),_("ol",[_("li",[v._v("图表，使用 echarts，帮助呈现一系列的数据，让数据更加直观")]),v._v(" "),_("li",[v._v("流程图，使用 antv，帮助展示一些业务流程、关联关系、树状图等信息，在展示的基础上可以实现工作流相关的业务")]),v._v(" "),_("li",[v._v("大屏，使用 echarts、rem、css 的 scale、flex 自适应绘制大屏页面")])]),v._v(" "),_("ul",[_("li",[v._v("x6：关联关系比较多")]),v._v(" "),_("li",[v._v("G2：数据图表展示")]),v._v(" "),_("li",[v._v("S2：canvas 实现表格")]),v._v(" "),_("li",[v._v("G6：数据图表展示、流程图，比较综合")])]),v._v(" "),_("p",[v._v("中后台项目前端方面的交互你认为应该是什么样的，或者说怎么优化？")]),v._v(" "),_("ol",[_("li",[v._v("中后台项目实际上，需求的提出都是由产品、客服等同事提出，前端首先需要做的就是参照 ui 设计及时完成任务，保证功能的正常使用。")]),v._v(" "),_("li",[v._v("在这基础上，一些东西可能是 ui 上体现不出来的，比如错误提示等，这时需要开发人员和 ui、产品确认好方案后，添加到必要的地方，让使用者知道自己在干什么，当前系统在做什么任务，任务执行结果是什么。")]),v._v(" "),_("li",[v._v("然后，中台很多业务其实是比较有挑战性的，这时候就需要开发者利用自己的技术对各种功能进行优化，这也是提高自身的一个重要途径了")])]),v._v(" "),_("p",[v._v("你在中台中使用过那些优化手段？")]),v._v(" "),_("ol",[_("li",[v._v("框架层面的优化，例如合理使用 react 的 memo，减少不必要的渲染")]),v._v(" "),_("li",[v._v("对一些大的列表，使用虚拟滚动")]),v._v(" "),_("li",[v._v("对于重复请求，合理使用缓存")]),v._v(" "),_("li",[v._v("使用雪碧图，减少图片资源的加载")]),v._v(" "),_("li",[v._v("使用图片懒加载，优化性能")])]),v._v(" "),_("p",[v._v("微前端：")]),v._v(" "),_("p",[v._v("为什么选择了 qiankun？")]),v._v(" "),_("ol",[_("li",[v._v("qiankun 已经足够成熟，能够放心使用")]),v._v(" "),_("li",[v._v("项目使用了 umi，在 umi 的官方文档中有集成 qiankun 的详细教程，比较方便")])]),v._v(" "),_("p",[v._v("qiankun 有哪些优点？")]),v._v(" "),_("ol",[_("li",[v._v("基于 single-spa 封装，提供了开箱即用的 api")]),v._v(" "),_("li",[v._v("应用的实现与技术栈无关")]),v._v(" "),_("li",[v._v("html entry 接入方式，让微前端接入像 iframe 一样简单")]),v._v(" "),_("li",[v._v("样式隔离，确保微应用之间样式互不干扰")]),v._v(" "),_("li",[v._v("js 沙箱，确保微应用之间全局变量/事件不冲突")]),v._v(" "),_("li",[v._v("资源预加载，在空闲事件预加载应用，提升速度")])]),v._v(" "),_("p",[v._v("qiankun 有哪些缺点？")]),v._v(" "),_("ol",[_("li",[v._v("适配成本比较高，工程化、生命周期、静态资源路径、路由等都要做一系列适配工作")]),v._v(" "),_("li",[v._v("无法同时激活多个子应用，也不支持子应用保活")])]),v._v(" "),_("p",[v._v("iframe 微前端方案有哪些缺陷？")]),v._v(" "),_("ol",[_("li",[v._v("刷新页面会导致 iframe url 状态丢失，后退前进按钮无法使用")]),v._v(" "),_("li",[v._v("弹窗类功能无法应用到整个大应用")]),v._v(" "),_("li",[v._v("每次进入子应用都是一次浏览器上下文创建、资源加载，会大量的消耗资源")])]),v._v(" "),_("p",[v._v("micro-app:")]),v._v(" "),_("p",[v._v("micro-app 是基于 webcomponent + qiankun sandbox 的微前端方案")]),v._v(" "),_("p",[v._v("特点：")]),v._v(" "),_("ol",[_("li",[v._v("使用 webcomponent 加载子应用相比 single-spa 这种注册监听方案更优雅")]),v._v(" "),_("li",[v._v("组件是 api 更加符合使用习惯，支持子应用保活")]),v._v(" "),_("li",[v._v("降低子应用改造成本，提供静态资源预加载能力")])]),v._v(" "),_("p",[v._v("不足：")]),v._v(" "),_("ol",[_("li",[v._v("多应用激活后无法保持个子应用路由状态，刷新后全部丢失")]),v._v(" "),_("li",[v._v("对于不支持 webcomponent 的浏览器没有做降级处理")])]),v._v(" "),_("p",[v._v("emp 方案：")]),v._v(" "),_("p",[v._v("特点：")]),v._v(" "),_("ol",[_("li",[v._v("webpack 联邦编译可以保证所有子应用依赖解耦")]),v._v(" "),_("li",[v._v("应用间去中心化的调用、共享模块")]),v._v(" "),_("li",[v._v("模块远程 ts 支持")])]),v._v(" "),_("p",[v._v("不足：")]),v._v(" "),_("ol",[_("li",[v._v("对 webpack 强依赖，老旧项目不友好")]),v._v(" "),_("li",[v._v("没有有效的 css 沙箱和 js 沙箱，需要靠用户自觉")]),v._v(" "),_("li",[v._v("子应用保活、多应用激活无法实现")]),v._v(" "),_("li",[v._v("主、子应用的路由可能发生冲突")])]),v._v(" "),_("p",[v._v("css 隔离是怎么实现的？")]),v._v(" "),_("ol",[_("li",[v._v("使用 shadow dom，它是浏览器提供的一种能力，允许在浏览器渲染文档的时候向其中的 Dom 结构中插入一棵 dom 元素子树，但特殊的是，这棵子树并不在主 dom 树中")]),v._v(" "),_("li",[v._v("为子应用的根节点添加属性，然后通过选择器隔离样式")])]),v._v(" "),_("p",[v._v("js 沙箱是怎么实现的？")]),v._v(" "),_("p",[v._v("qiankun 有 3 种沙箱，分别是快照沙箱、单应用代理沙箱、多应用代理沙箱")]),v._v(" "),_("ol",[_("li",[v._v("快照沙箱：对 window 对象生成快照，子应用对 window 做了修改操作时，进行记录，并根据记录的内容，在适当的时候对 window 对象进行恢复/重新激活")]),v._v(" "),_("li",[v._v("单应用代理沙箱：也对 window 对象有污染，与快照沙箱不同的是，它没有遍历 window 上的属性，而是使用了 proxy 进行代理")]),v._v(" "),_("li",[v._v("多应用代理沙箱：对每个子应用的 window 都做了代理，它维护了所有的代理对象")])]),v._v(" "),_("p",[v._v("微前端的原理是什么？")]),v._v(" "),_("ol",[_("li",[v._v("做了什么？：在一个应用中加载其他子应用的文件资源，并渲染到自己内部，同时做了 css 隔离、js 隔离，监听路由变化激活子应用的工作")]),v._v(" "),_("li",[v._v("过程是什么？主应用监听路由的变化，根据 entry 配置，匹配并激活对应的子应用。在这个过程中，会去请求子应用的资源文件，解析并加载到主应用中。同时触发微前端提供的生命周期函数")]),v._v(" "),_("li",[v._v("另外，还做了 css 隔离、js 隔离，使子应用之间互不影响")])]),v._v(" "),_("p",[v._v("父子应用的数据交换是怎么进行的？")]),v._v(" "),_("ol",[_("li",[v._v("配合 useModel，子应用中会自动生成一个全局 model，可以使用 useModel 获取主应用透传的 props，(主应用通过 MicroApp 组件传递属性)")]),v._v(" "),_("li",[v._v("主应用中配置 apps 时，以 props 将数据传递下去，子应用在生命周期钩子中获取 props（无法传递动态数据）")])]),v._v(" "),_("h3",{attrs:{id:"项目"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#项目"}},[v._v("#")]),v._v(" 项目")]),v._v(" "),_("p",[v._v("离线开发：")]),v._v(" "),_("p",[v._v("分为两部分，离线开发和离线同步")]),v._v(" "),_("ol",[_("li",[v._v("离线开发：基于微众实现，有多个工作流模块，使用 gg-editor 建立工作流，通过对节点的配置，然后前端结合工作流的关系将所有节点转化为 json 传递给后端生成模型。在模型的基础上创建定时任务，定期去执行工作流的任务")]),v._v(" "),_("li",[v._v("离线同步：用于进行数据同步，前端根据选择的不同数据库，展示相应的表单，选择来源和目标端的数据表后将同步任务的数据关系生成 json 数据发送给后端，并生成定时的同步任务")])]),v._v(" "),_("p",[v._v("数据质量：")]),v._v(" "),_("p",[v._v("通过建立规则模版，然后基于规则模板建立规则库，每个规则里有一些 sql 条件，建立方案任务后，会根据规则的条件，对目标数据源进行检测（比如设定某个表中 age 字段大于 18 的为优质数据），并按照规则权重对数据进行打分，最后生成报表供用户查看。")]),v._v(" "),_("p",[v._v("指标系统：")]),v._v(" "),_("p",[v._v("模型：选择目标数据源中的表，关联其他表并选择一些字段作为维度或度量创建模型")]),v._v(" "),_("p",[v._v("各种指标：根据模型的度量、维度关系建立指标，同时生成调度任务，每次执行指标任务都会对这些数据源的数据进行计算并生成结果供用户查看")]),v._v(" "),_("p",[v._v("数据服务：")]),v._v(" "),_("p",[v._v("前端配置服务参数（类似于 postman 中的请求配置），将配置参数整理成所需格式后，传给后端，生成可供调用的服务")]),v._v(" "),_("p",[v._v("做过哪些动效？")]),v._v(" "),_("ol",[_("li",[v._v("数字变化")]),v._v(" "),_("li",[v._v("元素淡入淡出、位移等优化交互效果的动画")]),v._v(" "),_("li",[v._v("echarts 通过状态，动态展示数据变化趋势")]),v._v(" "),_("li",[v._v("借助动画库（animate.css），做一些按钮的放大缩小、闪烁等")])]),v._v(" "),_("p",[v._v("哪些基建工作？")]),v._v(" "),_("ol",[_("li",[v._v("eslint、prettier")]),v._v(" "),_("li",[v._v("lint-staged")]),v._v(" "),_("li",[v._v("微前端")]),v._v(" "),_("li",[v._v("组件库")])])])}),[],!1,null,null,null);_.default=e.exports}}]);