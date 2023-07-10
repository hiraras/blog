## 使用 husky 和 commitlint 规范 git 提交

1. 安装 husky

```
yarn add husky --dev
```

2. 执行 husky 命令行工具，启用 git hook

```
npx husky install
```

该命令会创建一个 .husky 目录，同时还会将 git 所在项目本地环境的 core.hookspath 设置为 .husky。所以这个.husky 目录就是我们存放 git hook 脚本的地方

（可以在项目中使用 git config --local --list 命令查看）

3. 添加 prepare 命令

其他同事拉取项目时，可能会忘了执行上面的命令来启用 git hook。但他们一定会执行 npm install 或 yarn 命令来安装依赖，所以可以利用 npm script 的生命周期脚本，加上一个 prepare 。它会在 install 之后执行

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

4. 添加钩子脚本

执行以下命令，会在 .husky 下创建一个脚本文件，并将 `npm test` 脚本加入到里边

```
npx husky add .husky/commit-msg "npm test"
```

**经过以上配置当执行 git commit 命令时已经能够监听到，并执行 npm test 命令，还可以执行相关自定义脚本（这里自定义脚本如何获取 commit 信息没有获取成功，还有深入的余地），这里先用 commitlint 包进行处理**

5. 安装 commitlint 相关包

```
yarn add -D @commitlint/cli @commitlint/config-conventional
```

或者用如下命令:

```
yarn add -D @commitlint/{config-conventional,cli}
```

6. 添加 commitlint 配置文件

新建 commitlint.config.js，并加入如下配置（也可以不配置 rules，使用默认配置）：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      // type枚举
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修补bug
      ],
    ],
    "type-empty": [2, "never"], // never: type不能为空; always: type必须为空
    "type-case": [0, "always", "lower-case"], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    "scope-empty": [0],
    "scope-case": [0],
    "subject-empty": [2, "never"], // subject不能为空
    "subject-case": [0],
    "subject-full-stop": [0, "never", "."], // subject以.为结束标记
    "header-max-length": [2, "always", 72], // header最长72
    "body-leading-blank": [0], // body换行
  },
};
```

其中的 rules 中的 `feat` 和 `fix` 的配置位置就是平时用的指定提交格式的地方

7. 修改 commit-msg 中的脚本

修改原来的 `npm test` 为 `npx --no -- commitlint --edit ${1}`

- npx --no 表示只使用本地项目 node_modules 下的脚本，不允许找不到的时候尝试去下载。下载耗费时间，所以要取消，你要确保已经把命令行工具下载好
- commitment --edit <文件名>：执行 commitment 命令行工具，并使用 --edit 选项，从一个文件里提取 commit 内容来进行校验
