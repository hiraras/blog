# 面试复习

-   js 基础：es6 文档、this、作用域、继承、正则、事件循环、new、垃圾回收
-   css：flex、grid、bfc 条件及其应用
-   网络安全：常见攻击手段及预防
-   网络请求相关
-   react：react、redux、react-router、hooks
-   ts
-   面试题
-   过去记录的技术日记
-   写简历/面试的时候对一项技术，需要知道为什么用它，它能带来什么效益，再扩展到更广的解决相同问题有哪些不同的方案，为什么最终选了它。

相关链接：https://juejin.cn/post/6844903885488783374

meet48:

1. 使用 webpack-bundle-analyzer 分析打包产物构成，从而分析造成包过大的原因
2. 为页面做懒加载将 main.js 文件大小从 1.1m 降低到 600k
3. 使用 splitChunk 将 npm 包的代码拆分到单独的 js 文件中
4. 将部分体积较大的包如 react/react-dom 使用 cdn 的方式引入，并配置 webpack 相关参数，减少包大小
5. 为国际化 json 文件每次打包时添加文件指纹，解决时常发生的缓存问题
6. 编写 LangClear webpack 插件，在打包的时候清除语言文件中一些已经用不到的项，减少语言文件大小。因为这个文件是优先加载并会阻塞页面渲染，因此提高了首屏渲染的效率

小余
crm - react/状态管理/抽取组件/接入电话系统/权限管理

夏猫
短信平台 - jade/原生 js

达西
赤兔火眼 - 错误上报模块/扩展小程序组件生态/code review/husky

华旺达
凌久中台 - 微前端/组件库

信意
meet48 - web3/组件库/webpack-vite 迁移/单点登录/clear-lang 插件/大文件切片

# 前端面试复习图谱

1. 开发前
2. 开发中
3. 测试中
4. 上线时
5. 迭代中

## 开发前

1. 技术选择
2. 前端工程化

### 技术选择

1. es6 基础
2. css 基础/less/tailwind
3. react
4. 全局状态管理库(redux/zustand)，要知道它是如何实现的
5. webpack/vite
6. http 请求(fetch/axios)

### 前端工程化

1. git 规范
2. typescript
3. stylelint
4. prettier
5. eslint
6. ai 构建时的全局 rules
7. CI/CD
8. npm/pnpm/yarn 等包管理工具
9. commonjs/esm 规范
10. babel/postcss 进行源代码转化
11. 性能监控
12. 代码压缩 terser
13. 代码分割
14. 文件指纹

## 开发中

1. 路由规则
2. 项目文件夹分类规范

    - .env: 根据不同环境值有所变化的配置项
    - config: 一些需要配置的模块的配置项放入(需要配置的 npm 包，如 wagmi)，也可以建一个包含项目公共配置的[项目配置文件]，如默认页码大小配置
    - common: 应该跟活动/模块走，因为多个界面应该是属于同一个活动才需要共用的配置
    - utils: 通用的辅助方法，和活动或部分模块相关的方法应该放在 common
    - constants: 消除全局魔术字符串的时候可以使用，其他可以放到 common 中

3. ts 类型定义规范
4. 状态管理规范
5. 跨项目公用组件库
6. 联邦模块
7. 多个活动并行时的分支管理
8. 权限管理
9. 接口联调
10. 代码 review

### 路由规则

1. 根据目录自动生成路由
2. 路由按需加载(懒加载)
3. 路由级权限控制

### ts 类型定义规范

1. any 的使用范围(什么时候可以使用)
2. 定义类型什么时候用 interface/type

### 状态管理规范

1. 哪些东西是可以放到全局的 - 需要共享的都可以放，不用担心内存，浏览器其实抗的住，另外，改变单个状态不会影响到其他状态
2. 是否可以使用 context 降低内存压力 - 不行，不常更改的状态可放，主要是因为改变某个状态时，context 内的所有属性相关的消费组件都会更新

### 跨项目公用组件库

1. 组件库分类(ui 组件库/utils 组件库/hooks 组件库)
2. 组件库的 esm/commonjs 规范
3. 组件文档

### 权限管理

1. 路由级权限
2. 功能模块权限
3. 按钮级权限

## 测试中

1. 单元测试

## 上线时

1. 环境变量确认
2. 出问题时可能要代码回滚
3. 文件缓存处理
4. nginx 的配置和使用

### 环境变量

1. 环境变量注入的方法
2. 开发环境/生产环境判断环境的区别

### 文件缓存处理

1. cdn 刷新资源
2. 文件指纹

## 迭代中

1. 项目优化
2. 项目模板快速建立
3. 项目迁移 - 平台迁移（基础 api 二次封装）/ 框架迁移
4. 技术拓展

### 项目优化

1. 项目启动/打包速度优化
2. 代码体积分析
    - webpack: webpack-bundle-analyzer/speed-measure-webpack-plugin(速度分析)
    - vite: rollup-plugin-visualizer（推荐）/vite-bundle-visualizer
3. 代码压缩(terser)
4. split thunk - webpack(`optimization.splitChunks`) 和 vite(`build.rollupOptions.output`) 的 split chunk 功能都是内置的
5. 雪碧图
6. 图片响应式适配 - srcset/sizes，浏览器自动匹配，不需要 js 执行
7. 静态文件上传 cdn/压缩
8. performance 分析界面性能
9. 代码运行效率优化(减少递归/尾调优化)
10. 项目全局错误处理
11. 动态加载
12. 资源预加载
13. js 文件引用 async/defer
14. http 请求优化
15. tree shaking - webpack/vite 内置
16. 缓存优化
17. 模块热替换
18. 使用新的浏览器特性优化效率(requestIdleCallback/queueMicrotask 等)

### 技术拓展

1. esm/commonjs 的区别/他们混用时如何处理兼容
2. 大文件切片
3. canvas 图像处理
4. bower 转化代码
5. 界面自适应
6. web3
7. 微前端
8. 图表
9. Observer
10. 瀑布流
11. 数据懒加载
12. 面向对象开发
13. 全栈
14. 单点登录

### ai

1. spec
2. 各种 ide 的使用
3. skills
4. agent
5. ai 工具开发

---

1. next.js 开发一个网站
2. ai 开发一个应用
3. ai 优化项目使用
4. 项目模板脚手架 x
5. 大文件上传相关问题 x
