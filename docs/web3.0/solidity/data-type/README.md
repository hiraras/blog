# solidity-数据类型

1. 值类型
2. 引用类型

## 值类型

### 布尔

true/false

### 数字

整形：

- 包括 int 和 uint（无符号整数，即自然数）
- 细分可以分成 int8 和 uint8 这种指定位数的类型，可以指定 int8-int256 的长度（位数要在 8-256 之间，且可以被 8 整除，如 int16 int 24...int 256）,uint 同理
- int256 和 int 相同
- uint256 和 uint 相同

浮点型：

- 包括 fixed 和 unfixed （有符号和无符号的浮点型）
- 还可以指定位数，fixedMxN 和 unfixedMxN，M 表示按类型区的位数，N 表示小数点，M 应该能被 8 整除，取值在 8-256，N 取值在 0-80
- fixed 和 fixed128x18 相同
- unfixed 和 unfixed128x18 相同

```solidity
contract Number {
    // 获取 int8 中的最大值
    int public max = type (int8).max; // 127
    // 获取 int8 中的最小值
    int public min = type (int8).min; // -128

    uint public uMax = type (uint8).max; // 255
    uint public uMin = type (uint8).min; // 0

    /*
        使用fixed类型可能会报 <UnimplementedFeatureError: Not yet implemented - FixedPointType> 错误
        它表明你的 Solidity 合约中使用了 Solidity 尚未实现的功能 - 固定点数类型
        固定点数类型是 Solidity 中的一种数值类型，用于处理固定小数点数值。但在某些 Solidity 版本中，固定点数类型可能不被完全支持，或者在编译器中尚未完全实现。
        请注意，Solidity 是一个不断发展的编程语言，新功能和改进会随着时间的推移而添加，因此确保使用支持你项目所需功能的 Solidity 版本是很重要的
    */
}
```

### address

地址类型表示以太坊地址，长度为 20 字节，地址可以使用 balance 方法获得余额，也可以使用 transfer 方法将余额转到另一个地址

```solidity
contract Address {
    address addr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address public mine = address(this); // 合约地址
}
```

### 定长字节数组

参考下面的 string 类型

### 枚举

```solidity
contract Enum {
    // 定一个枚举类型，有点像 ts 中的或的关系
    enum State {
        Online, // 0
        Offline, // 1
        Unknown // 2
    }
    // 默认为第一个值，state 可以取 0 | 1 | 2
    State state;

    function getState() public view returns(State) {
        return state;
    }
    // 可以传入 0 | 1 | 2
    function setState(State _s) public {
        state = _s;
    }
    // delete 可以重置枚举值
    function reset() public {
        delete state;
    }
    function getOffline() public pure returns(State) {
        return State.Offline;
    }
}
```

### 函数

详见[solidity 函数](/web3.0/solidity/function/)

## 引用类型

### 数组

- 分为定长数组和可变长度的数组
- 数组长度不可修改
- storage 存储位置的数组可以使用 `uint[5] public arr1 = [2, 3, 4, 5];` 方式声明一个定长数组，无法使用 push 方法
- storage 存储位置的数组可以使用 `uint[5] public arr2;` 方式声明一个不定长数组，可以 使用 push 方法
- memory 存储位置的数组无法使用 `uint[] memory a = [1,2,3,5];` 方式声明，可以使用 `uint[] memory a = new uint[](n);` 声明
- memory 存储位置的数组无法使用 push 方法
- 函数返回定长数组的时候，returns 中需要正确指定长度，如： `returns(unit[5] memory)`
- 二维数组的使用规则和一维数组类似，详见代码

```solidity
contract Array {
    uint[5] public arr1 = [2, 3, 4, 5]; // 定长数组，空位补0，无法使用push/pop
    uint[] public arr2 = [0]; // 不定长数组，可使用push/pop
    uint[] public arr_2; // 不定长‘空’数组，可使用push/pop

    uint[2][3] public complexArr = [[1,2], [3,4], [5,6]]; // 定长二维数组

    uint[][] public complexArr2;

    function getArr1() public view returns(uint[5] memory) {
        return arr1; // 2,3,4,5,0
    }

    function getArr2() public view returns(uint[] memory) {
        return arr2;
    }

    function sumArr() public view returns(uint) {
        uint sum = 0;
        for (uint i = 0; i < arr1.length; i ++) {
            sum += arr1[i];
        }
        return sum;
    }

    function push(uint ele) public {
        arr2.push(ele);
    }

    function createMemoryModifiableArr() public pure returns(uint[] memory) {
        // 使用new声明定长数组并赋值给动态数组
        uint[] memory arr = new uint[](10);

        // memory存储位置的数组无法使用这种方式初始化
        // uint[] memory a = [1,2,3,5];

        // 这样也是不行的
        // uint[3] memory arr3 = [2,3,4];

        // uint[] memory b;
        // memory存储位置的数组无法使用push
        // b.push(10);

        return arr;
    }

    function getComplexArr() public view returns(uint[2][3] memory) {
        return complexArr;
    }

    function changeComplexArr2() public {
        // 不定长二维数组可以添加不同长度的子数组
        complexArr2.push([2,3]);
        complexArr2.push([2,3,4,5]);
    }

    function memoryComplexArr() public pure returns(uint[][] memory) {
        // 定义一个长度为4的多维数组
        uint[][] memory dArr = new uint[][](4);
        for (uint i = 0; i < dArr.length; i ++) {
            // 定义长度为2的数组作为多维数组的子项，并赋值给对应位置
            uint[] memory tempA = new uint[](2);
            tempA[0] = i * 1;
            tempA[1] = i * 2;
            dArr[i] = tempA;
        }
        return dArr;
    }
}
```

### 字符串

- 中文特殊字符需要用 unicode 编码
- 需要使用特殊方法获取字符串长度
- 需要使用特殊方法进行字符串拼接
- 需要使用特殊方法对比字符串

```solidity
contract String {
    string public zhStr = unicode"嘿喽";
    string public enStr = "hi";

    // 连接字符串
    function concat(string calldata str1, string calldata str2) public pure returns(string memory) {
        return string(abi.encodePacked(str1, str2));
    }
    // 连接字符串
    function concat2(string calldata str1, string calldata str2) public pure returns(string memory) {
        // 同时也是bytes和string之间的互相转化
        bytes memory b1 = bytes(str1);
        bytes memory b2 = bytes(str2);
        return string(bytes.concat(b1, b2));
    }
    // 比较字符串
    function compareStr(string calldata str1, string calldata str2) public pure returns(bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
    // 获取字符串长度
    function getLen(string calldata str) public pure returns(uint) {
        return bytes(str).length;
    }
}
```

### 结构体

结构上类似于对象

```solidity
contract Struct {
    // 定义结构体
    struct Person {
        uint age;
        string name;
    }

    Person public p;

    // 直接赋值为一个对象
    Person public p2 = Person(60, 'jackson');

    // 必须按顺序传递
    // Person public p3 = Person('jackson', 70);
    // 或者使用对象形式
    Person public p3 = Person({ age: 18, name: 'emina' });

    constructor(uint _age, string memory _name) {
        p.age = _age;
        p.name = _name;
    }

    function getP3() public view returns(Person memory) {
        return p3;
    }
}
```

### mapping

```solidity
mapping(_KeyType => _ValueType)
```

- 是一个一对一键值存储关系
- \_KeyType 可以是任何内置类型，或者 bytes 和字符串，不允许使用其他引用类型或复杂对象
- \_ValueType 可以是任何类型
- 映射的数据位置只能是 storage，通常用于状态变量
- 映射可以标记为 public，solidity 自动为它创建 getter
- mapping 不能直接在函数中返回

```solidity
contract Mapping {
    mapping(address => uint) map;

    function getBalance() public view returns(uint) {
        return map[msg.sender];
    }

    function updateMineBalance(uint balance) public {
        map[msg.sender] = balance;
    }
}
```
