## vscode snippet

### 创建用户 snippet

1. 设置 -> User Snippets

2. 输入文件名创建 vscode 的 snippet

### snippet 实例：

```JSON
{
    // Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
    // description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
    // is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
    // used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
    // Placeholders with the same ids are connected.
    // Example:
    "Print to console": {
        "scope": "javascript,typescript", // 目标语言，如果不填就是所有
        "prefix": "lg",
        "body": ["console.log('$1');", "$2"],
        "description": "Log output to console"
    },
    "import ActionType": {
        "prefix": "imat",
        "body": ["import type { ActionType } from '@ant-design/pro-table';"]
    },
    "import ProColumns": {
        "prefix": "impc",
        "body": ["import type { ProColumns } from '@ant-design/pro-table';"]
    },
    "import template": {
        "prefix": "imf",
        "body": ["import {$1} from '$0';"]
    }
}

```
