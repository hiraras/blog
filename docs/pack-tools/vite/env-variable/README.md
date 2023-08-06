# vite 环境变量

## node 环境下

内部使用 dotenv 这个第三方库，它会自动读取.env 文件，并解析这个文件中的环境变量，并将其注入到 process 对象下(但是 vite 考虑按到和**其他配置**的一些冲突问题，它不会直接注入到 process 对象下)

**其他配置**涉及到 vite.config.js 中的一些配置，这些配置可能在 defineConfig 返回最终配置前就被需要读取

- root
- envDir: 用来配置当前环境变量的文件地址

vite 提供了补偿措施：可以调用 vite 的 loadEnv 来手动确认 env 文件

```js
import { loadEnv } from "vite";
export default defineConfig(({ mode }) => {
  // process.cwd() 返回当前node进程的工作目录
  // 第三个参数是注入的变量名前缀，默认是"VITE_"，即变量名为VITE_开头的变量会被注入
  // 可以传入一个数组，以匹配多种变量名
  const env = loadEnv(mode, process.cwd(), ["BASE_", "VITE_"]);
  return {};
});
```

**mode 的值**

- 执行`vite`命令，启动服务，此时为 development，会去读取 .env.development 中的环境变量
- 执行`vite build`命令，打包项目，此时为 production，会去读取 .env.production 中的环境变量
- 执行`vite --mode loc`命令，启动服务，此时为 loc，会去读取 .env.loc 中的环境变量

当调用 loadEnv 时，会做以下几件事：

1. 直接找到 .env 文件，并解析其中的环境变量放进一个对象里
2. 将 mode 的值拼接，得到对应的 .env.{mode} 文件名，然后根据提供的目录和这个文件名读取文件并解析，并放进一个对象
3. 合并两个对象，得到最终的 env 对象

## 客户端环境下

vite 会将对应的环境变量注入到 `import.meta.env` 中

注意：注入到客户端时 vite 会做一个拦截，它只会将 `VITE_` 开头的环境变量注入，可以配置 config 的 envPrefix，来控制注入多种名称的环境变量

```js
import { defineConfig } from "vite";
export default defineConfig({
  envPrefix: ["VITE_", "BASE_"], // VITE_ 和 BASE_ 开头的环境变量会被注入到 import.meta.env
});
```
