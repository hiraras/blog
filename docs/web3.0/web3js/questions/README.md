# web3js 一些问题

## 直连的条件下，有些网络不支持 eth_sendTransaction 方法导致转账/投票等操作失败

两种解决方法：

- 通过连接 metamask 等钱包工具，借助钱包发送交易（报上述错误的原因是因为没有私钥认证，小狐狸中保存了用户私钥所以可以成功）
- 使用 web3 发送带用户签名的交易

```js
// 直连小狐狸，小狐狸会在 window 上添加 ethereum 字段，所以也要判断是否有这个字段，以确认用户是否安装小狐狸
import Web3 from "web3";
const web3 = new Web3(window.ethereum);
```

```js
// 发送签名的交易
import Web3 from "web3";
import Tx from "ethereumjs-tx"; // @1.3.7

const originAddress = "0xaF6F447b9b5083F1Eb3458A0ac0469120A511dD9";
const targetAddress = "0x36D9Cc1858F1328869BF33D44473cf03c9B1c6dF";
const amount = 0.1; // eth
const originPrivateKey =
  "0xf09b9d09b097b694d764f3a5fa511899896a486c63096811ee212f0cc84a7c57"; // 私钥

const getTransferParams = async () => {
  // 获取账户交易次数，在以太坊中，每个交易都需要包括一个nonce值，它是发送者的交易计数。
  // Nonce 是一个递增的整数，用于确保交易按照正确的顺序被处理，并防止重放攻击
  // 这个方法获取了指定账户的下一个有效nonce值，然后可以用这个nonce值创建并发送一个新的交易
  const nonce = await web3.eth.getTransactionCount(originAddress);
  // 获取当前以太坊网络上的gas价格，在以太坊区块链中，每个交易都需要支付一定数量的gas作为手续费，单位为wei
  const price = await web3.eth.getGasPrice();
  gasPrice.value = web3.utils.fromWei(price);
  // 转账金额，以 wei 为单位
  const wei = web3.utils.toWei(amount);
  const params = {
    from: originAddress,
    to: targetAddress,
    nonce,
    gasPrice: price,
    value: wei,
    data: "0x0000",
  };
  // gas 估算
  const gas = await web3.eth.estimateGas(params);
  return {
    ...params,
    gas,
  };
};

// 转账
async function transfer() {
  // 1. 获取转账参数
  const params = await getTransferParams();
  if (!params) {
    return;
  }
  // 2. 生成 serializedTx
  // 转化私钥
  const privateKey = Buffer(originPrivateKey.slice(2), "hex");
  // 使用 ethereumjs-tx 实现私钥假面
  const tx = new Tx(params);
  tx.sign(privateKey);
  // 序列化并转换成十六进制
  const serializedTx = "0x" + tx.serialize().toString("hex");
  // 3. 通过 sendSignedTransaction 方法开始转账
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
}
```
