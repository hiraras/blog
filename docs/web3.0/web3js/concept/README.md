# web3.js - 概念

## 分层钱包

用于管理和派生多个加密货币账户的钱包体系结构

当你创建一个助记词并生成一个钱包账户，后续创建的所有 web3 账号都与这个助记词绑定并保存在钱包中，助记词和账号起到了管理的作用

分层钱包允许你使用单个助记词和种子来管理多个加密货币账户，而不需要为每个账户单独备份私钥。这使得钱包的管理更加方便和安全。分层钱包的标准规范如 BIP-32、BIP-39 和 BIP-44 等已经被广泛采用，许多加密货币钱包和服务都支持这些规范，以便用户更轻松地管理多个加密货币账户

## 助记词

助记词是一个随机生成的单词序列，通常由 12、24 或更多单词组成。它是一个人类友好的方式来表示一个复杂的随机数种子，可以用于生成加密货币的私钥

## 种子

助记词被用作输入，通过一种确定性的算法生成一个种子。种子是一个 128 位或更多位的随机数，它是从助记词中派生的。种子是生成所有加密货币私钥的起点

## 主私钥

从种子派生出的主私钥是一个根私钥，它可以用于生成所有加密货币账户的私钥。通常，一个分层钱包只有一个主私钥

## 分层结构

分层钱包使用分层结构（hierarchical structure），这意味着可以从主私钥派生出一系列子私钥和相应的公钥。每个子私钥都可以用于创建一个唯一的加密货币账户

## 账户派生路径

通过指定派生路径，可以在分层钱包中创建不同的账户。例如，可以为比特币创建一个派生路径，为以太坊创建另一个派生路径，每个派生路径都有自己的一系列子私钥和账户

## 地址生成

每个子私钥可以用于生成一个唯一的加密货币地址，该地址用于接收和发送加密货币资金
