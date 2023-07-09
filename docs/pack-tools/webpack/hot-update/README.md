## 热更新原理

- Hot Module Replacement（缩写为 HMR），也叫热替换，是指在不刷新浏览器的情况下，用新模块内容替换掉旧模块内容。

- HMR 的核心就是客户端去服务器（webpack-dev-server，这里简称为 WDS）拉取更新后的文件，客户端和 WDS 之间维护了一个 websocket，当本地资源发生变化，WDS 会向浏览器推送更新，并带上构建时的 hash，浏览器拿到 hash 并对比，如果有差异，浏览器会向 WDS 发起 Ajax 请求，获取更改的内容（文件列表、hash），然后再借助这些内容向 WDS 发起类似于 jsonp 的请求获取增量更新

- 后续内容（怎么更新？状态是否需要更新？）的处理由 HotModulePlugin 插件来完成，提供了相关 API 以供开发者针对自身场景进行处理。
