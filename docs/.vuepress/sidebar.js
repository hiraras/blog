module.exports = [
  {
    title: "JavaScript",
    children: [
      {
        title: "ES5/ES6+",
        children: [
          {
            title: "基础数据类型",
            path: "/JavaScript/ecmascript/dataType/",
          },
          {
            title: "let 和 const",
            path: "/JavaScript/ecmascript/let-const/",
          },
          {
            title: "解构赋值",
            path: "/JavaScript/ecmascript/destructuring/",
          },
          {
            title: "继承",
            path: "/JavaScript/ecmascript/extends/",
          },
          {
            title: "this 指向",
            path: "/JavaScript/ecmascript/this/",
          },
          {
            title: "作用域与闭包",
            path: "/JavaScript/ecmascript/action-scope/",
          },
          {
            title: "正则",
            children: [
              {
                title: "基础",
                path: "/JavaScript/ecmascript/regexp/basic/",
              },
              {
                title: "常用正则",
                path: "/JavaScript/ecmascript/regexp/examples/",
              },
            ],
          },
          {
            title: "new做了什么",
            path: "/JavaScript/ecmascript/new/",
          },
          {
            title: "垃圾回收",
            path: "/JavaScript/ecmascript/recycle/",
          },
          {
            title: "事件循环",
            path: "/JavaScript/ecmascript/event-loop/",
          },
          {
            title: "date 对象",
            path: "/JavaScript/ecmascript/date/",
          },
          {
            title: "属性描述符",
            path: "/JavaScript/ecmascript/property-descriptor/",
          },
          {
            title: "web worker",
            path: "/JavaScript/ecmascript/web-worker/",
          },
          {
            title: "注释",
            path: "/JavaScript/ecmascript/comment/",
          },
          {
            title: "计时器",
            path: "/JavaScript/ecmascript/timer/",
          },
        ],
      },
      {
        title: "浏览器API & 特性",
        children: [
          {
            title: "IndexedDB",
            path: "/JavaScript/clientAPI/indexedDB/",
          },
          {
            title: "createObjectURL",
            path: "/JavaScript/clientAPI/createObjectURL/",
          },
          {
            title: "全局错误捕获",
            path: "/JavaScript/clientAPI/error-catch/",
          },
          {
            title: "requestIdleCallback",
            path: "/JavaScript/clientAPI/requestIdleCallback/",
          },
          {
            title: "requestAnimationFrame",
            path: "/JavaScript/clientAPI/requestAnimationFrame/",
          },
          {
            title: "剪切板",
            path: "/JavaScript/clientAPI/clipboard/",
          },
          {
            title: "自定义event",
            path: "/JavaScript/clientAPI/custom-event/",
          },
          {
            title: "数据导出为excel",
            path: "/JavaScript/clientAPI/export-excel/",
          },
          {
            title: "录屏",
            path: "/JavaScript/clientAPI/record-screen/",
          },
          {
            title: "composition",
            path: "/JavaScript/clientAPI/composition/",
          },
          {
            title: "浏览器渲染原理",
            path: "/JavaScript/clientAPI/render-principle/",
          },
          {
            title: "js操作css",
            path: "/JavaScript/clientAPI/js-change-css/",
          },
          {
            title: "拖拽",
            path: "/JavaScript/clientAPI/drag/",
          },
        ],
      },
      {
        title: "node",
        children: [
          {
            title: "node的原理",
            path: "/JavaScript/node/principle/",
          },
          {
            title: "path模块",
            path: "/JavaScript/node/path/",
          },
        ],
      },
      {
        title: "TypeScript",
        children: [
          {
            title: "基础知识",
            children: [
              {
                title: "常用操作",
                path: "/JavaScript/ts/basic/normal/",
              },
              {
                title: "类型工具",
                path: "/JavaScript/ts/basic/tools/",
              },
            ],
          },
          {
            title: "进阶示例",
            children: [
              {
                title: "过滤出对象中值为Function类型的键",
                path: "/JavaScript/ts/advance/01/",
              },
            ],
          },
        ],
      },
      {
        title: "文件操作",
        children: [
          {
            title: "File类",
            path: "/JavaScript/file/file-class/",
          },
        ],
      },
    ],
  },
  {
    title: "CSS",
    children: [
      {
        title: "特性",
        path: "/css/speciality/",
      },
      {
        title: "flex",
        path: "/css/flex/",
      },
      {
        title: "question",
        path: "/css/question/",
      },
      {
        title: "不常用的css",
        path: "/css/unusual/",
      },
      {
        title: "自适应与响应式布局",
        path: "/css/media-rem/",
      },
      {
        title: "less",
        path: "/css/less/",
      },
      {
        title: "sass",
        path: "/css/sass/",
      },
      {
        title: "grid",
        path: "/css/grid/",
      },
      {
        title: "css 模块化",
        path: "/css/module/",
      },
      {
        title: "动画",
        path: "/css/animate/",
      },
      {
        title: "实践",
        children: [
          {
            title: "绘制自适应正方形",
            path: "/css/practice/01/",
          },
          {
            title: "切换主题",
            path: "/css/practice/transform-theme/",
          },
        ],
      },
    ],
  },
  {
    title: "HTML",
    children: [
      {
        title: "回流和重绘",
        path: "/html/reflow-repaint/",
      },
      {
        title: "html标签",
        children: [
          {
            title: "dialog",
            path: "/html/tags/dialog/",
          },
        ],
      },
    ],
  },
  {
    title: "移动端",
    children: [
      {
        title: "app与webview交互",
        path: "/app/webview/",
      },
    ],
  },
  {
    title: "小程序",
    children: [
      {
        title: "taro",
        path: "/applets/taro/",
      },
    ],
  },
  {
    title: "前端框架",
    children: [
      {
        title: "心得",
        path: "/frontend-frame/mind/",
      },
      {
        title: "React",
        children: [
          {
            title: "基本知识",
            children: [
              {
                title: "key的作用",
                path: "/frontend-frame/react/basic/key/",
              },
              {
                title: "ref",
                path: "/frontend-frame/react/basic/ref/",
              },
            ],
          },
          {
            title: "api",
            children: [
              {
                title: "forceUpdate",
                path: "/frontend-frame/react/api/force-update/",
              },
            ],
          },
          {
            title: "hooks",
            children: [
              {
                title: "useState",
                path: "/frontend-frame/react/hooks/useState/",
              },
              {
                title: "useEffect",
                path: "/frontend-frame/react/hooks/useEffect/",
              },
              {
                title: "useLayoutEffect",
                path: "/frontend-frame/react/hooks/useLayoutEffect/",
              },
              {
                title: "useImperativeHandle",
                path: "/frontend-frame/react/hooks/useImperativeHandle/",
              },
              {
                title: "useDragScroll",
                path: "/frontend-frame/react/hooks/useDragScroll/",
              },
            ],
          },
          {
            title: "实际问题",
            children: [
              {
                title: "为children注入父组件的props",
                path: "/frontend-frame/react/real-question/01/",
              },
              {
                title: "如何使用react-router控制页面权限",
                path: "/frontend-frame/react/real-question/02/",
              },
              {
                title: "React事件与普通的HTML事件的区别",
                path: "/frontend-frame/react/real-question/03/",
              },
            ],
          },
          {
            title: "路由",
            path: "/frontend-frame/react/router",
          },
        ],
      },
      {
        title: "Vue",
        children: [
          {
            title: "实践",
            children: [
              {
                title: "mini-vue",
                path: "/frontend-frame/vue/practice/mini-vue/",
              },
              {
                title: "custom-ref",
                path: "/frontend-frame/vue/practice/custom-ref/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "打包工具",
    children: [
      {
        title: "webpack",
        children: [
          {
            title: "npm",
            children: [
              {
                title: "一些有用的npm开源包",
                path: "/pack-tools/webpack/npm/open-source-package/",
              },
              {
                title: "npm 版本号",
                path: "/pack-tools/webpack/npm/version/",
              },
              {
                title: "npm 安装机制",
                path: "/pack-tools/webpack/npm/install-process/",
              },
              {
                title: "CJS、ESM、AMD、UMD",
                path: "/pack-tools/webpack/npm/module-import/",
              },
              {
                title: "部署私人 npm 服务器",
                path: "/pack-tools/webpack/npm/private-packages/",
              },
              {
                title: "配置",
                path: "/pack-tools/webpack/npm/npm-config/",
              },
            ],
          },
          {
            title: "yarn",
            children: [
              {
                title: "yarn 安装机制",
                path: "/pack-tools/webpack/yarn/install-process/",
              },
            ],
          },
          {
            title: "构建流程",
            path: "/pack-tools/webpack/build-process/",
          },
          {
            title: "常用loader",
            path: "/pack-tools/webpack/loaders/",
          },
          {
            title: "常用plugin",
            path: "/pack-tools/webpack/plugins/",
          },
          {
            title: "打包优化",
            path: "/pack-tools/webpack/pack-optimize/",
          },
          {
            title: "热更新原理",
            path: "/pack-tools/webpack/hot-update/",
          },
          {
            title: "base 与 PublicPath",
            path: "/pack-tools/webpack/base-public-path/",
          },
        ],
      },
      {
        title: "gulp",
        path: "/pack-tools/gulp/",
      },
      {
        title: "vite",
        children: [
          {
            title: "vite 简介",
            path: "/pack-tools/vite/intro/",
          },
          {
            title: "vite defineConfig",
            path: "/pack-tools/vite/define-config/",
          },
          {
            title: "vite 环境变量",
            path: "/pack-tools/vite/env-variable/",
          },
          {
            title: "vite的css相关配置",
            path: "/pack-tools/vite/css/",
          },
          {
            title: "vite中的静态资源",
            path: "/pack-tools/vite/static-assets/",
          },
          {
            title: "vite 别名的配置",
            path: "/pack-tools/vite/alias/",
          },
          {
            title: "vite 插件",
            path: "/pack-tools/vite/plugins/",
          },
          {
            title: "vite & ts",
            path: "/pack-tools/vite/ts/",
          },
          {
            title: "vite 性能优化",
            path: "/pack-tools/vite/optimization/",
          },
          {
            title: "vite 跨域",
            path: "/pack-tools/vite/cross-domain/",
          },
          {
            title: "vite开发中遇到的问题",
            path: "/pack-tools/vite/troubles/",
          },
        ],
      },
    ],
  },
  {
    title: "http",
    children: [
      {
        title: "请求相关",
        children: [
          {
            title: "终止http请求",
            path: "/http/request/abort-request/",
          },
          {
            title: "请求进度控制",
            path: "/http/request/progress-control/",
          },
        ],
      },
      {
        title: "http基本知识",
        path: "/http/base/",
      },
    ],
  },
  {
    title: "web3.0",
    children: [
      {
        title: "概念",
        path: "/web3.0/concept/",
      },
      {
        title: "问题",
        path: "/web3.0/questions/",
      },
      {
        title: "web3.js",
        children: [
          {
            title: "一些概念",
            path: "/web3.0/web3js/concept/",
          },
          {
            title: "api",
            path: "/web3.0/web3js/api/",
          },
          {
            title: "wallet-api",
            path: "/web3.0/web3js/wallet-api/",
          },
          {
            title: "问题",
            path: "/web3.0/web3js/questions/",
          },
        ],
      },
      {
        title: "solidity",
        children: [
          {
            title: "基础",
            path: "/web3.0/solidity/basic/",
          },
          {
            title: "数据类型",
            path: "/web3.0/solidity/data-type/",
          },
          {
            title: "函数",
            path: "/web3.0/solidity/function/",
          },
          {
            title: "发行自定义货币",
            path: "/web3.0/solidity/custom-eth/",
          },
        ],
      },
    ],
  },
  {
    title: "web安全",
    children: [
      {
        title: "DDoS（洪水攻击）",
        path: "/safety/ddos/",
      },
      {
        title: "SQL 注入",
        path: "/safety/sql-insert/",
      },
      {
        title: "CSRF",
        path: "/safety/csrf/",
      },
      {
        title: "XSS",
        path: "/safety/xss/",
      },
    ],
  },
  {
    title: "优化",
    children: [
      {
        title: "渲染优化",
        path: "/optimize/render/",
      },
      {
        title: "访问资源获取优化",
        path: "/optimize/get-resource/",
      },
      {
        title: "通用的打包体积优化",
        path: "/optimize/common-package-size/",
      },
    ],
  },
  {
    title: "代码优化/规范/管理",
    children: [
      {
        title: "git",
        children: [
          {
            title: "git指令",
            path: "/code-manage/git/command/",
          },
          {
            title: "git配置",
            path: "/code-manage/git/config/",
          },
          {
            title: "使用 husky 和 commitlint 规范git提交",
            path: "/code-manage/git/husky-commitlint/",
          },
        ],
      },
      {
        title: "immer",
        path: "/code-manage/immer/",
      },
    ],
  },
  {
    title: "部署",
    children: [
      {
        title: "使用 github-actions 自动部署",
        path: "/deploy/github-actions/",
      },
      {
        title: "docker",
        children: [
          {
            title: "概念",
            path: "/deploy/docker/concept/",
          },
        ],
      },
    ],
  },
  {
    title: "可视化",
    children: [
      // {
      //   title: "three.js",
      //   children: [
      //     {
      //       title: "纹理",
      //       path: "/visualization/three/texture/",
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "服务端",
    children: [
      {
        title: "服务器",
        children: [
          {
            title: "阿里云服务器web服务部署",
            path: "/backend/server/deploy/",
          },
        ],
      },
    ],
  },
  {
    title: "算法",
    children: [
      {
        title: "常用算法",
        path: "/arithmetic/methods/",
      },
      {
        title: "面试问题",
        path: "/arithmetic/interview/",
      },
      {
        title: "实践",
        children: [
          {
            title: "数组的所有排列",
            path: "/arithmetic/practice/01/",
          },
          {
            title: "深拷贝",
            path: "/arithmetic/practice/02/",
          },
          {
            title: "并发请求",
            path: "/arithmetic/practice/03/",
          },
        ],
      },
    ],
  },
  {
    title: "经验",
    children: [
      {
        title: "问题",
        children: [
          {
            title: "antd相关",
            path: "/experience/question/antd/",
          },
        ],
      },
      {
        title: "配置",
        children: [
          {
            title: "prettier配置",
            path: "/experience/configs/prettier/",
          },
          {
            title: "nginx配置",
            path: "/experience/configs/nginx/",
          },
          {
            title: "eslint配置",
            path: "/experience/configs/eslint/",
          },
        ],
      },
    ],
  },
  {
    title: "设计模式",
    children: [
      {
        title: "微前端",
        children: [
          {
            title: "single-spa",
            path: "/design-mode/micro-frontend/single-spa/",
          },
          {
            title: "qiankun",
            path: "/design-mode/micro-frontend/qiankun/",
          },
          {
            title: "micro-app",
            path: "/design-mode/micro-frontend/micro-app/",
          },
          {
            title: "JS隔离",
            path: "/design-mode/micro-frontend/js-sandbox/",
          },
          {
            title: "CSS隔离",
            path: "/design-mode/micro-frontend/css-sandbox/",
          },
        ],
      },
    ],
  },
  {
    title: "工具",
    children: [
      {
        title: "vscode",
        children: [
          {
            title: "vscode 常用插件及操作",
            path: "/tools/vscode/plugin-and-opt/",
          },
          {
            title: "vscode snippet",
            path: "/tools/vscode/snippet/",
          },
        ],
      },
      {
        title: "chrome",
        children: [
          {
            title: "chrome使用技巧",
            path: "/tools/chrome/use/",
          },
        ],
      },
      {
        title: "其他软件、工具",
        path: "/tools/other/",
      },
    ],
  },
  {
    title: "我的实践",
    children: [
      {
        title: "InfiniteScroll-指令",
        path: "/practice/InfiniteScroll/",
      },
      {
        title: "useSetState",
        path: "/practice/useSetState/",
      },
      {
        title: "useAgent",
        path: "/practice/useAgent/",
      },
      {
        title: "Carousel",
        path: "/practice/Carousel/",
      },
      {
        title: "Vue-Table",
        path: "/practice/VTable/",
      },
      {
        title: "LazyImage",
        path: "/practice/LazyImage/",
      },
      {
        title: "瀑布流布局",
        path: "/practice/masonry-layout/",
      },
      {
        title: "浏览器指纹",
        path: "/practice/browser-fingerprint/",
      },
      {
        title: "utils函数",
        children: [
          {
            title: "转换内存单位",
            path: "/practice/utils/transform-memory-unit/",
          },
          {
            title: "对象字符串（非json）转成json对象",
            path: "/practice/utils/transform-obj-str-to-json/",
          },
        ],
      },
      {
        title: "临时",
        path: "/practice/temp/",
      },
      {
        title: "歌词滚动效果",
        path: "/practice/lyric-roll/",
      },
      {
        title: "cli工具",
        path: "/practice/setup-cli/",
      },
      {
        title: "promise 相关",
        path: "/practice/promise/",
      },
    ],
  },
  {
    title: "技术之外",
    children: [
      {
        title: "面试",
        children: [
          {
            title: "面试题",
            path: "/other/interview/question/",
          },
          {
            title: "面试复习",
            path: "/other/interview/review/",
          },
          {
            title: "面试题准备",
            children: [
              {
                title: "react",
                path: "/other/interview/prepare/react/",
              },
              {
                title: "http",
                path: "/other/interview/prepare/http/",
              },
              {
                title: "webpack",
                path: "/other/interview/prepare/webpack/",
              },
              {
                title: "一般问题",
                path: "/other/interview/prepare/normal/",
              },
            ],
          },
        ],
      },
      {
        title: "待学习",
        path: "/other/prepare-study/",
      },
    ],
  },
];
