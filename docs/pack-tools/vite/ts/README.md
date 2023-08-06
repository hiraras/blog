# vite & ts

vite 天生支持 ts，但空项目只会有些提示，约束的力度很小，为了凸显 ts，需要一些配置将其能够影响到开发（直接报错、打包失败等）

## vite-plugin-checker 强效验

这里使用 vite-plugin-checker 进行检查，它依赖于 typescript 所以还需要安装 typescript 包

```js
import Checker from "vite-plugin-checker";

{
  plugins: [
    // ...
    Checker({ typescript: true }),
  ];
}
```

如果它还检查了 node_modules 包中的 ts，可以配置 tsconfig.json

```json
{
  "compilerOptions": {
    "skipLibCheck": true // 跳过node_modules目录的检查
  }
}
```

## 关于 import.meta

import.meta 的类型默认没有 env 参数，所以引入 ts 后需要对其添加类型定义

在根目录添加 vite 的声明文件 vite-env.d.ts，在里面导入 vite/client，这样 env 就能被找到了

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
```

这时还有一个问题，env 的类型只有一些 vite 提供的环境变量，自定义的环境变量还是没有提示，可以在这个文件中添加一个 interface ImportMetaEnv 来声明，这样就有了

```ts
// vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  BASENAME: string;
}
```

**注意：** 引入 ts 后，ts 默认会将代码编译为 es3，导致 import 报错，所以需要将配置改为 esnext

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```
