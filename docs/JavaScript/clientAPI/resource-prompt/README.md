# 资源提示符

## script

浏览器解析 html 的时候，遇到 script 标签时，会先下载完脚本，再执行脚本，然后再继续往下解析 dom。下载过程会对 dom 解析造成阻塞。async 和 defer 提示符可以让浏览器异步下载脚本，并在适当时机执行脚本

**async**: 异步下载脚本，下载期间继续执行其他 dom，当脚本下载完毕，暂停 dom 解析，直接开始执行脚本。适用于加载一些完全独立的脚本（不依赖其他脚本、不操作 dom）
**defer**: 异步下载脚本，下载完脚本后不会立即执行脚本，而是会等待 dom 解析完毕后再执行脚本。同时会保证脚本执行顺序。

一些网站的一个 script 标签会同时使用 async 和 defer，是为了兼容性，一些旧的浏览器如 IE9 及以下不支持 async 但支持 defer。
当两个提示符都有的情况下，async 的优先级高于 defer
