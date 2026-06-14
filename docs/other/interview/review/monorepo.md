# monorepo

单仓管理

monorepo相比传统的一个项目一个git仓库，带来了哪些好处

Monorepo 相对「一项目一仓库」，主要好处：

1. **原子变更**：跨模块/前后端/公共库一次 PR 改完，避免多仓库版本对不齐、发版顺序扯皮。
2. **依赖一致**：共用一套 lockfile、工具链、TypeScript/ESLint 配置，减少「各仓各一套」的漂移。
3. **重构成本低**：改公共 API 可全仓一起改，编译/类型检查能立刻暴露所有受影响处。
4. **代码复用简单**：公共包直接 workspace 引用，不用发 npm、不用维护多仓版本号。
5. **CI 可增量**：只跑受影响包（Turborepo/Nx 等），大仓也能控构建时间。
6. **统一治理**：规范、安全扫描、CODEOWNERS、依赖升级在一处管，协作边界更清晰。

代价是：仓库变大、权限粒度更粗、需要边界规则和 CI 治理；小团队或强隔离场景，多仓库有时更合适。

# 规范的统一化管理

## pnpm

pnpm 不只是 npm 包的管理工具，还提供了 monorepo 的实现。
当然 npm/yarn/Lerna/Nx/TurboRepo 也可以用来搭建 monorepo

## 建立项目

### 建立工程，工程里的目录没有规定一定要怎么命名，所有子包都需要遵守的规则，就放在根目录来配置/管理

### 创建 `pnpm-workspace.yaml` 文件

```yaml
# 告诉pnpm packages和apps目录下的文件夹都为子包
packages:
    - "packages/*"
    - "apps/*"
```

### 相关命令

执行工程级命令

```bash
pnpm --workspace-root init # 在根目录下执行pnpm init命令，即便cd到了子目录下，还是会建立package.json文件到根目录下
# 或
pnpm -w init
```

执行子包命令

进入到子包目录后执行 或 `pnpm -C 子包路径 [...]`

### 环境版本锁定

```json
// package.json
{
    "engines": {
        "node": ">=22.14.0",
        "npm": ">=10.9.2",
        "pnpm": ">=10.15.1"
    }
}
```

```bash
# .npmrc ，如果没有这个文件，环境不匹配的时候，控制台会发出一个警告，如果有，会直接报错，例如执行pnpm i
engine-strict=true
```

### TypeScript

```bash
# -D和-w合写
pnpm -Dw add typescript @types/node
```

建立 `tsconfig.json`，同理，根目录下的这个 json 决定整个项目的 ts 配置，如果想要子包有自己的配置，则在子包目录下建立 `tsconfig.json`

子目录可以配置 extends 字段，表示继承其他配置文件

```json
// 这是一个node环境的tsconfig
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "types": ["node"],
        "lib": ["ESNext"]
    },
    "include": ["src"]
    // ...
}
```

```json
// 这是一个前端环境的tsconfig
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "types": [],
        "lib": ["ESNext", "DOM"]
    },
    "include": ["src"]
    // ...
}
```

**注意点**

- 子包的ts配置字段会覆盖根目录的，而不会合并
- 项目中使用了浏览器端的api，需要在lib字段添加 "DOM"
- ts会读取 include 和 files 中指定的文件，递归地包含这些文件导入/引用的所有文件，最后形成完整的编译上下文
- files会精确指定文件列表，不会检查它的依赖
- exclude用户排除文件，优先级高于include
- tsc -p [目标项目的tsconfig.build.json文件的路径]会自动生成每个源文件的类型文件

### prettier

```bash
# -D和-w合写
pnpm -Dw add prettier
```

建立 `prettier.config.js`

```js
// 具体配置可以查看官方文档: https://www.prettier.cn/docs/options.html
export default {
    // ...
};
```

建立 `.prettierignore` 文件排除不想要 prettier 的文件

```
dist
public
.local
node_modules
*.yaml
```

prettier 脚本命令

```json
// package.json
{
    "scripts": {
        "lint:prettier": "prettier --write \"**/*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}\""
    }
}
```

### eslint

安装

```bash
pnpm -Dw add eslint@latest @eslint/js globals typescript-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue
```

| 名称                                          | 作用                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| eslint                                        | 核心引擎                                                                                               |
| @eslint/js                                    | 官方规则集                                                                                             |
| globals                                       | 全局变量支持                                                                                           |
| typescript-eslint                             | TypeScript 支持                                                                                        |
| @types/node                                   | 类型定义                                                                                               |
| eslint-plugin-prettier,eslint-config-prettier | Prettier 集成，eslint 和 prettier 配置可能有冲突，eslint-config-prettier 可以让冲突的时候使用 prettier |
| eslint-plugin-vue                             | Vue.js 支持                                                                                            |

建立 `eslint.config.js`

```js
import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const ignores = [
    "**/dist/**",
    "**/node_modules/**",
    ".*",
    "scripts/**",
    "**/*.d.ts",
];
export default defineConfig(
    // 通用配置
    {
        ignores,
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            eslintConfigPrettier,
        ],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: tseslint.parser,
        },
        rules: {
            // 自定义
        },
    },
    // 前端配置
    {
        ignores,
        files: [
            "apps/frontend/**/*.{ts,js,tsx,jsx,vue}",
            "packages/components/**/*.{ts,js,tsx,jsx,vue}",
        ],
        extends: [
            ...eslintPluginVue.configs["flat/recommended"],
            eslintConfigPrettier,
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    // 后端配置
    {
        ignores,
        files: ["apps/backend/**/*.{ts,js}"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
);
```

配置 `.eslintignore`

配置命令

```json
// package.json
{
    "scripts": {
        "lint:eslint": "eslint"
    }
}
```

### 拼写检查

vscode 插件: Code Spell Checker

安装

```bash
pnpm -Dw add cspell @cspell/dict-lorem-ipsum
```

配置 `cspell.json`

```json
{
    "import": ["@cspell/dict/lorem-ipsum/cspell-ext.json"], // 当遇到 cspell这个库里的单词，认为是正确的
    "caseSensitive": false,
    "dictionaries": ["custom-dictionary"],
    "dictionaryDefinitions": [
        {
            "name": "custom-dictionary", // 配置自定义单词
            "path": "./.cspell/custom-dictionary.txt",
            "addWords": true
        }
    ],
    "ignorePaths": ["**/dist/**", "**/node_modules/**", "**/vendor/**"] // 设置不检查的目录
}
```

编写脚本

```json
// package.json
{
    "scripts": {
        "lint:spellcheck": "cspell lint \"{packages|apps}/**/*.{js,ts,mjs,cjs,json,css,less,scss,vue,html,md}\""
    }
}
```

### git 提交规范

```bash
git init
```

#### commitizen

```bash
pnpm -Dw add @commitlint/cli @commitlint/config-conventional commitizen cz-git
```

| 包                              | 说明                                                     |
| ------------------------------- | -------------------------------------------------------- |
| @commitlint/cli                 | 是 commitlint 工具的核心                                 |
| @commitlint/config-conventional | 是基于 conventional commits 规范的配置文件               |
| commitizen                      | 提供了一个交互式撰写 commit 信息的插件                   |
| cz-git                          | 是国人开发的一款工具，工程性更强，自定义更高，交互性更好 |

配置命令

```json
// package.json
{
    "scripts": {
        "commit": "git-cz" // @commitlint/cli 提供了 git-cz 的命令
    },
    "config": {
        "commitizen": {
            "path": "node_modules/cz-git"
        }
    }
}
```

```js
// 配置 commitlint.config.js
export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
        "body-leading-blank": [2, "always"],
        // ...
    },
    prompt: {
        types: [
            { value: "feat", name: "新功能：新增功能" },
            { value: "fix", name: "修复：修复缺陷" },
            { value: "docs", name: "文档：更新文档" },
            {
                value: "refactor",
                name: "重构：代码重构（不新增功能也不修复bug）",
            },
            { value: "perf", name: "性能：提升性能" },
            { value: "test", name: "测试：添加测试" },
            { value: "chore", name: "工具：更改构建流程或辅助工具" },
            { value: "revert", name: "回滚：代码回滚" },
            { value: "style", name: "样式：格式调整（不影响带啊吗运行）" },
        ],
        scopes: ["root", "backend", "frontend", "components", "utils"], // 覆盖目录
        allowCustomScopes: true,
        skipQuestions: ["body", "footerPrefix", "footer", "breaking"], // 跳过“详细描述”和“底部信息”
        messages: {
            type: "请选择提交类型：",
            scope: "请选择影响范围（可选）:",
            subject: "请简要描述更改：",
            body: "详细描述（可选）",
            footer: "关联的 ISSUE 或 BREAKING CHANGE（可选）:",
            confirmCommit: "确认提交？",
        },
    },
};
```

#### husky

连接 git hooks

```bash
pnpm -Dw add husky
pnpx husky init # 初始化 husky
```

pre-commit 文件，提交前执行文件中的命令

```
#!/usr/bin/env sh
pnpm lint:prettier && pnpm lint:eslint && pnpm lint:spellcheck
```

#### lint-staged

```bash
pnpm -Dw add lint-staged
```

配置命令

```json
// package.json
{
    "scripts": {
        "precommit": "lint-staged"
    }
}
```

配置文件

```js
// .lintstagedrc.js
// 每个字段表示，对应扩展名的文件在staged的状态时会执行后面的命令
export default {
    "*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}": ["cspell lint"],
    "*.{js,ts,vue,tsx}": ["prettier --write", "eslint"],
    "*.md": ["prettier --write"], // .md 文件单独执行 prettier
};
```

当运行 git-cz 命令的时候，提交之前会自动运行 precommit 命令。
这里就有一个问题

- 如果提交时使用 pnpm commit，会执行两次 precommit 命令(git-cz 一次，husky 一次)
- 如果去除 husky 里的 precommit，提交时不使用 pnpm commit，直接使用 git commit -m"xxx" 就会跳过 precommit

# 代码的统一化管理

1. 如何统一打包
2. 如何建立包依赖
3. 如何统一测试
4. 如何发布

## 统一打包

主要针对公共库的统一打包，例如 components 和 utils，因为它们互相依赖，一个修复了 bug，另一个此时应立即应用被修复的代码

建立 scripts/build.js

编写脚本同时打包多个包，实现可以使用 webpack，rollup，rspack 等

**package.json 里也可以有一些自定义的字段，供打包工具来使用**

```json
{
    "buildOptions": {
        "formats": ["esm", "cjs"]
    }
}
```

思路为：选用打包工具，不同打包工具使用方法和配置不同，所以核心是去知晓使用方法和需要的配置参数，不同项目可能结果有差异，plugin/loader 也不同，可以通过每个项目各自的 package.json 来配置差异点给脚本识别，最终进行输出

## 如何建立包依赖

指的是 monorepo 项目里，子包之间的相互依赖

示例

加入有 components 和 utils 两个公共包，components 依赖于 utils

在 components 的 package.dependencies 中引用

```json
{
    "dependencies": {
        "@hirara/utils": "workspace:*"
    }
}
```

重新执行 pnpm i 之后 @hirara/utils 会出现在 components 的 node_modules 中
它会生成一个软连接，当 utils 发生改变，node_modules 中的代码会同步修改

打包 components 子包的产物会包含 utils 的代码

## 如何统一测试

选择一个测试框架例如 vitest

```bash
pnpm -Dw add vitest @vitest/browser vitest-browser-vue vue
```

配置脚本

```json
{
    "scripts": {
        "test": "vitest"
    }
}
```

配置文件

```js
// vitest.config.js
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    globals: true,
                    name: "utils",
                    include: [
                        "packages/utils/__test__/**/*.{test,spec}.{ts,js,tsx,jsx}",
                    ],
                    environment: "node",
                },
            },
            {
                plugins: [vue()],
                test: {
                    globals: true,
                    name: "ui",
                    include: [
                        "packages/components/__test__/**/*.{test,spec}.{ts,js,tsx,jsx,vue}",
                    ],
                    browser: {
                        enabled: true,
                        instances: [{ browser: "chromium" }],
                    },
                },
            },
        ],
    },
});
```

vscode 扩展插件里有个 vitest 的插件，可以扫描到项目里的测试脚本，然后单独选择运行某个测试函数

## 如何发布

对于业务子包

**使用 docker、ci/cd 正常流程发布**

对于 npm 包

编写脚本

```json
// root  package.json
{
    "scripts": {
        "publish:utils": "pnpm --filter \"@hirara/utils\" publish"
    }
}
```

```json
// @hirara/utils package.json
{
    "files": ["dist"], // 发布到npm的内容
    "publishConfig": {
        "access": "public" // 表示是个公共包
    }
}
```

确认是否登录

```bash
npm whoami
```

发布

```bash
pnpm publish:utils
```

发布完成后的包会将依赖里的版本号从 "workspace:\*" 改为正常的版本号

## package.json 字段

- files 字段指定了哪些文件会被包含在发布的包中，通常会包含编译后的文件夹和类型定义文件
- peerDependencies 字段指定了哪些包会被排除，并需要在引用项目里手动安装兼容版本
- exports 字段指定了模块的导出路径和类型

### 关于 main/module/types vs exports

- main/module/types 是旧版的包入口指定文件，exports是新的
- exports可以被识别的时候(低版本npm可能不支持)会覆盖main的配置
- 当只有main，没有exports字段的时候，`import internalThing from 'your-package/internal/helper.js'`; 还是可以像这样通过路径访问到包内部的其他文件
- 有 exports 时，只有显式导出的路径可以访问。否则会报错
- 使用的时候推荐两者一起使用，main作为兜底

示例

```json
{
    "exports": {
        ".": {
            // 包的默认入口，即 require('your-package')
            "import": "./dist/index.mjs", // ESM 环境使用
            "require": "./dist/index.cjs", // CJS 环境使用
            "types": "./dist/index.d.ts" // TypeScript 使用
        },
        "./utils": {
            // 子路径导出: import('your-package/utils')
            "import": "./dist/utils.mjs",
            "require": "./dist/utils.cjs"
        },
        "./style.css": "./dist/index.css" // import '@hirara/components/style.css'
    }
}
```

## monorepo 项目里不同项目组怎么保证不越界

这是一个 monorepo 治理问题，不依赖你仓库里的具体配置，可以从「边界定义 → 工具约束 → 流程兜底」三层来理解。

## 1. 先划清边界（比工具更重要）

不同项目组首先要约定：

| 维度             | 约定内容                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| **目录归属**     | 哪些包/目录属于哪个组（如 `apps/team-a/*`、`packages/shared/*`）       |
| **依赖方向**     | 谁能依赖谁（例如：业务 app → 公共 lib，禁止反向；禁止跨组直接 import） |
| **共享 vs 私有** | 什么必须进 `packages/shared`，什么只能留在组内                         |
| **API 契约**     | 跨组调用走 published package / 明确 export，而不是 deep import         |

没有书面约定，工具也只能事后拦，拦不住「约定俗成」的越界。

## 2. 技术约束（自动化 enforcement）

### 依赖规则

- **pnpm**：`package.json` 里用 `dependenciesMeta`、workspace 协议，配合 **只允许声明过的 workspace 依赖**
- **Nx / Turborepo**：用 **tags**（如 `scope:team-a`）+ **module boundary rules**，构建/ lint 时检查
- **ESLint**：`eslint-plugin-boundaries`、`eslint-plugin-import` 限制 import 路径
- **dependency-cruiser**：在 CI 里跑，禁止非法依赖图（如 A 组 app 直接依赖 B 组内部包）

### 包可见性

- 组内包：`private: true`，不对外 export 或不在 root workspace 里「公开」
- 跨组只通过 **显式发布的 internal package**（版本号或 changeset），而不是相对路径乱引

### CI 门禁

- PR 必须过：lint（边界规则）、typecheck、受影响包的 test/build
- **CODEOWNERS**：改到别的组目录必须对应组 review
- 可选：**CODEOWNERS + required reviewers**，越界改动能被拦在 merge 前

## 3. 流程与文化

- **RFC / ADR**：跨组改 shared 包要先提案，避免「顺手改一下」影响全员
- **Changesets / 版本**：shared 包变更要有 changelog 和 semver，下游组能感知 breaking change
- **On-call / 负责人**：每个 scope 有 owner，越界 PR 可以 `@` 对应组
- **定期依赖图审查**：用 dependency-cruiser 或 Nx graph 看图，比 grep 更直观

## 4. 常见反模式（容易越界）

```
❌ team-a 直接 import team-b/src/internal/foo.ts
❌ 在 shared 里塞 team-a 专用逻辑
❌ 复制粘贴 B 组代码到 A 组「先跑起来」
❌ 改 root 配置、共享 CI、全局 tsconfig 不通知其他组
```

更稳妥的做法：

```
✅ team-a → @org/team-b-public-api（明确 export 的小 surface）
✅ 组内细节留在 team-b 私有包
✅ shared 只放真正多组复用的东西，且有 owner 和 RFC
```

## 5. 若你用的是 pnpm workspace（常见形态）

典型结构：

```
apps/
  team-a-app/
  team-b-app/
packages/
  shared-ui/      # 多组共用，有 RFC
  team-a-lib/     # 仅 A 组
  team-b-lib/     # 仅 B 组
```

在 root 用 **pnpm-workspace.yaml** 管 workspace，再配合 **eslint + dependency-cruiser 或 Nx boundaries**，在 CI 里 `pnpm lint && pnpm check:deps` 一类脚本统一跑。

---

**简要结论**：  
保证不越界 = **目录/依赖约定写清楚** + **lint/dependency 规则自动拦** + **CODEOWNERS + CI** + **shared 变更走 RFC/changeset**。工具选一套坚持跑在 CI 上即可，不必堆很多。

如果你愿意，我可以结合你当前 monorepo 的目录和 `package.json` / workspace 配置，给一版更贴你项目的边界方案和推荐工具组合（需要你 @ 相关文件或允许我扫 `pnpm-workspace.yaml`、根 `package.json` 等少量配置）。
