# web3.js

## 基础 api web3@1.8.1

[具体参考](https://learnblockchain.cn/docs/web3.js/)

### 创建实例

```js
import Web3 from "web3";
// 直连到该网络
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://goerli.infura.io/ws/v3/842250c9043e4eb8ae681a3b361deced"
);

// const web3 = new Web3(window.ethereum); // 直接连接到小狐狸
```

### 创建账号

```ts
interface Result = {
    address: string;
    privateKey: string;
}
/**
 * @param {string} pwd 一个密码字符串
 * @returns {Result}
 */

web3.eth.accounts.create(pwd)
```

### 查询余额

```ts
/**
 * @param {string} address - 地址
 * @returns {Promise<string>} - 返回的单位是wei，1 eth = 10**18 wei
 */

web3.eth.getBalance(address);
```

### 单位转化

```ts
/**
 * 将wei转化为eth
 * @param {string} value
 * @param {string=} unit - 货币类型 'ether'
 * @returns {string}
 */
Web3.utils.fromWei(value, unit);
```

```ts
/**
 * 将wei转化为eth
 * @param {string} value
 * @param {string=} unit - 货币类型 'ether'
 * @returns {string}
 */
Web3.utils.toWei(value, unit);
```

### 获取 nonce

在以太坊中，每个交易都需要包括一个 nonce 值，它是发送者的交易计数。

Nonce 是一个递增的整数，用于确保交易按照正确的顺序被处理，并防止重放攻击

这个方法获取了指定账户的下一个有效 nonce 值，然后可以用这个 nonce 值创建并发送一个新的交易

```ts
/**
 * @param {string} address
 * @returns {Promise<number>}
 */
web3.eth.getTransactionCount(address);
```

### 获取当前 gas 价格

```ts
/**
 * @param {(error: Error, gasPrice: string) => void=}
 * @returns {Promise<string>}
 */
web3.eth.getGasPrice();
```

### 估算燃料

```ts
interface TransactionConfig {
  from?: string | number;
  to?: string;
  value?: number | string | BN;
  gas?: number | string;
  gasPrice?: number | string | BN;
  maxPriorityFeePerGas?: number | string | BN;
  maxFeePerGas?: number | string | BN;
  data?: string;
  nonce?: number;
  chainId?: number;
  common?: Common;
  chain?: string;
  hardfork?: string;
}
/**
 * @param {TransactionConfig} params - 参数集合
 * @param {(error: Error, gasPrice: string) => void=}
 * @returns {Promise<number>}
 */
web3.eth.estimateGas(params);
```

### 使用 ethereumjs-tx 生成序列化签名参数

```ts
import Tx from "ethereumjs-tx"; // @1.3.7
const tx = new Tx(params); // params为交易参数
tx.sign(privateKey);
// 序列化并转换成十六进制
const serializedTx = "0x" + tx.serialize().toString("hex");
```

### 发送签名交易

```ts
/**
 * @param {string} signedTransactionData - 序列化的参数
 * @param {(error: Error, gasPrice: string) => void=}
 * @returns {PromiEvent<TransactionReceipt>}
 */
const trans = web3.eth.sendSignedTransaction(serializedTx);
trans.on("transactionHash", (txId) => {
  // 在以太坊区块链上，交易是发生在区块链上的状态变化。当你发送一笔交易时，这笔交易会被广播到网络中，并在被矿工打包进区块后，最终被确认。
  // 在这个过程中，你可以使用 web3 库的 transactionHash 事件来监听交易的哈希。
  // 你可以在交易被广播后立即获取到这个交易的哈希，而不需要等到交易最终被确认
  // 这对于以下情况非常有用：
  // 1. 实时通知： 你可以在交易被广播后立即得到通知，而不必等待交易被确认。这对于实时应用或用户体验非常重要。
  // 2. 监控交易进度： 你可以使用交易哈希来跟踪交易的进度，知道它是否已经被打包进区块，并可能在多少个区块后得到确认。
  console.log("交易ID:", txId);
});
trans.on("receipt", (data) => {
  // 节点确认事件
  console.log("第一个节点确认:", data);
});
trans.on("confirmation", (data) => {
  // 节点确认事件
  console.log(`第${data}个节点确认`);
});
trans.on("error", (error) => {
  console.log("错误：", error.code, error.message);
});
```

## 调用合约

步骤：

1. 获取合约地址和 abi(abi 会在合约编译后自动生成 json 文件)
2. 生成合约对象
3. 使用 call 或 send 方法执行合约方法

```js
import Web3 from "web3";
import mtcJSON from "./contracts/MyToken.json";
// 如果报错就用 window.ethereum
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://goerli.infura.io/ws/v3/842250c9043e4eb8ae681a3b361deced"
);
const contractAddress = "0x1733dF2bc1Db9C94A816b07F2FF5A2F1B36C19eb";
const mtcContract = new web3.eth.Contract(mtcJSON.abi, contractAddress);

const currentAccount = "0xd07a8307e6b1bc783e286697e7e0b4d7a54893d9";

const toAddress = "0xaf6f447b9b5083f1eb3458a0ac0469120a511dd9";

async function getAccountInfo() {
  const res = await Promise.all([
    mtcContract.methods.name().call(),
    mtcContract.methods.symbol().call(),
    mtcContract.methods.totalSupply().call(),
    mtcContract.methods.balanceOf(currentAccount).call(),
    mtcContract.methods.max().call(), // max是一个可见性为public的状态变量
  ]);
  userInfo.name = res[0];
  userInfo.symbol = res[1];
  userInfo.totalSupply = web3.utils.fromWei(res[2], "ether");
  userInfo.balance = web3.utils.fromWei(res[3], "ether");
  const max = res[4];
}

async function transfer() {
  const value = web3.utils.toWei(`${0.001}`, "ether");
  try {
    const res = await mtcContract.methods
      .transfer(toAddress, value)
      .send({ from: currentAccount }); // from 也就是 msg.sender
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
```

### 合约的事件监听

```js
contract.events
  .MyEvent() // MyEvent 是和solidity中名称对应的事件名
  .on("error", (error) => {
    console.log("error", error);
  })
  .on("data", (data) => {
    console.log("data", data);
  });
```
