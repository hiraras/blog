# solidity 发行自定义货币

## 通过继承快速发行一个自己的货币：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken2 is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
```

## 自己编写符合 ERC 标准的合约

可以在[这里](https://ethereum.org/zh/developers/docs/standards/tokens/erc-20/) 查找相关标准需要实现的方法

Context.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Context {
    function _msgSender() internal view returns(address) {
        return msg.sender;
    }
}
```

MyToken.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Context.sol';

contract MyToken is Context {
    // 1. 设置代币信息,ERC-20 规范

    // 代币名称 name
    string private _name;
    // 代币表示 symbol
    string private _symbol;
    // 代币小数位数 decimals，采用 wei 为单位就是18
    uint8 private _decimals;
    // 代币的总发行量 totalSupply
    uint private _totalSupply;
    // 代币数量 balance
    mapping(address => uint) private _balances;
    // 授权代币数量 allowance
    mapping(address => mapping(address => uint)) private _allowances;

    uint public max = 600;

    // 2. 初始化

    // constructor(string memory __name, string memory __symbol, uint8 __decimals, uint __total) {
    //     _name = __name;
    //     _symbol = __symbol;
    //     _decimals = __decimals;
    //     // 初始化货币池
    //     _mint(_msgSender(), __total * 10 ** __decimals);
    // }

    constructor(uint __total) {
        _name = "hirara";
        _symbol = "H";
        _decimals = 18;
        // 初始化货币池
        _mint(_msgSender(), __total * 10 ** 18);
    }

    // 3. 定义取值器
    function name() public view returns(string memory) {
        return _name;
    }

    function symbol() public view returns(string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns(uint) {
        return _balances[account];
    }

    function allowance(address owner, address spender) public view returns(uint) {
        return _allowances[owner][spender];
    }

    function getMax() public view returns(uint) {
        return max;
    }

    // 4. 函数
    // 转账
    function transfer(address _to, uint value) public returns(bool success) {
        address owner = _msgSender();
        _transfer(owner, _to, value);
        return true;
    }

    // 授权代币转发
    function approve(address spender, uint amount) public returns(bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }
    // 提款
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        // <入参>的from相当于授权方，to相当于我想把授权里的钱用在哪里
        // to如果是owner意思就是提现，to如果是第三方地址，就相当于我提现并转到这个地址，但是我也可以直接让银行帮我把钱转过去，少了中间的提现过程
        address owner = _msgSender();
        // 先处理授权mapping中的数字，这里的被授权方肯定是调用这个合约方法的人
        _spendAllowance(from, owner, amount);
        // 处理完授权中的钱，就直接执行转账
        _transfer(from, to, amount);
        return true;
    }

    // 5. 内部函数
    function _mint(address account, uint amount) internal {
        // 使用mint进行转账时，账号必须是合约的主账号，address(0) 获得的就是主账号地址
        require(account != address(0), "ERC20: mint to the zero address");
        // 初始化货币数量
        _totalSupply += amount;
        // 给某个账户注入起始资金
        _balances[account] += amount;
    }

    function _transfer(address from, address to, uint amount) internal {
        // 从零地址（address(0)）转移加密货币或以太币是不可能的，因为零地址不代表以太坊区块链上的有效或真实账户。
        // 以太坊交易涉及在有效账户之间转移资金，零地址只是一个占位符，用来表示没有有效地址的情况。
        require(from != address(0), "ERC30: transfer from the zero address");
        require(to != address(0), "ERC30: transfer to the zero address");
        uint remain = _balances[from];
        require(remain >= amount, "account's balance is not enough");

        _balances[from] -= amount;
        _balances[to] += amount;

        emit Transfer(from, to, amount);
    }

    function _approve(address from, address to, uint amount) internal {
        require(from != address(0), "ERC30: transfer from the zero address");
        require(to != address(0), "ERC30: transfer to the zero address");

        uint fromBalance = _balances[from];
        require(fromBalance > amount, "account's balance is not enough");
        _allowances[from][to] = amount;

        emit Approval(from, to, amount);
    }

    function _spendAllowance(address owner, address spender, uint amount) internal {
        uint currentAllowance = allowance(owner, spender);
        require(currentAllowance >= amount, unicode"授权余额不足");
        _approve(owner, spender, currentAllowance - amount);
    }

    // 6. 事件
    event Transfer(address _from, address _to, uint256 _value);
    event Approval(address _owner, address _spender, uint256 _value);
}


/*

0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

*/

```
