## Prettier 配置

如果 perttier 配置好了，format on save 也打开了，但是保存的时候没有自动格式化，可以尝试一下：
右键文件-点击“格式化文档”或者 SHIFT+ALT+F 后，会提示选择默认格式化程序，选一下 prettier

### 配置 1

```JavaScript
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
};
 
```

配合 vscode 的配置   .vscode/settings.json

```JSON
{
    "files.eol": "",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

### 配置 2

```JSON
{
    "editor.lineNumbers": "on", //开启行数提示
    "editor.quickSuggestions": { //开启自动显示建议
        "other": true,
        "comments": true,
        "strings": true
    },
    "prettier.useTabs": true,//使用制表符缩进
    "editor.tabSize": 2, //制表符符号eslint
    "editor.formatOnSave": true, //每次保存自动格式化
    "prettier.semi": true, //去掉代码结尾的分号
    "prettier.singleQuote": true, //使用单引号替代双引号
    "prettier.trailingComma": "none", //去除对象最末尾元素跟随的逗号
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
    "vetur.format.defaultFormatter.html": "js-beautify-html", //格式化.vue中html
    "vetur.format.defaultFormatter.js": "vscode-typescript", //让vue中的js按编辑器自带的ts格式进行格式化
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.run": "onSave",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "prettier.printWidth": 200,//指定代码长度，超出换行
    "prettier.requireConfig": true,//需要prettier.requireConfig格式化
    "prettier.useEditorConfig": false,
    "eslint.validate": [
    //开启对.vue文件中错误的检查
         "javascript",
        "javascriptreact",
         {
            "language": "html",
             "autoFix": true
         },
         {
             "language": "vue",
             "autoFix": true
         }
     ],
    "terminal.integrated.rendererType": "dom",
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}

```
