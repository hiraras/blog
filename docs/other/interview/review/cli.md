# cli 库创建

cli项目应该不止包含一个可以复制文件/clone github地址的脚本，它应该也是一个具备完整工程化的项目

包括

- 代码管理模块：ts、eslint、prettier、husky、lint-staged、commitlint
- 单元测试：vitest
- 核心功能的模块化：命令解析模块、功能模块拆分、日志输出优化、命令行交互的优化
- 项目说明：README.md、CHANGELOG.md(cli作为npm包发布功能也是会更新的，这个md记录了版本更新内容信息)

## cli项目开发步骤

1. 建立项目工程 - ts、eslint、prettier、husky+lint-staged、commitlint等的配置
2. 确认项目发布后使用的命令和可选参数配置
3. 使用commander解析命令
4. 处理命令参数 - 参数验证
5. 编写项目需要实现的脚本 - 拉取仓库代码/复制模板文件、git初始化、node_modules 自动安装等（如果有子命令则创建各自的脚本，例如create/init）
6. 根据参数配置的功能调整脚本的逻辑，必要时使用 `@clack/prompts` 或 `prompts` 库与用户进行交互
7. 使用 `ora`、`picocolors`等库优化cli交互时的体验
8. 修改`package.json` - 编写构建、发布、代码检查等命令；bin命令字段；files输出内容字段；engines/packageManager环境要求字段
9. 基于CI/CD工具编写不同发布脚本实现自动构建/发布
10. 编写 `README.md`、`CHANGELOG.md`等项目说明文档

## 命令解析模块

使用 `commander` 库，实现输入参数的解析

```ts
import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import { createCommand } from "./commands/create.ts";

export async function run(argv = process.argv) {
    const program = new Command();
    program
        .name("create-meet48-app")
        .description("meet48 cli project")
        .version(pkg.version)
        .argument("[name]", "project name")
        .option(
            "-t, --template <name>",
            "template source (remote/local)",
            "react",
        )
        .option("--no-install", "skip dependency installation")
        .option("--no-git", "skip git init")
        .option("-y, --yes", "use default values without prompts")
        .option("--cwd <dir>", "output directory", process.cwd())
        .action(createCommand); // 命令解析后，将命令信息以参数形式传入 createCommand

    program.parse(argv);
}
```

## 功能模块拆分

meet48-cli/
├── .github/
│ └── workflows/
│ ├── ci.yml # CI：lint / typecheck / build
│ └── release.yml # 发布：打 tag 后 publish 到 npm
├── .husky/
│ └── pre-commit # Git pre-commit 钩子
├── bin/
│ └── cli.ts # CLI 入口（Node 版本检查 + 启动）
├── src/
│ ├── index.ts # 应用入口，注册并运行 CLI
│ ├── cli/
│ │ ├── program.ts # commander 命令定义
│ │ └── commands/
│ │ └── create.ts # create 子命令实现
│ ├── core/
│ │ ├── download.ts # 模板下载（degit）
│ │ ├── install.ts # 依赖安装（execa）
│ │ └── render.ts # 模板渲染（ejs + fast-glob）
│ ├── types/
│ │ └── index.d.ts # 类型声明
│ └── utils/
│ ├── constants.ts # 常量配置
│ └── logger.ts # 日志输出（picocolors）
├── .gitignore
├── .lintstagedrc.js # lint-staged 配置
├── .prettierignore
├── .prettierrc
├── CHANGELOG.md
├── commitlint.config.js # commit message 规范
├── dependencies-descript.md # 依赖说明文档
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── tsup.config.ts # 构建配置（输出 dist/）
└── UPGRADE.md

## 日志输出优化

```ts
import pc from "picocolors";

export const logger = {
    info: (msg: string) => console.log(pc.cyan("●"), msg),
    success: (msg: string) => console.log(pc.green("✔"), msg),
    warn: (msg: string) => console.warn(pc.yellow("⚠"), msg),
    error: (msg: string) => console.error(pc.red("✖"), msg),
};
```

## 命令行交互的优化

使用ora进行等待任务进行的提示

```ts
import ora from "ora";
import { logger } from "../../utils/logger.ts";

async function download(targetDir: string, template: keyof typeof TEMPLATES) {
    const spinner = ora("Downloading template...").start(); // 开始转圈
    try {
        await downloadTemplate(TEMPLATES[template], targetDir);
        spinner.succeed("Template downloaded"); // 成功提示
    } catch {
        spinner.fail("Download template failed"); // 失败提示
        logger.info("Please check your network or template URL");
    }
}
```
