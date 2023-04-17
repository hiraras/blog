## single-spa

## 介绍

它其实只做了一件事，设定了一系列生命周期（boostrap, load, mount, unmount）并监听到路由变化命中对应子应用时，执行这一系列生命周期，后续的加载资源文件、css 隔离、js 隔离等内容都是重新写的轮子（single-spa-react、single-spa-vue 等）来帮助开发者进行搭建微前端。里边还使用了 SystemJs 来加载子应用。

参考：[https://zhuanlan.zhihu.com/p/378346507](https://zhuanlan.zhihu.com/p/378346507)

<img src="/img/design-qiankun-single-spa-01.png" />
