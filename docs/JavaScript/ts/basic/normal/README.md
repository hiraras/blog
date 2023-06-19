## typescript 常用操作

### 为 window 对象设置属性

1. 旧的版本的 ts

- 新建 global.d.ts 文件，并加入如下代码

**注意**：如果没有`export {}`，可能会报 `Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)` 这个错误，因为如果只有 declare 这个文件会被当做一个全局的 ts 脚本，而不是模块，加上 export 就能让它以模块解析。而在 ts 中，能够类型扩展的只有 interface、namespace、module，脚本是不可以的，所以就会报错

```js
export {};
declare global {
  interface Window {
   	foo: string;
  }
}
```

- 将 global.d.ts 加入到 ts 文件列表中(tsconfig.json)

```json
{
  "include": ["global.d.ts"]
}
```

2. 新版的 ts

- 新建 global.d.ts 文件，并加入如下代码

```js
interface Window {
  gtag: (event: string, type: string, params: any) => void;
}
```

- 将 global.d.ts 加入到 ts 文件列表中(tsconfig.json)

```json
{
  "include": ["global.d.ts"]
}
```
