## vite 相较于 webpack 的优势

### vite 会不会取代 webpack？

不会，vite 是基于 es module 的，webpack 支持多种模块化，侧重点不一样，webpack 更多的关注兼容性，vite 侧重浏览器端的开发

### 安装

```
yarn create vite
```

1. 帮我们全局安装一个东西：create-vite (vite 的脚手架)
2. 直接运行这个 create-vite bin 目录下的一个执行配置

可能会存在这样的一个误区：**官网中使用对应 yarn create 构建项目的过程也是 vite 在做的事情**

create-vite 和 vite 的关系是什么？

create-vite 内置了 vite
