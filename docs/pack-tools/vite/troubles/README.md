# vite 开发中遇到的问题

## 将 create-react-app（带 craco） 迁移到 vite

步骤：

1. 删除多余依赖（特别是 react-scripts）
2. 安装 vite
3. 修改启动、打包命令
4. 将 index.html 移到根目录，并引入入口文件

```html
<script src="./src/index.tsx" type="module"></script>
```

5. 新建 vite.config.js
6. 安装 @vitejs/plugin-react，并在插件中使用
7. 配置别名
8. 一些引用没有使用 @ 引用的，改为使用 @
9. 修改 css 文件中 `'~xxx'` 为 `'xxx'`，包括 @import 和一些背景的引用
10. 解决各种报错（大部分跟包有关）
11. 定义环境变量（process 等）
12. 修改模板 html 中的%PUBLIC_URL%
13. 配置 server
14. 至此项目应该可以启动/打包了，如果还有报错，只能逐个排查，最后就是验一下页面功能/样式等有无问题

```js
{
  // ...
  define: {
    'process.env': JSON.stringify(process.env)
  }
}
```

遇到的问题：

有关 node 端遇到的报错，webpack 都运行在 node 端，所以一些 node 相关的报错，都跟 webpack 相关的包有关(例如 react-scripts)

### Buffer is not defined，如果直接移除了 react-scripts ，使用 react 插件也可避免这个问题

解决：

```js
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
```

### Unable to determine current node version，如果直接移除了 react-scripts ，使用 react 插件也可避免这个问题

解决：

1. 将 react-scripts 包删除
2. 安装@vitejs/plugin-react 插件
3. 在 plugins 中使用

### 引入 antd 样式报错：colorPalette is not defined

由样式引入错误导致

解决：

```js
{
  // ...
   css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
}
```
