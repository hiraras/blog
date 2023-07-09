## qiankun

### 文档

[https://qiankun.umijs.org/zh/guide](https://qiankun.umijs.org/zh/guide)

### 介绍

乾坤是基于 single-spa 建立的，它做了两件事：资源加载和资源隔离

参考：[https://cloud.tencent.com/developer/article/2125086](https://cloud.tencent.com/developer/article/2125086)

1. 非工程化项目作为子项目，只需要增加 entry.js 文件，并在 html 中引入，entry.js 内容如下：

```JavaScript
const render = () => {
  return Promise.resolve();
};

((global) => {
    global['purehtml'] = {
        bootstrap: () => {
            console.log('purehtml bootstrap');
            return Promise.resolve();
        },
        mount: () => {
            console.log('purehtml mount');
            return render();
        },
        unmount: () => {
            console.log('purehtml unmount');
            return Promise.resolve();
        },
    };
})(window);
```

2. antd-design-pro 项目需要安装 `@umijs/qiankun-plugin`,才能在 app.tsx 中导出 qiankun 变量

```TS
export const qiankun = {
    // 应用加载之前
    async bootstrap(props: any) {
        console.log('app1 bootstrap', props);
    },
    // 应用 render 之前触发
    async mount(props: any) {
        console.log('app1 mount', props);
    },
    // 应用卸载之后触发
    async unmount(props: any) {
        console.log('app1 unmount', props);
    },
}
```

同时还需要再 umi 配置文件中配置:

```JavaScript
{
    qiankun: {
        slave: {}
    }
}

```
