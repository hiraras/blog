## base 与 PublicPath

- base: 配置 router 的基础路由

- publicPath: 配置打包后资源的引用地址，根据 web 服务器中目录地址配置(可以看 index.html 中文件的引用地址，实际上就是配合实际目录正确的找到文件地址，因此如果 publicPath 不为/的情况要与 base 保持一直，不然找到了文件地址，但与 router 不匹配还是会显示 404 页面，如果为/则不用担心这个问题)，字符串最后需要/
