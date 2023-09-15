# web3.0 solidity

是一个全新的语言，可以用来创建、编译、发布 web3.0 的合约

开发工具：

[Remix](https://remix.ethereum.org/)

合约文件以大驼峰文件名命名，.sol 为扩展名，有一些规范

1. 扩展名为 .sol
2. 文件名采用大驼峰命名法
3. 文件名和合约名保持一致

```solidity
// SPDX-License-Identifier: MIT
// 或
// SPDX-License-Identifier: GPL-3.0
```

上述代码，是 solidity 源代码中的一个注释，用于指定智能合约的许可证信息。通常位于代码的开头，目的是明确合约的授权和许可条件，以确保开发者和用户知道如何合法地使用合约

MIT 许可证是一种开源软件许可证，允许任何人自由使用、修改和分发合约的代码，只要他们保留原始许可证文本并提供相关许可声明

```solidity
pragma solidity ^0.8.7;
```

上述代码指定了 solidity 编译器的版本要求，^符号和 npm 版本类似

还可以指定版本范围

```
pragma solidity >=0.8.0 <0.9.0;
```

**在 solidity 中每句代码都需要分号结尾**

## 定义合约（有点类似定义类）

```solidity
contract HelloWorld {
    // 状态变量
    string public name;

    constructor() {
        name = "emina";
    }

    function sayName() public view returns(string memory) {
        return name;
    }

    function changeName(string memory _name) public {
        name = _name;
    }
}
```

view: 用于声明一个函数是一个“查看函数”或“只读函数”。查看函数是指那些不修改区块链状态的函数，他们只是读取数据并返回结果

作用和好处：

1. 状态不变性： view 关键词确保函数在执行期间不会修改合约的状态。这意味着在调用查看函数后，合约的状态（包括成员变量）不会被更改，从而保持了合约的不变性。
2. 无需支付 gas 费用： 由于查看函数不修改状态，它们不需要支付 gas 费用。因此，调用查看函数不会触发交易，也不会消耗以太币。
3. 本地执行： 查看函数可以在本地执行，而不需要向以太坊网络发出交易请求。这使得查看函数在客户端应用程序中非常有用，因为它们可以立即返回结果，而不需要等待交易确认。
4. 与其他合约交互： 由于查看函数不会修改状态，它们可以安全地与其他合约进行交互，而不会引发状态变化。

pure: 用于表示函数是纯函数，通常用于执行数学运算或将输入参数转换为某种形式，而不涉及区块链状态

纯函数有以下特点

1. 这个函数不会读取合约的状态变量，也不会修改合约的状态，它仅依赖于函数参数，返回一个计算结果
2. 纯函数不能访问 this 和 msg 对象，也不能发送交易或调用其他合约

pure 和 view 的主要区别：

1. pure 用于纯函数，不读取状态、也不修改状态，通常用于执行计算
2. view 用于视图函数，可以读取状态但不修改状态，通常用于查询数据

全局变量

| 名称       | 功能                                       |
| ---------- | ------------------------------------------ |
| msg.sender | 包含了调用合约的交易发起者的 Ethereum 地址 |

可见性修饰符，声明状态变量如果不加修饰符，默认为 internal

1. public: 所有合约与账号都可以调用
2. private: 只有在定义该函数的合约可以调用
3. internal: 当前合约或者继承该合约的，类似 java 里面的 protected 关键字
4. external: 只有其他合约或者账号可以调用，定义该函数的合约不能调用，除非使用 this

## 函数

- 可以定义在合约内也可以在合约外
- 可以重载
- 构造函数

```solidity
// 重载
function changeGender(uint value) external {
    require(value == 0 || value == 1, unicode"value 必须为0或1");
    if (value == 0) {
        state.gender = "female";
    } else {
        state.gender = "male";
    }
}

function changeGender(string calldata value) external {
    state.gender = value;
}
```

```solidity
constructor(uint _x) {
    x = _x;
}
// 如果想要把合约发布到其他用户地址上，可以加 payable 关键字，然后部署那一块就可以选择 <at Address>
constructor() payable {

}
```

## 错误

assert(bool condition): 用于在合约执行期间检查条件是否满足，如果条件不满足，则终止合约的执行，并**回滚**状态。确保代码在遇到异常情况是停止执行，从而防止不一致的状态或意外行为

需要注意的是，因为触发 assert 将导致合约执行失败，并且会消耗所有的 gas。因此，它通常用于检查不应该发生的情况，例如编程错误或约束条件的违反。如果你希望处理一些正常的错误情况并继续执行合约，可以考虑使用 require 和 revert

require(bool condition, errorMessage: string): 也是用于检查条件是否满足，第二个参数还能对错误进行描述。
如果条件不满足，则终止合约的执行，并**回滚**状态。第二个参数要想显示中文提示，需要添加 unicode 标识符

```solidity
require(1 > 0, unicode"发生了错误：xxxxx");
```

require 和 assert 的区别

1. require 通常用于检查函数的前提条件或用户提供的输入是否有效。它是一种通用的错误检查机制，用于确保合约在执行期间的输入和状态满足特定的条件;assert 通常用于检测合约内部的错误或不应该发生的情况。它用于捕获程序中的不一致性或错误状态。如果 assert 失败，这通常意味着存在合约编程错误
2. require 失败时，消耗的 gas 会退还给调用者，因为它是一种合理的错误检查;assert 失败时，消耗的 gas 不会退还给调用者，因为它通常表示合约内部的严重错误
3. require 不会导致合约的其他函数停止执行，而 assert 会停止当前合约执行的一切操作。

由于这些区别，通常建议使用 require 来执行输入验证和前提条件检查，以及确保合约在接收到无效输入时能够正常处理。而 assert 则更适合用于检测内部错误和不应该发生的情况，以提高合约的稳定性和安全性。

revert 也是用来处理错误的，有两种使用方式

1. 当做函数来调用

```solidity
revert("xxxxxxxx");
```

2. 抛出自定义错误

```solidity
error MyError(string message)

if (condition) {
    revert MyError("xxxxxxx")
}
```

## 事件

事件是能方便地调用以太坊虚拟机日志功能的接口

solidity 默认没有 console.log 或者 print 类似的事件系统，但是我们可以通过注册事件查看对应的 log 日志

支持重载形式，定义和调用有些类似 eventBus 模式

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract EventDemo {
    event Log(uint);
    event Log(uint, string);
    event Log(address);

    function output() public {
        emit Log(2000);
        emit Log(100, "hello world");
        emit Log(msg.sender);
    }
}

```

## 变量的数据位置

在合约中声明和使用的变量都有一个数据位置，指明变量值应该存储在哪里，合约变量的数据位置将会影响 Gas 消耗量

一共有 4 中类型的数据位置

1. Storage
2. Memory
3. Calldata
4. Stack

### Storage

该存储位置存储永久数据（合约的状态变量），这意味着该数据可以被合约中的所有函数访问。可以把它视为计算机的硬盘数据

保存在存储区（Storage）中的变量，以智能合约的状态存储，并且在函数调用之间保持持久性。与其他数据位置相比，存储区数据位置的成本较高

- 存储中的数据时永久存在的。存储是一个 key/value 库
- 存储中的数据写入区块链，因此会修改状态，这也是存储使用成本高的原因。
- 占用一个 256 位的槽需要消耗 20000gas
- 修改一个已经使用的存储槽的值，需要消耗 5000gas
- 当清零一个存储槽时，会返回一定数量的 gas
- 存储按 256 位的槽分配，即便没有完全使用一个槽，也需要支付其开销

### Memory

内存位置是临时数据，比存储位置便宜，它只能在函数中访问

通常，内存数据用于保存临时变量，以便在函数执行期间进行计算。一旦函数执行完毕，它的内容就会被丢弃，你可以把它想象成每个单独函数的内存

- 内存是一个字节数组，槽大小为 256 位
- 数据仅在函数执行期间存在，执行完毕后就被销毁
- 读或写一个内存槽都会消耗 3gas
- 为了避免矿工工作量过大，22 个操作之后的单操作成本会上涨

### Calldata

calldata 一般作为 external 或者 public 函数的参数使用

Calldata 是一个不可修改的、非持久的区域，用于存储函数参数，其行为主要类似于内存。

calldata 有以下特征

- 它只能用于函数声明参数（不是函数逻辑）
- 它是不可变的（不能覆盖和更改）
- 它是临时的（该值在事物完成后会销毁）
- 它是最便宜的存储位置
- 构造函数中的 string 不能使用 calldata

### Stack

stack 保存很小的局部变量，免费使用，但是数量有限

值类型的局部变量存储在内存中。但是，对于引用类型，需要显式的指定数据位置

## 条件语句与循环语句

与 js 基本相同

unchecked {}: 用于禁用算数操作的内置溢出和下溢检查。默认情况下，Solidity 会执行整数溢出和下溢的检查，以防止智能合约中的意外行为或漏洞。然而，有些情况下，您可能希望在确信不会发生溢出或下溢时显式禁用这些检查，或者希望优化燃气使用。

在使用 unchecked 时要谨慎，并且仅当您确信操作不会导致溢出或下溢时才使用它。不正确处理溢出和下溢可能会引入漏洞到您的智能合约中。此外，最好记录为什么使用 unchecked 以及如何确保不会发生溢出和下溢的原因。

上溢： 如果您有一个 uint8 类型，它的最大值是 255，如果您对其进行加法操作并且结果超过 255，那么它将从 0 开始重新计数。
