## 配置

- npm 包内如果有图片，则引用时使用相对路径，如果使用绝对路径下载到其他工程后，就无法找到了。

- 可以创建.npmrc 文件在项目内，在里边执行某些包名的下载来源，例如：
  @ljmp:registry=http://npm.registry.software.dc
  指定@ljmp 开头的包从这个链接的仓库里下载。

- 通过下面命令下载 cnpm，就可以使用 cnpm 安装包
  npm install cnpm -g --registry=https://registry.nlark.com

- --no-git-tag-version
  更新 package.json 内 version 的版本

```
npm --no-git-tag-version version major 修改第一位版本号
npm --no-git-tag-version version minor 修改第二位版本号
npm --no-git-tag-version version patch 修改第三位版本号
```

一些 script：

```json
"scripts": {
    "start": "dumi dev",
    "docs:build": "dumi build",
    "docs:deploy": "gh-pages -d docs-dist",
    "build": "father-build",
    "deploy": "npm run docs:build && npm run docs:deploy",
    "prettier": "prettier --write \"**/*.{js,jsx,tsx,ts,less,md,json}\"",
    "test": "umi-test",
    "test:coverage": "umi-test --coverage",
    "prepublishOnly": "npm run build",
    "x": "npm --no-git-tag-version version major",
    "y": "npm --no-git-tag-version version minor",
    "z": "npm --no-git-tag-version version patch",
    "pub": "npm publish --access=public --registry http://npm.registry.software.dc",
    "pub:x": "npm run x && npm run pub",
    "pub:y": "npm run y && npm run pub",
    "pub:z": "npm run z && npm run pub"
},
```
