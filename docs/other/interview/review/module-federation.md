# 联邦模块

1. webpack 的联邦模块更接近 splitChunk 还是公共组件库

**Webpack Module Federation（联邦模块）更接近公共组件库，但它解决的是公共组件库的“版本依赖地狱”和“部署耦合”问题。**

从技术实现上看，它和 `splitChunks` **完全不是一回事**；从业务效果上看，它是对**公共组件库**的一种**架构升级**。

我们可以通过对比这三个概念来理解：

### 1. 核心区别：运行时 vs 构建时

| 特性         | `splitChunks` (代码分割)   | **公共组件库 (NPM Package)** | **Module Federation (联邦模块)** |
| :----------- | :------------------------- | :--------------------------- | :------------------------------- |
| **工作时机** | **构建时** 切割            | **构建时** 打包进项目        | **运行时** 动态拉取              |
| **依赖关系** | 同一个打包过程的产物       | 版本锁死，需发版升级         | 共享依赖，可独立部署             |
| **物理形态** | 同一个域名下的多个 JS 文件 | `node_modules` 里的代码      | 不同域名/不同仓库的独立应用      |
| **类比**     | 把一本书拆成上下册         | 引用一本已出版的书           | 书里的某一章实时从云端加载最新版 |

### 2. 为什么它更接近“公共组件库”？

假设你有一个 `common-ui` 组件库（里面有按钮、弹窗、表格）。

**使用公共组件库（NPM）的痛点：**

-   你改了 `common-ui` 里一个按钮的颜色。
-   你必须：发布 NPM 包 → 主应用 `npm update` → 重新构建 → 重新部署。
-   **10 个子应用依赖它，10 个都要重新构建部署。**（构建耦合）

**使用 Module Federation 的解法：**

-   `common-ui` 作为一个 **Remote（远程模块）** 独立部署在 `cdn.com/common-ui/remoteEntry.js`。
-   主应用（Host）在**浏览器里**通过 Webpack 运行时加载这个模块。
-   你改了按钮颜色，只需**重新部署 `common-ui` 这一个服务**。所有主应用刷新页面后，自动拿到新按钮样式。**无需重新构建主应用。**

**结论**：它是对 **“运行时动态公共组件库”** 的实现。它把 NPM 这种**编译时链接**改成了**运行时链接**。

### 3. 为什么它**不是** `splitChunks`？

很多人看到联邦模块能抽离 `react`、`react-dom` 这些大库，就觉得它是 `splitChunks` 的替代品。这是最大的误区。

-   **`splitChunks` 的目标**：减少**单个应用**的重复代码，优化首屏加载体积。

    -   _例子_：A 页面用了 `lodash`，B 页面也用了。SplitChunks 把它们抽成 `vendor.js`，用户访问 A 时缓存，访问 B 时直接用缓存。

-   **Module Federation 的目标**：解决**多个独立应用之间**的模块共享和独立部署问题。
    -   _例子_：应用 A（后台管理）和应用 B（数据大屏）都需要用同一个 **“用户权限验证模块”**。这个模块逻辑复杂且更新频繁。

| 场景                     | 用 SplitChunks 行吗？         | 用 Module Federation 行吗？           |
| :----------------------- | :---------------------------- | :------------------------------------ |
| 同一个 SPA 内的页面跳转  | ✅ **最佳实践**               | ❌ 杀鸡用牛刀，反而增加复杂度和请求数 |
| 两个不同域名部署的子应用 | ❌ 根本打不通，是两个独立项目 | ✅ **唯一解法**                       |

### 4. 总结对比表

| 维度         | SplitChunks        | 公共组件库 (NPM)            | **Module Federation**          |
| :----------- | :----------------- | :-------------------------- | :----------------------------- |
| **更新成本** | 重新构建主应用     | 更新 package.json，重新构建 | **只部署远程模块，主应用无感** |
| **依赖版本** | 单一版本，无冲突   | 可能多版本冲突，需手动处理  | 严格共享作用域，运行时协商版本 |
| **适用规模** | **单个应用内部**   | **整个公司所有项目**        | **微前端架构下的多个独立应用** |
| **首屏性能** | **优**（一次请求） | 中（打包进主 bundle）       | 差（需额外请求 remoteEntry）   |

### 5. 给你的最终建议

如果你现在要做架构选型，可以参考这个决策树：

1. **只是当前项目太大，加载慢？** → 用 **`splitChunks` + 懒加载 `lazy()`**。
2. **有两个以上的项目要复用一套组件，且不想每次改组件都发版主应用？** → 用 **Module Federation**。
3. **只有一个项目，但团队分业务线和基础组件线，想解耦开发流程？** → 可以把基础组件发 NPM，业务组件用 **Module Federation**。

**一句话结论：**

> **SplitChunks 是切肉，Module Federation 是共享器官。前者是一个项目的内部优化，后者是多个项目的架构重组。**

2. 看着联邦模块是将公共逻辑/组件暴漏到 remoteEntry，其他子项目通过引入这个 js，实现动态加载最新版本，应该不止适用于微前端架构吧

你说得非常对，**联邦模块绝对不止适用于微前端**。把它的应用场景限定在“微前端”是一种常见的认知偏差。

实际上，**Module Federation 的本质是“运行时共享模块”，微前端只是它的一种实现手段。**

除了微前端，它在以下**非微前端**场景中同样表现出色，甚至更有价值：

### 1. 跨技术栈的组件共享（最反直觉但最有用）

**场景**：老项目是 Vue2，新项目是 React 18。领导要求两个项目共用一套**弹窗组件**和**请求库**，且视觉要一致。

-   **不用联邦模块**：只能把逻辑用原生 JS 写两遍，或者用 Iframe 这种体验极差的方式。
-   **用联邦模块**：把组件核心逻辑（比如数据处理、API 请求、样式计算）写在一个 **JS/TS 逻辑层**，暴露出一个 **框架无关的 Runtime**。Vue 项目用一个 Vue 壳去加载它，React 项目用一个 React 壳去加载它。

### 2. 灰度发布与 A/B 测试平台（最实用场景）

**场景**：你想对首页的**搜索逻辑模块**做 A/B 测试。

-   **传统做法**：改代码 → 发版 → 等审核 → 看数据。如果效果不好，**回滚要再等半小时发版**。
-   **联邦模块做法**：将搜索模块独立部署。主应用写死 `import('search-module@versionA')` 或 `versionB`。
    -   **流量切换**：在网关层配置，10% 用户拉取 `remoteEntry_test.js`，90% 拉取 `remoteEntry_stable.js`。
    -   **秒级回滚**：发现 Bug，网关直接切流回老版本 `remoteEntry`，**主应用一行代码不用改，用户刷新页面即恢复**。

### 3. 开发环境提速（最容易被忽视的场景）

**场景**：巨型单体应用，`node_modules` 巨大，启动编译一次要 3 分钟。

-   **做法**：把 `node_modules` 里的**所有第三方大库**（React 全家桶、Antd、Echarts、Lodash、Moment）通过联邦模块暴露出来。
-   **效果**：
    -   把这些大库单独打包成一个 **Vendor Remote**，部署在本地 `localhost:3001`。
    -   你的主业务应用**不打包**这些库，全走联邦模块引用。
    -   **Webpack Dev Server 只编译你的业务代码**。启动速度从 3 分钟**降至 10 秒以内**。
    -   **注意**：这个操作不是为了微前端，**纯粹是为了提升本地开发 DX（开发者体验）**。

### 4. 动态插件市场（最商业化的场景）

**场景**：你做的是一个 SaaS 系统（比如飞书文档、Figma 插件系统），你**不知道**用户未来会安装什么第三方插件。

-   **不用联邦模块**：插件开发者必须把代码打包好通过 Iframe 嵌入，通信靠 `postMessage`，体验割裂（无法复用主应用的内存和 React 实例）。
-   **用联邦模块**：第三方开发者发布一个 `remoteEntry.js`。主应用根据用户购买的插件 ID，**动态 `import` 这个远程 URL**。插件拿到的 React 实例和你主应用的**是同一个**，内存共享，组件无缝嵌入。

### 5. 总结：联邦模块的“原教旨”定义

你的理解修正后应该更精确：

> **联邦模块是将模块的“链接时机”从 Build-time（构建时）推迟到了 Run-time（运行时）。**

因此，它的适用场景边界是：
**凡是需要让“模块提供方”独立部署，且“模块消费方”不想重新构建的地方，都可以用。**

| 具体场景                                   | 是否属于微前端 | 是否适合联邦模块  |
| :----------------------------------------- | :------------- | :---------------- |
| 主应用 + 子应用独立开发部署                | ✅ 是          | ✅ **经典用法**   |
| **A/B Test 逻辑模块秒级切换**              | ❌ 否          | ✅ **杀手级场景** |
| **本地开发提速，剥离 node_modules**        | ❌ 否          | ✅ **开发利器**   |
| **第三方 SaaS 插件运行时注入**             | ❌ 否          | ✅ **唯一解法**   |
| **同一个页面让 Vue 组件和 React 组件混用** | ❌ 否          | ✅ **架构桥梁**   |

**所以，你可以放心地把它理解为一个更底层的**动态链接器**，而不仅仅是“微前端框架的一个 Feature”。**

3. webpack 和 vite 都有联邦模块的实现吗，我有一个基于 node_modules 的组件库，要实现一个 webpack 版本的迁移，该怎么做

### 1. 现状确认：Webpack 和 Vite 都支持联邦模块吗？

**是的，两者都支持，但实现方式和成熟度有差异。**

| 对比维度     | **Webpack Module Federation**                                       | **Vite Module Federation**                     |
| :----------- | :------------------------------------------------------------------ | :--------------------------------------------- |
| **官方支持** | Webpack 5 原生内置 (`webpack/lib/container/ModuleFederationPlugin`) | 非官方原生，通过社区插件实现                   |
| **核心插件** | `ModuleFederationPlugin`                                            | `@originjs/vite-plugin-federation`             |
| **成熟度**   | **极高**，生产环境大规模验证                                        | **较高**，足以覆盖常见场景，但边缘 Case 需踩坑 |
| **构建产物** | 标准 Webpack 模块格式                                               | 模拟 Webpack 格式或生成 Vite 原生 ESM 格式     |

**结论**：要做 Webpack 版本的迁移，你手上有两套成熟的工具链可选。

---

### 2. 核心迁移策略：将 `node_modules` 组件库变成 Remote

你的目标是把本地 `node_modules` 里的组件库抽离成**运行时远程加载**。思路分两步：

#### 第一步：组件库侧配置（作为 Remote）

为你的组件库单独写一个 Webpack 配置文件，将其打包成一个 **Remote Entry**。

```javascript
// webpack.config.library.js (组件库的独立构建配置)
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.js", // 组件库入口
    output: {
        publicPath: "http://localhost:3001/", // 部署后的 CDN 地址
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "myComponentLibrary", // 远程模块的唯一标识
            filename: "remoteEntry.js", // 暴露给主应用加载的入口文件
            exposes: {
                // 关键：把 node_modules 里的组件，通过别名暴露出去
                "./Button": "./src/components/Button",
                "./Table": "./src/components/Table",
                "./utils": "./src/utils/index",
            },
            shared: {
                // 共享依赖：告诉联邦模块，如果主应用有 React，就用主应用的，别自带
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
                antd: { singleton: true }, // 假设你用了 Ant Design
            },
        }),
    ],
};
```

#### 第二步：主应用侧配置（作为 Host）

主应用需要知道去哪里找这个组件库。

```javascript
// webpack.config.main.js (主应用配置)
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "mainApp",
            remotes: {
                // 映射关系： "别名@库名@远程地址"
                lib: "myComponentLibrary@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
                antd: { singleton: true },
            },
        }),
    ],
};
```

#### 第三步：业务代码引用方式变更

迁移后，你的业务代码从 `import { Button } from 'my-ui-lib'` 改成：

```javascript
// 动态远程导入
const Button = React.lazy(() => import("lib/Button"));

// 或者同步引用（前提是 remoteEntry 已加载）
import { Button } from "lib/Button";
```

---

### 3. 迁移中的三个“深水区”问题及解法

从 `node_modules` 切到联邦模块，不能简单改个配置，以下三个问题必须提前预案：

| 问题                  | 现象                                                | 解决方案                                                                                                                                    |
| :-------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **1. Singleton 冲突** | 页面报错：`Invalid hook call` 或两个 React 实例冲突 | 确保 `shared` 配置中，React/Vue 等核心库**必须**配置 `singleton: true`。如果主应用和组件库版本不一致，联邦模块会发出警告，但不会崩。        |
| **2. 开发环境代理**   | 本地开发时，`localhost:3001` 请求失败               | 主应用配置 `devServer` 代理：`proxy: { '/remoteEntry.js': 'http://localhost:3001' }`。**或者更推荐**：在 `remotes` 里根据环境变量切换地址。 |
| **3. 样式污染**       | 组件库样式丢了，或者主应用样式被覆盖                | 组件库打包时开启 CSS Modules 或 `style-loader` 配置 `insert: 'head'`。如果用的是 Less/Sass，确保 `shared` 里不共享样式预处理器运行时。      |

---

### 4. 如果要迁移到 Vite 版本，方案对比如下

既然你提到了 Vite，这里也给出对比方案，方便你做技术选型：

| 操作           | Webpack 实现                              | Vite 实现 (使用 `@originjs/vite-plugin-federation`)                            |
| :------------- | :---------------------------------------- | :----------------------------------------------------------------------------- |
| **暴露组件**   | `exposes: { './Button': './src/Button' }` | 完全相同的配置语法                                                             |
| **引入远程**   | `remotes: { lib: '...' }`                 | 完全相同的配置语法                                                             |
| **开发热更新** | 支持，需配置 `devServer`                  | **更丝滑**，原生 ESM 热更新，速度极快                                          |
| **注意事项**   | -                                         | Vite 插件默认生成 ESM 格式，如果主应用是 Webpack，需要额外配置 `format: 'esm'` |

### 5. 总结：迁移检查清单

如果你决定下手迁移，按这个顺序执行，风险最低：

1. **剥离**：先把组件库从主应用的 `node_modules` 里提出来，变成一个独立的 Git 仓库。
2. **打包**：用 Webpack 配置把组件库打成 Remote。
3. **测试**：在 `index.html` 里**手动写一个 `<script>` 标签加载 `remoteEntry.js`**，确保全局变量挂载成功。
4. **接入**：主应用通过 Webpack 联邦插件接入，**先只迁移一个最不重要的 Button 组件**。
5. **灰度**：保留主应用本地 `node_modules` 里的组件库作为 fallback。如果远程加载失败，降级到本地版本。

**一句话风险提示**：

> **联邦模块最大的坑不是配置，是浏览器缓存。** 如果 `remoteEntry.js` 被强缓存，组件库更新了但用户拿不到。**必须在 Webpack 输出文件名中加 Hash，并在主应用请求时带上时间戳参数或版本号。**

4. 如果主项目中使用了 wagmi 这种工具包，那联邦模块该怎么能够使用。另外如果主项目中有权限管理，联邦模块只能通过 props 传入相关参数进行权限控制吗，还是有办法联邦模块内消费主项目的逻辑？

这两个问题非常关键，它们触及了联邦模块**生产落地**的核心痛点：**共享依赖的复杂性**和**跨边界的状态/逻辑通信**。

简单回答：

1. **Wagmi 能用，但配置门槛极高。**
2. **权限控制不仅能通过 Props，更有“反向消费主应用逻辑”的高级玩法。**

我们拆开来看。

### 1. 如何让联邦模块使用 Wagmi（或任何复杂工具包）

Wagmi 这类工具包的难点在于：它不仅是代码，它**强依赖 React Context 和顶层 Provider 包裹**。

#### 问题拆解

-   **主应用**：通过 `WagmiProvider` 包裹了整个应用，内部子组件通过 `useAccount()` 可以拿到钱包信息。
-   **联邦模块（Remote）**：如果它自己打包了一份 Wagmi，它会尝试创建**第二个 `WagmiProvider` 实例**。
-   **结果**：联邦模块里的 `useAccount()` 拿到的是 **`undefined`**，因为它不在主应用的 Provider 作用域内。

#### 解决方案（两种路径，按推荐度排序）

**方案一：共享 Provider（最推荐，零成本侵入）**

Wagmi 的 Provider 实际上只是 React Context。只要联邦模块**不打包 Wagmi**，完全复用主应用的 Wagmi 实例即可。

1. **主应用配置 Webpack**：将 Wagmi 相关的所有包设置为 `shared` 且 `singleton`（单例）。

    ```javascript
    // 主应用 webpack.config.js
    new ModuleFederationPlugin({
        shared: {
            // ... 其他依赖
            wagmi: { singleton: true, requiredVersion: "2.x" },
            viem: { singleton: true }, // wagmi 核心依赖
            "@tanstack/react-query": { singleton: true }, // wagmi 状态管理基础
            react: { singleton: true },
        },
    });
    ```

2. **联邦模块配置 Webpack**：完全相同的 `shared` 配置，**且 `exposes` 的组件不包裹自己的 Provider**。

    ```javascript
    // 联邦模块 webpack.config.js
    new ModuleFederationPlugin({
        name: "remote",
        exposes: { "./Web3Button": "./src/Web3Button" },
        shared: {
            wagmi: { singleton: true, eager: true }, // eager: true 确保立即加载主应用的实例
            viem: { singleton: true, eager: true },
            "@tanstack/react-query": { singleton: true, eager: true },
            react: { singleton: true, eager: true },
        },
    });
    ```

3. **联邦模块组件代码**：直接导出一个普通组件，**不需要**任何额外的 Provider。

    ```tsx
    // remote/src/Web3Button.tsx
    import { useAccount, useConnect } from "wagmi";
    // 👆 这里的 wagmi 运行时指向的是主应用的单例，Context 是通的

    export const Web3Button = () => {
        const { address } = useAccount(); // ✅ 能正常拿到主应用连接的钱包
        return <button>{address || "Connect"}</button>;
    };
    ```

**方案二：插件化注入（高灵活性，但复杂）**

如果主应用和联邦模块的 Wagmi 版本不一致，或者联邦模块想独立运行测试，就用 **Provider 注入模式**。

-   联邦模块暴露一个**高阶函数**，接收主应用传进来的 `wagmi` 实例。
-   联邦模块内部用主应用的 `WagmiProvider` 再包一层（虽然可以但通常没必要，直接用方案一）。

---

### 2. 联邦模块如何消费主项目的权限逻辑？（不止 Props）

这是联邦模块架构下的核心灵魂问题：**Remote 如何调用 Host 的能力？**

你说得对，**纯 Props 传递会导致 Props 地狱**（每引入一个模块都要把 `auth`、`router`、`request` 传一遍）。

有 **三种优雅的方式** 让联邦模块“反向”消费主应用逻辑：

#### 方式一：联邦模块暴露回调接口（Host 反向注入 Context）

这是目前微前端/联邦模块最标准的**控制反转**实践。

1. **主应用定义注入接口**：

    ```tsx
    // 主应用
    const AuthContext = React.createContext(null);

    <AuthContext.Provider value={{ role: "admin", checkPerm: () => {} }}>
        {/* 加载联邦模块 */}
        <RemoteComponent
        // 通过 Context，联邦模块的子组件都能拿到，不用层层传
        />
    </AuthContext.Provider>;
    ```

2. **联邦模块内消费主应用的 Context**：

    ```tsx
    // 联邦模块内 (注意：这个 Context 引用必须是共享的)
    // 简单做法：把 Context 对象也放在 shared 里共享，或者通过全局变量挂载。
    import { AuthContext } from "host/auth"; // 假设通过联邦模块也共享了 Host 的代码

    export const RemotePage = () => {
        const auth = useContext(AuthContext); // ✅ 直接拿到主应用注入的权限对象
        return auth.role === "admin" ? <AdminPanel /> : null;
    };
    ```

#### 方式二：利用浏览器全局事件总线（最解耦）

如果不想在 Webpack 配置里把 `AuthContext` 这种业务文件也做成 Shared，可以用 **CustomEvent**。

-   **主应用**：监听事件，提供服务。

    ```ts
    window.addEventListener("remote:check-perm", (e) => {
        const perm = e.detail;
        const result = checkPermission(perm); // 调用主应用逻辑
        window.dispatchEvent(
            new CustomEvent("remote:perm-result", { detail: result })
        );
    });
    ```

-   **联邦模块**：触发事件，获取结果。
    ```ts
    const hasPerm = await new Promise((resolve) => {
        window.addEventListener(
            "remote:perm-result",
            (e) => resolve(e.detail),
            { once: true }
        );
        window.dispatchEvent(
            new CustomEvent("remote:check-perm", { detail: "edit" })
        );
    });
    ```

#### 方式三：联邦模块暴露函数签名，主应用组装（最稳健）

这是一种比较推荐的模式：**联邦模块不关心权限逻辑，只关心渲染。**

1. 联邦模块导出**纯 UI 组件**和 **Controller Hook**。
2. 主应用引入组件，把权限判断的结果（`canEdit`）作为 Props 传入。

    ```tsx
    // 联邦模块导出
    export const Table = ({ canDelete, canEdit, data }) => { ... };

    // 主应用组装
    import { Table } from 'remote/Table';
    const { userPerms } = useAuth();
    <Table data={data} canEdit={userPerms.includes('edit')} canDelete={false} />
    ```

### 总结：最佳实践组合

针对你提到的 Wagmi 和 权限管理，推荐组合策略：

| 场景                 | 推荐策略                             | 理由                                                     |
| :------------------- | :----------------------------------- | :------------------------------------------------------- |
| **Wagmi / 第三方库** | **Singleton 共享**                   | 零代码侵入，联邦模块完全透明使用主应用环境               |
| **权限判断逻辑**     | **全局事件总线** 或 **共享 Context** | 权限是业务强相关逻辑，联邦模块不应内置判断，应询问主应用 |
| **UI 展示控制**      | **Props 传递布尔值**                 | 保证联邦模块的纯粹性，便于测试和 Storybook 独立开发      |

**核心原则**：

> **让联邦模块成为一个“能力索取者”，而不是“能力实现者”。它不知道 Wagmi 怎么配的，只知道 `useAccount` 能用；它不知道权限表在哪，只知道问主应用“我能删吗？”。**
