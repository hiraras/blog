## js 隔离

### 微前端中父子应用 window 的问题

两个应用都对 windows 添加了值，他们会有覆盖的情况；或者在 windows 上添加 eventListener，比如 A 应用的一个按钮添加了点击事件，切到 B 应用后也添加了点击事件，这时点击 B 会触发 A 应用的事件

### 解决-js 隔离

我们把 JS 隔离机制常常称作沙箱，事实上，乾坤有三种 Js 隔离机制，并且在源代码中也是以 SnapshotSandbox(快照沙箱)、LegacySandbox(支持单应用的代理沙箱)、ProxySandbox(支持多应用的代理沙箱)来代表这三种不同的 Js 隔离机制。

**那么问题来了，隔离就隔离，怎么有这么多沙箱？**

1. SnapshotSandbox：
   最开始的沙箱，需要遍历 window 上的所有属性，性能较差，且只能实现单个子应用的隔离

2. LegacySandbox：
   随着 ES6 的普及，利用 Proxy 可以比较良好的解决遍历 window 上的所有属性这个问题，这就诞生了 LegacySandbox，可以实现和快照沙箱一样的功能，但是却性能更好，和 SnapshotSandbox 一样，由于会污染全局的 window，LegacySandbox 也仅仅允许页面同时运行一个微应用，所以我们也称 LegacySandbox 为支持单应用的代理沙箱

3. ProxySandbox：
   它使用了 Proxy 对每个子应用的 window 都进行了代理，子应用所有对 window 的操作都有各自的代理对象，它维护了所有的代理对象，所以可以支持一个页面运行多个微应用，因此我们称 ProxySandbox 为支持多应用的代理沙箱

事实上，LegacySandbox 在未来应该会消失，因为 LegacySandbox 可以做的事情，ProxySandbox 都可以做，而 SanpsshotSandbox 因为向下兼容的原因反而会和 ProxySandbox 长期并存。

### 过程

快照沙箱隔离：有失活和激活两个过程

1. 激活的时候设置一个当前 window 的快照，并设置一个修改内容的对象，第二次激活时根据这个对象恢复上一次的 window 状态；
2. 失活的时候记录当前 window 的修改并回复原来的 window

缺点：修改了 window 对象，造成多个子应用可能会状态错乱；使用 for 循环遍历 window 对象生成快照，效率低下

单应用代理隔离：其实是多设立了几个状态的保存对象（新属性、修改属性），并使用 Proxy 代理一个对象进行操作监听，跳过了 for 遍历的过程，但是还是对 window 进行了更改，只适用于单个应用

多应用代理隔离：使用 Proxy 进行代理，所有操作都在代理对象上记录，多个应用就生成多个代理对象，既不需要使用 for 循环，也不会操作 window，只需要不同应用进行区分即可
