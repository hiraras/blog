## SQL 注入

### 描述

黑客在请求中拼接 sql 脚本（如：输入框内输入 sql 脚本），如果后端未对输入框的内容进行转义操作，会让黑客的 sql 脚本执行，可能对服务端造成巨大破坏或数据泄露

### 防御方式

1. 对系统使用员进行管理分级：能防止一般用户执行一些非常危险操作，例如 drop table，当一般用户被攻击了也不会成功
2. 参数传值：禁止将变量直接写入到 SQL 语句中，必须设置相应的参数来传递相应变量。
3. 基础过滤：对用户提交内容的单引号、双引号、冒号等字符进行转换或过滤，使黑客的攻击失败
