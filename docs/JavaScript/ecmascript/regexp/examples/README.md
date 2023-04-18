## 常用正则

```JavaScript
// 去除 'name'
/(^(?!nam).+|^nam(?!e$))/
// 手机号加密
'17812345678'.replace(/(?<=\d{3})\d{4}/, ($1) => ''.padEnd($1.length,'*'))
```
