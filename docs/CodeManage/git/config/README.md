## git 配置

### 生成 ssh key

执行如下命令生成 ssh key，回车后会询问生成路径、是否需要密码，可以直接回车跳过

```
ssh-keygen -t rsa -C "你的邮箱"
```

生成完成后，可以在我的文档的.ssh 中看到生成的文件

### 配置 vscode 的命令行为 git bash

1. 打开 setting.json 文件

使用 ctrl + shift + p 打开搜索面板，然后输入 open setting，选择 user settings（json）

2. 在文件中输入配置

```json
{
  "terminal.integrated.profiles.windows": {
    "bash": {
      "path": "D:\\GIT\\bash.exe",
      "args": ["-l", "-i"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "bash",
  "terminal.external.windowsExec": "D:\\GIT\\bash.exe"
}
```
