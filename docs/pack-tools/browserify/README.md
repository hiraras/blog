# browserify

[参考链接](https://browserify.org/)

一些 npm 包没有浏览器版本（只能在 node 端使用），或者说只能用 require 方法导入，但是项目使用的 import，此时无法使用了。有时候还找不到替代工具包的时候就可以使用 browserify 工具进行转化，让浏览器能够使用。

## 示例

node-rsa (一个 rsa 加密有关的库)，可以实现公钥加密数据，和公钥解密数据

1. 全局安装 browserify

```
npm install -g browserify
```

2. 编写好需要使用的脚本

```js
const NodeRSA = require("node-rsa");

const rsaDecrypt = (publicKey, base64Data) => {
  const publicRSA = new NodeRSA(`
-----BEGIN PUBLIC KEY-----
${publicKey}
-----END PUBLIC KEY-----`);
  const decrypted = publicRSA.decryptPublic(base64Data, "utf8");
  return decrypted;
};

const rsaEncrypt = (publicKey, data) => {
  const publicRSA = new NodeRSA(
    `
-----BEGIN PUBLIC KEY-----
${publicKey}
-----END PUBLIC KEY-----`,
    { encryptionScheme: "pkcs1" }
  );
  const encrypted = publicRSA.encrypt(data, "base64");
  return encrypted;
};

window.__rsaDecrypt = rsaDecrypt;
window.__rsaEncrypt = rsaEncrypt;
```

3. 将编写好的脚本进行编辑，转化为实际使用的脚本文件

**注意**：使用 browserify 并不是将 require 导入的包变成可以使用 import 导入，而是将包转化为一个 js 脚本，后续还需要在 index.html 中引入该脚本，如果需要用到一些方法，则需要想办法将其暴露到可以使用的环境

```
browserify ./src/utils/rsa.js -o public/js/rsa.js
```

4. 引入该脚本

```html
<head>
  <script src="/js/rsa.js" async></script>
</head>
```
