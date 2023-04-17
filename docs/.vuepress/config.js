const sidebar = require("./sidebar");

module.exports = {
  lang: "zh-CN",
  title: "hirara's blog",
  description: "记录前端学习历程",
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "hirara's blog",
      description:
        "web前端技术博客,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,React,python,css3,html5,Node,git,github等技术文章。",
    },
  },
  themeConfig: {
    logo: "/img/header.jpg",
    nav: [{ text: "组件库", link: "http://www.tinypen.cn" }],
    sidebar,
    footer: false,
  },
  author: {
    name: "hirara", // 必需
    link: "https://github.com/hiraras",
  },
  head: [["link", { rel: "icon", href: "/img/favicon.ico" }]],
};
