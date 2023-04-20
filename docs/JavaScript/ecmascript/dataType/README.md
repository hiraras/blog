## 基本数据类型

### 分为基本数据类型和复杂数据类型

基本数据类型有：

- String 字符串类型

```js
const str = "";
```

- Number 数值类型

```js
const num = 0;
const float = 0.1;
```

- Boolean 布尔类型

```js
const t = true;
const f = false;
```

- Null 空值

```js
const obj = null;
```

- Undefined 未定义的值

```js
let key;
```

- Symbol 可理解为一种特殊的字符串

```js
const s = Symbol();
```

- BigInt 大的整数

```js
const bigint = BigInt(10000000000000000);
```

复杂数据类型有：

- Object(Array、RegExp、Error 等都继承于 Object)

```js
const obj = {};
const arr = [];
```

### 判断类型

#### typeof

```js
typeof ""; // string
typeof 0; // number
typeof true; // boolean
typeof null; // object
typeof undefined; // undefined
typeof Symbol(); // symbol
typeof BigInt(1000); // bigint
typeof {}; // object
typeof []; // object
typeof /a/; // object
typeof () => {}; // function
```

#### Object.prototype.toString.call()

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(0); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(Symbol()); // [object Symbol]
Object.prototype.toString.call(BigInt(1000)); // [object BigInt]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call([]); // [object Array]，Array.isArray 是基于该方法封装的
Object.prototype.toString.call(/a/); // [object RegExp]
Object.prototype.toString.call(() => {}); // [object Function]
```

提取

```js
Object.prototype.toString.call("").slice(8, -1); // String
```

### 数据类型转化

#### 强制转换

Number

```js
// Number() 同 +
// Number('') === +("")
Number(1); // 1
Number("1"); // 1
Number("324abc"); // NaN，无法转为数值的，变成NaN
Number(""); // 0
Number(true); // 1
Number(false); // 0
Number(undefined); // NaN
Number(null); // 0
Number({ a: 1 }); // NaN
Number([1, 2, 3]); // NaN，数组的转化实际是先执行toString，1,2,3
Number([5]); // 5
Number([]); // 0
```

String

```js
String(123); // 123
String("abc"); // abc
String(true); // true
String(undefined); // undefined
String(null); // null
String({ a: 1 }); // [object Object]
String([1, 2, 3]); // "1,2,3"
String([]); // ""  空字符串
String(function () {
  a = 1;
}); // "function () {\n  let a = 1;\n}"
```

Boolean

```js
// Boolean 同 !!
// Boolean() === !!undefined
Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(""); // false
Boolean({}); // true
Boolean([]); // true
Boolean(new Boolean(false)); // true
Boolean(1); // true
Boolean(" "); // true // 注意字符串内有个空格
```

隐式转换

遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见

1. 不同类型的数据互相运算。

```js
// string
"5" + 1; // '51'
1 + "5"; // '15'
"5" + true; // "5true"
"5" + false; // "5false"
"5" + {}; // "5[object Object]"
5 + {}; // "5[object Object]"
"5" + []; // "5"
5 + []; // "5"
"5" + function () {}; // "5function (){}"
"5" + undefined; // "5undefined"
"5" + null; // "5null"
// number
"5" - "2"; // 3
"5" * "2"; // 10
true - 1; // 0
false - 1; // -1
"1" - 1; // 0
"5" * []; // 0
false / "5"; // 0
"abc" - 1; // NaN
null + 1; // 1
undefined + 1; // NaN
true + true; // 2
5 + true; // 6
5 + false; // 5
5 + null; //5
```

2. 对非布尔值类型的数据求布尔值

```js
if ("abc") {
  console.log("hello");
} // "hello"
```

3. 对非数值类型的值使用一元运算符（即 + 和 - ）

```js
+{ foo: "bar" }; // NaN
```

自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用 String 函数进行转换。如果该位置即可以是字符串，也可能是数值，那么默认转为数值。

由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用 Boolean、Number 和 String 函数进行显式转换。

#### 其他

```js
parseInt("1234a"); // 1234
parseInt("1234.11a"); // 1234
parseFloat("1234.11a"); // 1234.11
```

### Symbol

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。

```js
Symbol() === Symbol(); // false
```

可以接受一个字符串作为参数，表示对 Symbol 实例的描述，可以帮助区分 symbol

```js
const symbol = Symbol("test"); // Symbol(test)
```

Symbol 不能与其他类型的值运算，会报错，但可以显示的转化为字符串

```js
const s = Symbol("test");
s.toString(); // "Symbol(test)"
```

#### Symbol.prototype.description

```js
const s = Symbol("test");
s.description; // "test"
```

#### 作为属性名

```js
const key = Symbol();
const obj = {
  [key]: 123,
}; // {Symbol(): 123}
obj[key]; // 123
```

#### 属性名的遍历

Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名

```js
const key = Symbol();
const obj = {
  [key]: 123,
};
Object.getOwnPropertySymbols(obj); // [Symbol()]
```

#### Symbol.for()，Symbol.keyFor()

注册全局的 Symbol

```js
// 如果全局环境有对应的Symbol了，就返回该Symbol，否则新建一个
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
s1 === s2; // true
s1.description; // foo
```

Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2); // undefined
```

**注意**：Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

```js
function foo() {
  return Symbol.for("bar");
}

const x = foo();
const y = Symbol.for("bar");
console.log(x === y); // true
```

#### 内置的 Symbol

- Symbol.hasInstance

  对象的 Symbol.hasInstance 属性，指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo 在语言内部，实际调用的是 Foo[Symbol.hasInstance](foo)。

  ```js
  class MyClass {
    [Symbol.hasInstance](foo) {
      return foo instanceof Array;
    }
  }

  [1, 2, 3] instanceof new MyClass(); // true
  ```

- Symbol.isConcatSpreadable

  对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。

  ```js
  let arr1 = ["c", "d"];
  ["a", "b"].concat(arr1, "e"); // ['a', 'b', 'c', 'd', 'e']
  arr1[Symbol.isConcatSpreadable]; // undefined

  let arr2 = ["c", "d"];
  arr2[Symbol.isConcatSpreadable] = false;
  ["a", "b"].concat(arr2, "e"); // ['a', 'b', ['c','d'], 'e']
  ```

  上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable 默认等于 undefined。该属性等于 true 时，也有展开的效果。

  类似数组的对象正好相反，默认不展开。它的 Symbol.isConcatSpreadable 属性设为 true，才可以展开。

  ```js
  let obj = { length: 2, 0: "c", 1: "d" };
  ["a", "b"].concat(obj, "e"); // ['a', 'b', obj, 'e']

  obj[Symbol.isConcatSpreadable] = true;
  ["a", "b"].concat(obj, "e"); // ['a', 'b', 'c', 'd', 'e']
  ```

- Symbol.species

  对象的 Symbol.species 属性，指向一个构造函数。创建衍生对象时，会使用该属性。

  ```js
  class MyArray extends Array {}

  const a = new MyArray(1, 2, 3);
  const b = a.map((x) => x);
  const c = a.filter((x) => x > 1);

  b instanceof MyArray; // true
  c instanceof MyArray; // true
  ```

  上面代码中，子类 MyArray 继承了父类 Array，a 是 MyArray 的实例，b 和 c 是 a 的衍生对象。你可能会认为，b 和 c 都是调用数组方法生成的，所以应该是数组（Array 的实例），但实际上它们也是 MyArray 的实例。

  Symbol.species 属性就是为了解决这个问题而提供的。现在，我们可以为 MyArray 设置 Symbol.species 属性。

  ```js
  class MyArray extends Array {
    static get [Symbol.species]() {
      return Array;
    }
  }
  ```

  上面代码中，由于定义了 Symbol.species 属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义 Symbol.species 属性要采用 get 取值器。默认的 Symbol.species 属性等同于下面的写法。

  ```js
  static get [Symbol.species]() {
    return this;
  }
  ```

  ```js
  class MyArray extends Array {
    static get [Symbol.species]() {
      return Array;
    }
  }

  const a = new MyArray();
  const b = a.map((x) => x);

  b instanceof MyArray; // false
  b instanceof Array; // true
  ```

- Symbol.match

  对象的 Symbol.match 属性，指向一个函数。当执行 str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

  ```js
  String.prototype.match(regexp);
  // 等同于
  regexp[Symbol.match](this);

  class MyMatcher {
    [Symbol.match](string) {
      return "hello world".indexOf(string);
    }
  }

  "e".match(new MyMatcher()); // 1
  ```

- Symbol.replace

  对象的 Symbol.replace 属性，指向一个方法，当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回值。

  ```js
  const x = {};
  x[Symbol.replace] = (...s) => console.log(s);

  "Hello".replace(x, "World"); // ["Hello", "World"]
  ```

- Symbol.search

  对象的 Symbol.search 属性，指向一个方法，当该对象被 String.prototype.search 方法调用时，会返回该方法的返回值。

  ```js
  String.prototype.search(regexp);
  // 等同于
  regexp[Symbol.search](this);

  class MySearch {
    constructor(value) {
      this.value = value;
    }
    [Symbol.search](string) {
      return string.indexOf(this.value);
    }
  }
  "foobar".search(new MySearch("foo")); // 0
  ```

- Symbol.split

  对象的 Symbol.split 属性，指向一个方法，当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值。

  ```js
  String.prototype.split(separator, limit);
  // 等同于
  separator[Symbol.split](this, limit);

  // 例子
  class MySplitter {
    constructor(value) {
      this.value = value;
    }
    [Symbol.split](string) {
      let index = string.indexOf(this.value);
      if (index === -1) {
        return string;
      }
      return [
        string.substr(0, index),
        string.substr(index + this.value.length),
      ];
    }
  }

  "foobar".split(new MySplitter("foo"));
  // ['', 'bar']

  "foobar".split(new MySplitter("bar"));
  // ['foo', '']

  "foobar".split(new MySplitter("baz"));
  // 'foobar'
  ```

- Symbol.iterator

  对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法, `for...of`、`[...]`等方法默认调用的都是该方法

  ```js
  const myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  [...myIterable]; // [1, 2, 3]
  ```

- Symbol.toPrimitive

  对象的 Symbol.toPrimitive 属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

  Symbol.toPrimitive 被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

  - Number：该场合需要转成数值
  - String：该场合需要转成字符串
  - Default：该场合可以转成数值，也可以转成字符串

  ```js
  let obj = {
    [Symbol.toPrimitive](hint) {
      switch (hint) {
        case "number":
          return 123;
        case "string":
          return "str";
        case "default":
          return "default";
        default:
          throw new Error();
      }
    },
  };

  2 * obj; // 246
  3 + obj; // '3default'
  obj == "default"; // true
  String(obj); // 'str'
  ```

- Symbol.toStringTag

  对象的 Symbol.toStringTag 属性，指向一个方法。在该对象上面调用 Object.prototype.toString 方法时，如果这个属性存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中 object 后面的那个字符串。

  ```js
  // 例一
  ({ [Symbol.toStringTag]: "Foo" }).toString();
  // "[object Foo]"

  // 例二
  class Collection {
    get [Symbol.toStringTag]() {
      return "xxx";
    }
  }
  let x = new Collection();
  Object.prototype.toString.call(x); // "[object xxx]"
  ```

  ES6 新增内置对象的 Symbol.toStringTag 属性值如下。

  - JSON[Symbol.toStringTag]：'JSON'
  - Math[Symbol.toStringTag]：'Math'
  - Module 对象 M[Symbol.toStringTag]：'Module'
  - ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
  - DataView.prototype[Symbol.toStringTag]：'DataView'
  - Map.prototype[Symbol.toStringTag]：'Map'
  - Promise.prototype[Symbol.toStringTag]：'Promise'
  - Set.prototype[Symbol.toStringTag]：'Set'
  - %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
  - WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
  - WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
  - %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
  - %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
  - %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
  - Symbol.prototype[Symbol.toStringTag]：'Symbol'
  - Generator.prototype[Symbol.toStringTag]：'Generator'
  - GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

- Symbol.unscopables

  对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

  ```js
  // 上面代码说明，数组有 7 个属性，会被with命令排除。
  Array.prototype[Symbol.unscopables];
  // {
  //   copyWithin: true,
  //   entries: true,
  //   fill: true,
  //   find: true,
  //   findIndex: true,
  //   includes: true,
  //   keys: true
  // }

  Object.keys(Array.prototype[Symbol.unscopables]);
  // ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']
  ```

  ```js
  // 没有 unscopables 时
  class MyClass {
    foo() {
      return 1;
    }
  }

  var foo = function () {
    return 2;
  };

  with (MyClass.prototype) {
    foo(); // 1
  }

  // 有 unscopables 时
  class MyClass {
    foo() {
      return 1;
    }
    get [Symbol.unscopables]() {
      return { foo: true };
    }
  }

  var foo = function () {
    return 2;
  };

  with (MyClass.prototype) {
    foo(); // 2
  }
  ```

  上面代码通过指定 Symbol.unscopables 属性，使得 with 语法块不会在当前作用域寻找 foo 属性，即 foo 将指向外层作用域的变量。

### BitInt

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于 2 的 1024 次方的数值，JavaScript 无法表示，会返回 `Infinity`

```js
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024); // Infinity
```

ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

```js
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b; // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b); // 33334444555566670000
```

为了与 Number 类型区别，BigInt 类型的数据必须添加后缀 n。

```js
1234; // 普通整数
1234n; // BigInt

// BigInt 的运算
1n + 2n; // 3n
```

BigInt 与普通整数是两种值，并不相等

```js
42n === 42; // false
```

#### 转化为其他类型

```js
BigInt(123); // 123n
BigInt("123"); // 123n
BigInt(false); // 0n
BigInt(true); // 1n

new BigInt(); // TypeError
BigInt(undefined); //TypeError
BigInt(null); // TypeError
BigInt("123n"); // SyntaxError
BigInt("abc"); // SyntaxError
BigInt(1.5); // RangeError
BigInt("1.5"); // SyntaxError

Boolean(0n); // false
Boolean(1n); // true
Number(1n); // 1
String(1n); // "1"

// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt("9007199254740993", 10);
// 9007199254740992
BigInt.parseInt("9007199254740993", 10);
// 9007199254740993n
```

#### 运算

数学运算方面，BigInt 类型的+、-、\*和\*\*这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。

```js
9n / 5n; // 1n

// BigInt 不能与普通数值进行混合运算
1n + 1.3; // 报错

// 比较运算符
0n < 1; // true
0n < true; // true
0n == 0; // true
0n == false; // true
0n === 0; // false

// 与字符串运算
"" + 123n; // "123"
```

几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。

- 不带符号的右移位运算符 `>>>`
- 一元的求正运算符 `+`

上面两个运算符用在 BigInt 会报错。前者是因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>。后者是因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n 会报错。
