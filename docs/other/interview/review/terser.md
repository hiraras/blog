# terser

webpack 和 vite 的 terser 提取公共代码，都是内置的吗，还是需要引入什么插件

## Webpack

**需要插件**（Webpack 5 内置 `terser-webpack-plugin`，但需手动配置）：

```javascript
// webpack.config.js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
```

## Vite

**内置**（生产构建自动使用 Terser）：

```javascript
// vite.config.js
export default {
    build: {
        minify: "terser", // 默认 'esbuild'，可选 'terser'
        terserOptions: {
            // 可选配置
            compress: { drop_console: true },
        },
    },
};
```

**区别**：Vite 默认用 **esbuild** 压缩（更快），可切换 Terser（更兼容）。
