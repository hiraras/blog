# vite 别名的配置

```js
{
  // ...,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
}
```

原理：

在 vite 服务端读取到对应文件时，会根据 alias 配置替换源文件中的对应的字符串，将它替换为可以正常读取的文件路径，本质就是做了一个字符串的 replace 操作
