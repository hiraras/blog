# solidity-函数

逻辑的封装

## 函数的声明

- 使用 function 关键字定义
- 参数名前需要定义参数类型
- 括号后需要添加可见性标识符
- 如果有读取到状态变量，则需要使用 view 修饰符；如果没有涉及到任何状态变量，则需要使用 pure 修饰符；如果有修改到状态变量（即便是对象的某个键值）就不需要加
- 如果有 return 内容，需要使用 returns() 声明，如果 returns 有多个返回，则需要 return 一个元组
- 可以定义在合约内也可以在合约外
- 可以重载
- 构造函数

### view 和 pure 标识符

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

### 函数的可见性

1. public: 所有合约与账号都可以调用
2. private: 只有在定义该函数的合约可以调用
3. internal: 当前合约或者继承该合约的，类似 java 里面的 protected 关键字
4. external: 只有其他合约或者账号可以调用，定义该函数的合约不能调用，除非使用 this

### 重载

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

### 父合约函数重写

#### override 关键字

```solidity
function _msgSender() internal view override returns(address) {
    return msg.sender;
}
```

#### virtual 关键字

添加 virtual 关键字的函数会变为虚拟函数，虚拟函数有以下特点和作用

1. 多态性
2. 扩展和修改
3. 接口实现

```solidity
// 父合约的函数需要添加 virtual 将需要被重写的函数设置为虚拟函数
function _msgSender() internal view virtual returns(address) {
    return msg.sender;
}
```

## 构造函数

```solidity
constructor(uint _x) {
    x = _x;
}
// 构造函数后添加 payable 标识符，表示允许在智能合约部署时接收以太币，这对于合约的初始化和资金分配非常有用
constructor() payable {

}
```

## 一些示例

### stack 类型变量的最大个数

```solidity
function count() external pure returns(uint) {
    // 这些变量会存在stack中，但是再多声明一个a9就会报错了，因为stack的数量是有限的
    uint a1 = 1;
    uint a2 = 1;
    uint a3 = 1;
    uint a4 = 1;
    uint a5 = 1;
    uint a6 = 1;
    uint a7 = 1;
    uint a8 = 1;
    return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
}
```

### 引用类型变量，不同存储位置声明的影响

当你在函数中使用 storage 声明一个变量时，它不是拷贝，而是一个指向状态变量的引用。因此，对于 storage 变量的修改将直接影响到原始的状态变量，因为它们指向同一块存储位置。

当你在函数中使用 memory 声明一个变量并将其赋值为状态变量中的一项时，实际上创建了状态变量的一个拷贝。这个拷贝存储在内存中，对这个拷贝的修改不会影响到原始的状态变量。

```solidity
pragma solidity ^0.8.0;

contract StorageVsMemory {
    uint[] public arr;

    constructor() {
        arr.push(1);
        arr.push(2);
        arr.push(3);
    }

    function modifyUsingMemory() public {
        uint[] memory a = arr; // 创建 arr 的内存拷贝
        a[0] = 10; // 修改内存拷贝
        // arr 不会受影响
    }

    function modifyUsingStorage() public {
        uint[] storage a = arr; // 创建对 arr 的引用
        a[0] = 10; // 直接修改 arr
        // arr 会被修改
    }
}
```
