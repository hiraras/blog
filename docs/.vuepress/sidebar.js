module.exports = [
  {
    title: "JavaScript",
    children: [
      {
        title: "语法 ES5/ES6+",
        children: [
          {
            title: "基础数据类型",
            path: "/JavaScript/ecmascript/dataType/",
          },
          {
            title: "new做了什么",
            path: "/JavaScript/ecmascript/new/",
          },
        ],
      },
      {
        title: "浏览器API",
        children: [
          {
            title: "IndexedDB",
            path: "/JavaScript/clientAPI/indexedDB/",
          },
        ],
      },
    ],
  },
  {
    title: "CSS",
  },
  {
    title: "HTML",
  },
  {
    title: "移动端",
  },
  {
    title: "小程序",
  },
  {
    title: "前端框架",
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
                path: "/packTools/webpack/npm/openSourcePackage/",
              },
              {
                title: "npm 版本号",
                path: "/packTools/webpack/npm/version/",
              },
              {
                title: "npm 安装机制",
                path: "/packTools/webpack/npm/install-process/",
              },
              {
                title: "CJS、ESM、AMD、UMD",
                path: "/packTools/webpack/npm/module-import/",
              },
              {
                title: "部署私人 npm 服务器",
                path: "/packTools/webpack/npm/private-packages/",
              },
              {
                title: "配置",
                path: "/packTools/webpack/npm/npm-config/",
              },
            ],
          },
          {
            title: "yarn",
            children: [
              {
                title: "yarn 安装机制",
                path: "/packTools/webpack/yarn/install-process/",
              },
            ],
          },
          {
            title: "构建流程",
            path: "/packTools/webpack/build-process/",
          },
          {
            title: "常用loader",
            path: "/packTools/webpack/loaders/",
          },
          {
            title: "常用plugin",
            path: "/packTools/webpack/plugins/",
          },
          {
            title: "打包优化",
            path: "/packTools/webpack/pack-optimize/",
          },
          {
            title: "热更新原理",
            path: "/packTools/webpack/hot-update/",
          },
          {
            title: "base 与 PublicPath",
            path: "/packTools/webpack/base-public-path/",
          },
        ],
      },
      {
        title: "gulp",
        path: "/packTools/gulp/",
      },
    ],
  },
  {
    title: "请求",
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
        path: "/safety/sqlInsert/",
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
    ],
  },
  {
    title: "代码优化/规范/管理",
    children: [
      {
        title: "git",
        path: "/CodeManage/git",
        children: [
          {
            title: "git指令",
            path: "/CodeManage/git/command/",
          },
        ],
      },
    ],
  },
  {
    title: "部署",
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
            path: "/designMode/micro-frontend/single-spa/",
          },
          {
            title: "qiankun",
            path: "/designMode/micro-frontend/qiankun/",
          },
          {
            title: "micro-app",
            path: "/designMode/micro-frontend/micro-app/",
          },
          {
            title: "JS隔离",
            path: "/designMode/micro-frontend/js-sandbox/",
          },
          {
            title: "CSS隔离",
            path: "/designMode/micro-frontend/css-sandbox/",
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
            path: "/Tools/vscode/pluginAndOpt/",
          },
          {
            title: "vscode snippet",
            path: "/Tools/vscode/snippet/",
          },
        ],
      },
      {
        title: "chrome",
        children: [
          {
            title: "chrome使用技巧",
            path: "Tools/chrome/use/",
          },
        ],
      },
      {
        title: "其他软件、工具",
        path: "/Tools/other/",
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
        ],
      },
    ],
  },
];
