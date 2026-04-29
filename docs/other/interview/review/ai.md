# AI

## claude

/plugins - 插件 - 可通过添加 github 地址加载插件
/init - 生成`CLAUDE.md`，每次对话 claude 会梳理项目，有了 CLAUDE.md 文件它就会直接读这个文件里的项目介绍，避免每次都扫描项目
@ - 可以选择文件或文件夹，有针对性的询问 claude
/rewind - 撤销之前修改的操作
/clear - 清除上下文
/compact - 压缩上文，减少后续提问时，读取的上下文大小

### 一些插件

superpowers

## skills

Claude Code 的可复用指令模块，定义在 `.claude/skills/` 目录下或通过插件提供。每个 skill 是独立可执行文件（Python、shell 等），通过 `/skill-name` 或自然语言匹配调用。Skill 可以读取上下文、执行命令、修改文件，本质上是可编程的自动化工作流。

### 基础模板

skill 脚本 (`.claude/skills/skill-name.py`)：

```python
#!/usr/bin/env python3
"""
name: skill-name
description: 简短描述这个 skill 的功能
"""
import sys

def main():
    # 读取输入（如果有）
    # 执行核心逻辑
    result = "skill 执行结果"
    print(result)

if __name__ == "__main__":
    main()
```

注册文件 (`.claude/skills/skill-name.json`)：

```json
{
  "name": "skill-name",
  "description": "简短描述",
  "command": "python3 .claude/skills/skill-name.py"
}
```
