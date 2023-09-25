# web3.js wallet-api

## 分层钱包相关 api

### 生成助记词

```ts
import { generateMnemonic } from "bip39";
/**
 * @returns {string} - 空格隔开的若干个单词，这里是12个
 */
const mnemonic = generateMnemonic();
```

### 使用助记词生成钱包对象

```ts
import { hdkey } from "ethereumjs-wallet";
// 获取种子
const seed = await mnemonicToSeed(mnemonic);
// 生成钱包
const hdWallet = hdkey.fromMasterSeed(seed);
```

### 使用钱包对象生成多个账号

```ts
// 生成密钥对，需要一个path
/**
 * 在bip32路径中定义以下5个级别
 * m/purpose'/coin_type'/account'/change/address_index
 * purpose：在bip43之后建议将常数设置为44'，表示根据bip44规范使用该节点的子树
 * coin_type：币种，代表一个主节点（种子）可用于无限数量的独立加密币，如比特币，LiteCoin或Namecoin。此级别为每个加密币创建一个单独的子树，避免重用已经在其他链上存在的地址。
 * 开发人员可以为他们的项目注册未使用的号码
 * account：账户，此级别为了设置独立的用户身份可以将所有币种放在一个账户中，从0开始顺序递增
 * change：常量0用于外部链，常量1用于内部链，外部链用于钱包在外部接收和付款。内部链用于在钱包外部不可见的地址，如返回交易变更
 * address_index:地址索引，按顺序递增的方式从索引0开始编号
 */
const keypair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);
// 获取钱包<账户>对象
const wallet = keypair.getWallet();
// 获取钱包账户地址
const lowerCaseAddress = wallet.getAddressString();
// 获取钱包账户效验地址
const checkAddress = wallet.getChecksumAddressString();
/**
 * getAddressString 函数返回以太坊地址的表示，返回的全是小写，通常用于一般的地址显示和传输
 * getChecksumAddressString 函数返回以太坊地址的的大小写敏感格式，这是为了防止在某些情况下地址被错误解读
 * 一般来说，当需要在用户界面上显示以太坊地址时，使用 getChecksumAddressString 可以提供更好的可读性，但在底层数据处理和传输时 getAddressString 通常足够
 */
// 获取私钥
const pKey = wallet.getPrivateKey().toString("hex");
```

### 生成 keyStore

#### 使用 web3 api 生成

```ts
interface EncryptedKeystoreV3Json {
  version: number;
  id: string;
  address: string;
  crypto: {
    ciphertext: string;
    cipherparams: { iv: string };
    cipher: string;
    kdf: string;
    kdfparams: {
      dklen: number;
      salt: string;
      n: number;
      r: number;
      p: number;
    };
    mac: string;
  };
}
/**
 * @param {string} privateKey
 * @param {string} pwd
 * @returns {EncryptedKeystoreV3Json}
 */
web3.eth.accounts.encrypt(privateKey, pwd);
```

#### 使用钱包 api 生成

```ts
const seed = await mnemonicToSeed(mnemonic);
const hdWallet = hdkey.fromMasterSeed(seed);
const keypair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);
const wallet = keypair.getWallet();

interface V3Params {
  kdf: string;
  cipher: string;
  salt: string | Buffer;
  iv: string | Buffer;
  uuid: string | Buffer;
  dklen: number;
  c: number;
  n: number;
  r: number;
  p: number;
}
interface V3Keystore {
  crypto: {
    cipher: string;
    cipherparams: {
      iv: string;
    };
    ciphertext: string;
    kdf: string;
    kdfparams: KDFParamsOut;
    mac: string;
  };
  id: string;
  version: number;
}
/**
 * @param {string} pwd
 * @param {Partial<V3Params>=} opts
 * @returns {V3Keystore}
 */
keyStore = await wallet.toV3(pwd);
```

### 通过 keystore 和密码反推出地址和私钥

#### 使用 web3 api

```ts
interface EncryptedKeystoreV3Json {
  version: number;
  id: string;
  address: string;
  crypto: {
    ciphertext: string;
    cipherparams: { iv: string };
    cipher: string;
    kdf: string;
    kdfparams: {
      dklen: number;
      salt: string;
      n: number;
      r: number;
      p: number;
    };
    mac: string;
  };
}
interface Account {
  privateKey: string;
  address: string;
}
/**
 * @param {EncryptedKeystoreV3Json} keystore
 * @param {string} pwd
 * @returns {Account}
 */
web3.eth.accounts.decrypt(keyStore, pwd);
```

#### 使用钱包 api

```ts
interface V3Keystore {
  crypto: {
    cipher: string;
    cipherparams: {
      iv: string;
    };
    ciphertext: string;
    kdf: string;
    kdfparams: KDFParamsOut;
    mac: string;
  };
  id: string;
  version: number;
}

import ethwallet from "ethereumjs-wallet";
/**
 * @param {string | V3Keystore} input
 * @param {string} pwd
 * @param {boolean=} nonStrict
 * @returns {Promise<ethwallet>} - 钱包实例
 */
const wallet = await ethwallet.fromV3(keyStore, pwd);
wallet.getAddress().toString("hex"); // 获取地址
wallet.getPrivateKey().toString("hex"); // 获取私钥
```

### 通过私钥获得地址

先获得钱包对象，再拿需要的信息

```ts
import ethwallet from "ethereumjs-wallet";
const buffer = Buffer(privateKey, "hex");
const wallet = ethwallet.fromPrivateKey(buffer);
resultAddress = wallet.getAddressString();
```

## 小狐狸钱包 api

### 获取小狐狸钱包已连接的账号

```js
const accounts = await window.ethereum.send("eth_requestAccounts");
```

```js
// 功能方面和 send("eth_requestAccounts") 一致
const accounts = await window.ethereum.enable();
```

### 用户当前选择的以太坊地址

```js
ethereum.selectedAddress;
```

### 用户当前连接的以太坊网络的版本号

```js
ethereum.networkVersion;
```

### 检查是否用的 MetaMask 钱包

```js
ethereum.isMetaMask; // boolean
```

### 监听用户切换钱包账户的变化

```js
ethereum.on("accountsChanged", callback);
```
