# 简介

es6 可能并不被浏览器支持，所以需要使用 babel 将 es6 的代码转化成 es5 供浏览器运行。
而 babel 只负责将 es6 转为 es5，es6 中提供的新方法不会补充，需要添加另外的 polyfill 来补充这部分功能
babel 的配置文件是 .babelrc 。放置在根目录下

```js
{
  "presets": [],
  "plugins": []
}
```

# let & const

1. 暂时性死区

只要当前作用域里使用 let/const 声明了变量，就不能在声明语句前使用该变量

# 解构赋值

1. 本质上，这种写法属于 [模式匹配]

```js
let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

2. 数组的解构赋值，只要数据具有 Iterator 接口都可以正常赋值

3. 对象的解构赋值，属性名为模式，最终赋值到的变量为属性名对应的变量名

```js
const { foo: baz } = { foo: "aaa" };
baz; // aaa
foo; // foo is not defined

const { foo } = { foo: "aaa" };
// 实际上是以下的缩写
const { foo: foo } = { foo: "aaa" };
```

# 字符串的扩展

标签模板

```js
let a = 5,
    b = 10;
function test(strArr, value1, value2) {
    console.log(strArr, value1, value2);
}
test`${a} + ${b} = ${a + b}`;
// ['', ' + ', ' = ', '', raw: Array(4)] 5 10
```

# 正则

1. 方法

```js
// test: 测试模式是否被匹配，返回true|false
const str = "123";
const reg = /\d/;
reg.test(str); // true

// search: 返回模式匹配到的字符串的位置，如果能匹配到多个子串只返回第一个的位置
const str = "a123";
const reg = /\d/g;
str.search(reg); // 1

// match: 执行匹配，如果模式不匹配则返回null；如果匹配到了则返回一个数组，元素为匹配到的子串，如果没有带g修饰符，返回的数组还会带上index(字串开始位置),input(原字符串)，groups(具名匹配组)几个属性
const str1 = "123";
const str2 = "a123b456";
const reg1 = /[a-z]/g;
const reg2 = /\d+/;
const reg3 = /\d+/g;
str1.match(reg1); // null
str2.match(reg2); // ['123'],index: 1, input: 'a123b456',groups: undefined
str2.match(reg3); // ['123', '456']

// exec: 类似match方法，值得注意的是，如果正则带了g，还是会返回单个字串的信息，再次执行会返回后续匹配到的字串，直到返回null，然后再从第一个字串开始循环
const str = "123";
const reg = /[a-z]/g;
reg.exec(str); // null

const str = "a123b456";
const reg = /\d+/;
reg.exec(str); // ['123'],index: 1, input: 'a123b456',groups: undefined

const str = "a123b456";
const reg = /\d+/g;
reg.exec(str); // ['123'],index: 1, input: 'a123b456',groups: undefined
reg.exec(str); // ['456'],index: 1, input: 'a123b456',groups: undefined
reg.exec(str); // null
reg.exec(str); // ['123'],index: 1, input: 'a123b456',groups: undefined

// replace: 查找字符串并替换
const str = "a123b456";
const reg = /\d+/g;
str.replace(reg, "*"); // 'a*b*'

const str = "a123b456";
str.replace("123", "*"); // 'a*b456'

// 如果具有匹配组，函数的第一个参数为字串，后续跟上各个匹配组匹配到的部分，倒数第二个参数为匹配到的字串位置，最后一个参数为原字符串
const str = "a123b456";
const reg = /\d+/g;
str.replace(reg, function (...args) {
    console.log(args);
    // ['123', 1, 'a123b456']
    // ['456', 5, 'a123b456']
    return "*";
});

const str = "a123b456";
const reg = /([a-z])(\d+)/g;
str.replace(reg, function (...args) {
    console.log(args);
    // ['a123', 'a', '123', 0, 'a123b456']
    // ['b456', 'b', '456', 4, 'a123b456']
    return "*";
});
```

2. 特殊符号

```
\s : 空格
\S : 非空格
\d : 数字
\D : 非数字
\w : 字符 ( 字母 ，数字，下划线\_ )
\W : 非字符例子：是否有不是数字的字符
.（点）——任意字符
\. : 真正的点
\b : 独立的部分 （ 起始，结束，空格 ）
\B : 非独立的部分
^ : 从字符串首位开始匹配
$ : 从字符串末位开始匹配
| : 或符号
[] : 集合
? : +号和*号默认会匹配尽量多的字符串,在后面添加?号后会进入非贪婪模式,即尽量匹配少的字符串
\1 : 匹配第一个子项匹配到的内容，\2则时匹配第二个匹配到的内容，以此类推
\k<组名> : 具名组匹配的重复
```

```js
// |或符号的应用
"abbabbb".match(/a|b+/g); // ['a', 'bb', 'a', 'bbb']
"abbabbb".match(/(a|b)+/g); // ['abbabbb']

// []集合符号的应用
"abbabbb".match(/[ab]+/g); // ['abbabbb']
// 下面的正则相当于匹配a,b,(,),+五个符号，如果有\等特殊字符也会被拆分为单个字符看待
"abbabbb".match(/[a(b+)]/g); // ['a', 'b', 'b', 'a', 'b', 'b', 'b']
// 当作为范围来用时，起始字符满足ASCII码的顺序（1:49,A:65,a:97）
"aeAE123FAEF".match(/[1-Ze]/g); // ['e', 'A', 'E', '1', '2', '3', 'F', 'A', 'E', 'F']
"aeAE123FAEF".match(/[^1-Ze]/g); // ['a']

// ? 的使用
"123456".match(/\d+/g); // ['123456']
"123456".match(/\d+?/g); // ['1', '2', '3', '4', '5', '6']

// 重复项的使用
"aab".match(/(a)\1b/g); // ['aab']

// \k<组名>的使用
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test("abc!abc"); // true
RE_TWICE.test("abc!ab"); // false
```

3. 量词

```
{n,m}: 至少出现n次，最多m次
{n,}: 至少n次
*: 任意次 相当于{0,}
?: 零次或一次 相当于{0,1}
+: 一次或任意次相当于 {1,}
{n}: 正好n次
```

4. 捕获组

(): 捕获组
(?:): 非捕获组
(?<组名>\d{4}): 具名组匹配

```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec("1999-12-31");
const year = matchObj.groups.year; // "1999"
const month = matchObj.groups.month; // "12"
const day = matchObj.groups.day; // "31"
```

5. 断言

(?=): 先行断言
(?!): 先行否定断言
(?<=): 后行断言
(?<!): 后行否定断言

```js
/\d+(?=%)/.exec('100% of US presidents have been male') // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them') // ["44"]
/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill') // ["100"]
/(?<!\$)\d+/.exec('it’s worth about €90') // ["90"]
'17826877713'.replace(/(?<!\.\d+)(?=(\d{3})+($|\.))/g, ',') // '17,826,877,713'
'17826877713.15166'.replace(/(?<!\.\d+)(?=(\d{3})+($|\.))/g, ',') // '17,826,877,713.15166'
```

6. 修饰符

i: 忽略大小写
u: Unicode 模式 reg.unicode
y: 粘连属性 reg.sticky
s: dotAll 模式 reg.dotAll
v: Unicode 属性类的运算
d: 正则匹配索引
m: 多行模式，改变^|$的作用，可以匹配字符串每行的开头及结尾

```js
// v的使用
// 差集运算（A 减去 B）
[A--B]
// 交集运算（A 与 B 的交集）
[A&&B]

// 十进制字符去除 ASCII 码的0到9
[\p{Decimal_Number}--[0-9]]
// Emoji 字符去除 ASCII 码字符
[\p{Emoji}--\p{ASCII}]

// m的使用
const str = `123
456
 789`
str.match(/^\d+/gm) // ['123', '456']

str.match(/^\d+/g) // ['123']
```

# 数值

Number

Number.isFinite: 检测数值是否有限
Number.isNaN: 检测数值是否为 NaN
Number.isInteger: 检测数值是否为整数
Number.EPSILON: 极小常量，表示 1 与大于 1 的最小浮点数之差
Number.isSafeInteger: 检测整数是否在 js 能表示的最大和最小整数范围之内
Number.MAX_SAFE_INTEGER: js 能表示的最大整数 2^53
Number.MIN_SAFE_INTEGER: js 能表示的最小整数 -2^53

Math

Math.trunc: 去除数值的小数部分
Math.sign: 判断一个数是正数/负数/零
Math.cbrt: 计算一个数的立方根
Math.hypot: 返回所有参数的平方和的平方根

BigInt

1. 数值后面加 n
2. 必须是整数
3. bigint 不能直接与普通整数进行运算

# 函数的扩展

1. 参数默认值
2. rest 参数
3. name 属性
4. 箭头函数

# 数组的扩展

1. 扩展运算符，被扩展对象需要具备 Iterator 接口
2. concat

```js
const arr1 = ["a", "b"];
const arr2 = ["c"];
const arr3 = ["d", "e"];
arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ]
```

3. Array.from: 将类似数组和具备可遍历的对象转为数组

```js
let arrayLike = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
};

// ES5 的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6 的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

4. Array.of: 将一组数转为数组

```js
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

5. fill: 将数组所有的元素替换为参数传递的值

```js
["a", "b", "c"].fill(7); // [7, 7, 7]
new Array(3).fill(7); // [7, 7, 7]
// 指定开始结束位置
["a", "b", "c"].fill(7, 1, 2); // ['a', 7, 'c']
```

6. includes: 找到指定数据在数组中的位置

```js
// 可以区分NaN
[NaN].includes(NaN);
// 指定起始位置，负数则是从后边开始
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```

7. flat,flatMap: 拉平数组

```js
[1, 2, [3, 4]].flat(); // [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat(2); // [1, 2, 3, 4, 5]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
// flatMap则是先执行map遍历功能，再执行拉平功能
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]); // [2, 4, 3, 6, 4, 8]
```

8. at: 找到数组指定位置的元素

```js
const arr = [5, 12, 8, 130, 44];
arr.at(2); // 8
arr.at(-2); // 130
```

9. toReversed()，toSorted()，toSpliced()，with()

```js
// es5 中的push/pop/shift/unshift/sort/reverse方法会改变原数组
const arr = [1, 2, 3];
arr.push(100); // [1, 2, 3, 100]，返回 4
arr.pop(); // [1, 2, 3]，返回 100
arr.shift(); // [2, 3]，返回 1
arr.unshift(200); // [200, 2, 3]，返回 3
[1, 5, 6, 1, 1].sort(); // [1, 1, 1, 5, 6]
[1, 1, 1, 5, 6].reverse(); // [6, 5, 1, 1, 1]
// 以下方法不改变原数组
const arr = [5, 10, 15, 3, 13];
arr.toReversed(); // [13, 3, 15, 10, 5]
arr.toSorted(); // [10, 13, 15, 3, 5]
arr.toSorted((a, b) => a - b); // [3, 5, 10, 13, 15]
arr.toSpliced(1, 3, 99, 100, 200); // [5, 99, 100, 200, 13]
arr.with(3, 20); // [5, 10, 15, 20, 13]
```

10. group/groupMap

```js
const array = [1, 2, 3, 4, 5];
array.group((num, index, array) => {
    return num % 2 === 0 ? "even" : "odd";
});
// { odd: [1, 3, 5], even: [2, 4] }

const array = [1, 2, 3, 4, 5];

const odd = { odd: true };
const even = { even: true };
array.groupToMap((num, index, array) => {
    return num % 2 === 0 ? even : odd;
});
//  Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```

# 对象的扩展

1. 属性的简写

```js
let birth = "2000/01/01";
const Person = {
    name: "张三",
    //等同于birth: birth
    birth,
    // 等同于hello: function ()...
    hello() {
        console.log("我的名字是", this.name);
    },
};
new Person.hello(); // 报错，简写的对象方法不能当作构造函数
```

2. 属性名表达式

```js
let obj = {
    ["h" + "ello"]() {
        return "hi";
    },
};
obj.hello(); // hi
```

3. 属性描述符

```
value：属性的值
writable：是否可修改
enumerable：是否可枚举（如 for...in 循环）
configurable：是否可删除或修改描述符
```

```js
const obj = { a: 1, b: 2 };
let descriptors = Object.getOwnPropertyDescriptors(obj);
Object.defineProperty(obj, "a", {
    value: 4,
    writable: false, // 下面的 obj.a = 5 会失效
    configurable: false, // 下面的delete obj.a会失效，defineProperty重设a的enumerable会直接报错
});
Object.defineProperty(obj, "a", { enumerable: false });
descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
obj.a = 5;

delete obj.a;
console.log(obj);
```

4. super 关键字: 指向当前对象的原型对象

**目前只有对象方法的简写法中可以用 super**

```js
const proto = {
    foo: "hello",
};
const obj = {
    foo: "world",
    find() {
        return super.foo;
    },
};
Object.setPrototypeOf(obj, proto);
obj.find(); // "hello"
```

5. AggregateError 错误对象: 当需要同时抛出多个错误时，可以直接抛出这个错误对象

```js
try {
    throw new AggregateError([new Error("some error")], "Hello");
} catch (e) {
    console.log(e instanceof AggregateError); // true
    console.log(e.message); // "Hello"
    console.log(e.name); // "AggregateError"
    console.log(e.errors); // [ Error: "some error" ]
}
```

6. 对象的新增方法

Object.is: 比较两个值是否相等

```js
Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
NaN === NaN; // false
```

Object.assign: 可以合并多个对象，浅拷贝
Object.getOwnPropertyDescriptors: 获取对象的所有属性描述
Object.setPrototypeOf(a, n): 设置 a 对象为 n 的原型
Object.getPrototypeOf: 获取对象的原型
Object.keys: 获取对象的可枚举属性列表
Object.values: 获取对象的可枚举属性的属性值列表
Object.entries: 获取对象的可枚举属性和对应的属性值列表
Object.fromEntries: 将键值对数组转化为对象

```js
Object.fromEntries([
    ["foo", "bar"],
    ["baz", 42],
]);
// { foo: "bar", baz: 42 }

const entries = new Map([
    ["foo", "bar"],
    ["baz", 42],
]);
Object.fromEntries(entries);
// { foo: "bar", baz: 42 }

const map = new Map().set("foo", true).set("bar", false);
Object.fromEntries(map);
// { foo: true, bar: false }
```

Object.hasOwn: 判断属性是否为自身的属性

```js
const foo = Object.create({ a: 123 });
foo.b = 456;
Object.hasOwn(foo, "a"); // false
Object.hasOwn(foo, "b"); // true

const obj = Object.create(null);
obj.hasOwnProperty("foo"); // 报错
Object.hasOwn(obj, "foo"); // false
```

# 运算符的扩展

1. 指数运算符: \*\*
2. 链判断运算符: ?.

```js
const obj = {};
obj?.a?.b; // undefined
obj?.a?.(); // undefined
let hex = "#C0FFEE".match(/#([A-Z]+)/i)?.[1];
```

3. Null 判断运算符: 运算符左边如果时 null 或 undefined 就返回右边

# Symbol

一种新的数据类型，类似于字符串的使用方式，不过它不会重复

1. 基本使用

```js
let s = Symbol();
let s2 = Symbol("foo");
typeof s; // "symbol"
s.description; // undefined
s2.description; // 'foo'
let a = {
    [s]: "Hello!",
};
a[s]; // 'Hello!'

let a = {};
Object.defineProperty(a, s, { value: "Hello!" });
```

2. 方法

Object.getOwnPropertySymbols: Symbol 作为属性名不会出现在 for...in,for...of 遍历中，也不会被 Object.keys()/Object.getOwnPropertyNames()返回，可以通过这个方法获取

Symbol.for() / Symbol.keyFor(): 有时我们希望重复使用同一个 Symbol，此时可以用这两个方法进行操作，for 方法用来在全局注册 Symbol，keyFor 用来获取注册时的关键字

```js
Symbol.for("bar") === Symbol.for("bar"); // true
Symbol("bar") === Symbol("bar"); // false

let s1 = Symbol.for("foo"); // 注册
Symbol.keyFor(s1); // "foo"
let s2 = Symbol("foo"); // 未注册
Symbol.keyFor(s2); // undefined
```

3. 内置 Symbol

-   Symbol.hasInstance: 当使用 instanceof 时默认调这个方法

-   Symbol.isConcatSpreadable: 当使用 concat 时，对象是否可以展开

```js
let arr1 = ["c", "d"];
["a", "b"].concat(arr1, "e"); // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable]; // undefined
let arr2 = ["c", "d"];
arr2[Symbol.isConcatSpreadable] = false;
["a", "b"].concat(arr2, "e"); // ['a', 'b', ['c','d'], 'e']

let obj = { length: 2, 0: "c", 1: "d" };
["a", "b"].concat(obj, "e"); // ['a', 'b', obj, 'e']
obj[Symbol.isConcatSpreadable] = true;
["a", "b"].concat(obj, "e"); // ['a', 'b', 'c', 'd', 'e']
```

-   Symbol.species: 创建衍生对象时，会使用该属性
-   Symbol.match: 当执行`str.match()`时会调用该属性
-   Symbol.replace: 当该对象被 `String.prototype.replace` 方法调用时，会返回该方法的返回值('Hello'.replace(x, 'World'))
-   Symbol.search: 当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值('foobar'.search(new MySearch('foo')) )
-   Symbol.split: 当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值('foobar'.split(new MySplitter('foo')))
-   Symbol.iterator: 指向该对象的默认遍历器方法
-   Symbol.toPrimitive: 该对象被转为原始类型的值时，会调用这个方法
-   Symbol.toStringTag: 用来设定一个字符串，当在目标对象上调用`Object.prototype.toString()`时，返回这个字符串的类型

```js
class Collection {
    get [Symbol.toStringTag]() {
        return "xxx";
    }
}
let x = new Collection();
Object.prototype.toString.call(x); // "[object xxx]"
```

-   Symbol.unscopables: 指向一个对象，对象属性值为 true 的属性，若在 with 命令中使用到该属性会被排除

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

# Set & Map

## Set

```js
// 使用Set去重数组
const arr = [1, 1, 2, 2, 3, 3, 4, 5];
[...new Set(arr)]; // [1, 2, 3, 4, 5]
```

size: 返回 Set 实例的成员总数
add: 添加某个值，返回 Set 实例
delete: 删除某个值，返回布尔值，表示删除是否成功
has: 返回布尔值，表示 Set 内是否存在该元素
clear: 清除所有成员，没有返回值

-   遍历

keys()
values()
entries()
forEach()

Set 的遍历顺序就是插入顺序

keys 和 values 方法行为完全一致

```js
Set.prototype[Symbol.iterator] === Set.prototype.values; // true
```

ES2025 新增的集合方法

Set.prototype.intersection(other)：交集
Set.prototype.union(other)：并集
Set.prototype.difference(other)：差集
Set.prototype.symmetricDifference(other)：对称差集(两个集合的所有独一无二成员的集合，即去除了重复的成员)
Set.prototype.isSubsetOf(other)：判断是否为子集
Set.prototype.isSupersetOf(other)：判断是否为超集
Set.prototype.isDisjointFrom(other)：判断是否不相交(没有共同成员)

## WeakSet

1. 成员只能是对象和 Symbol 值
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用

有以下三个方法

add: 添加成员，返回 WeakSet 实例
delete: 删除指定成员，返回布尔值
has: 返回布尔值，表示数值是否为成员

不可被遍历，因为成员是弱引用，随时可能消失，可能遍历过程中有成员不在了

## Map

键值对的数据类型，键和值都可以是任意数据结构，而 Object 的键只能是字符串或 Symbol

```js
const set = new Set([
    ["foo", 1],
    ["bar", 2],
]);
const m1 = new Map(set);
m1.get("foo"); // 1

const m2 = new Map([["baz", 3]]);
const m3 = new Map(m2);
m3.get("baz"); // 3
```

size: 返回 Map 实例的成员总数
set: 添加键值对，返回 Map 实例
get: 获取指定键对应的数据
has: 返回布尔值，表示 Map 内是否存在该键
delete: 删除某个键值对，返回布尔值，表示删除是否成功
clear: 清除所有成员，没有返回值

-   遍历

keys()
values()
entries()
forEach()

Map 的遍历顺序就是插入顺序

```js
map[Symbol.iterator] === map.entries; // true
```

## WeakMap

1. WeakMap 只接受对象(null 除外)和 Symbol 值作为键名
2. WeakMap 键名所指向的对象都是弱引用，不计入垃圾回收机制

有以下四个方法

get: 获取指定键对应的值
set: 设置新键值
has: 判断是否有指定键
delete: 删除指定键值

不可被遍历，因为成员是弱引用，随时可能消失，可能遍历过程中有成员不在了

# Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

```js
// 基本使用
var proxy = new Proxy(target, handler);
```

Proxy 支持的拦截操作一览，一共 13 种。

-   get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
-   set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
-   has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
-   deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
-   ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
-   getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
-   defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
-   preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
-   getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
-   isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
-   setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
-   apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
-   construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

Proxy.revocable

返回一个可取消的 Proxy 实例

```js
let target = {};
let handler = {};

let { proxy, revoke } = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo; // 123

revoke();
proxy.foo; // TypeError: Revoked
```

Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

# Reflect

设计目的:

1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法
2. 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false
3. 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。
4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

静态方法

-   Reflect.apply(target, thisArg, args)
-   Reflect.construct(target, args)
-   Reflect.get(target, name, receiver)
-   Reflect.set(target, name, value, receiver)
-   Reflect.defineProperty(target, name, desc)
-   Reflect.deleteProperty(target, name)
-   Reflect.has(target, name)
-   Reflect.ownKeys(target)
-   Reflect.isExtensible(target)
-   Reflect.preventExtensions(target)
-   Reflect.getOwnPropertyDescriptor(target, name)
-   Reflect.getPrototypeOf(target)
-   Reflect.setPrototypeOf(target, prototype)

# Promise

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 应用

```js
// 基本使用
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
// promise状态修改后的两个回调
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
// promise的传递性
const p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 5000)
});
const p2 = new Promise(function (resolve, reject) {
    resolve(p1);
})
console.log(p2) // pending
setTimeout(() => {
    console.log(p2) // fulfilled
}, 5100)
// 参数传递
Promise.resolve(222).then((data) => {
    console.log('then 1', data) // then 1 222
    return 111
}).then((data) => {
    console.log('then 2', data) // then 2 111
}).catch((e) => {
    console.log(e, e.message)
})
```

-   实例方法

then: 它会对之前的 promise 对象的状态变化回调不同方法，如果是跟在 `.then` 之后的 `.then` 方法，会将前面的 then 方法的 return 值，使用 Promise.resolve 进行转化

finally: 不管 promise 状态时 fulfilled 还是 rejected 都会执行，它的返回值类似 then 的 return

-   静态方法

Promise.all

```js
// 只有所有promise都变成fulfilled，Promise.all才会fulfilled，只要有任意一个rejected，Promise.all就会rejected
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return getJSON("/post/" + id + ".json");
});
Promise.all(promises)
    .then(function (posts) {
        // ...
    })
    .catch(function (reason) {
        // ...
    });
```

Promise.race

```js
// 只要有一个promise状态率先发生改变，它就会跟着变
// 只要fetch在5s内没有fulfilled就变为rejected
const p = Promise.race([
    fetch("/resource-that-may-take-a-while"),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error("request timeout")), 5000);
    }),
]);
p.then(console.log).catch(console.error);
```

Promise.allSettled

```js
// 每个promise都发生状态改变(不管是fulfilled还是rejected)，就会fulfilled
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
    console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

Promise.any

```js
// 任意一个promise状态变为fulfilled它就会fulfilled，所有promise都rejected它就会rejected
Promise.any([
    fetch("https://v8.dev/").then(() => "home"),
    fetch("https://v8.dev/blog").then(() => "blog"),
    fetch("https://v8.dev/docs").then(() => "docs"),
])
    .then((first) => {
        // 只要有一个 fetch() 请求成功
        console.log(first);
    })
    .catch((error) => {
        // 所有三个 fetch() 全部请求失败
        console.log(error);
    });
```

Promise.resolve

将数据转为 Promise 对象，有如下 4 种规则

1. 参数是一个 Promise 实例: 原封不动的返回这个实例
2. 参数是一个 thenable 对象(一个具有 then 方法的对象): 将这个对象转为 promise 对象然后立即执行`then()`方法

```js
let thenable = {
    then: function (resolve, reject) {
        resolve(42);
    },
};
let p1 = Promise.resolve(thenable);
p1.then(function (value) {
    console.log(value); // 42
});
```

3. 不带有任何参数: 返回一个 fulfilled 状态的 Promise 对象
4. 除上述 3 种情况的任意类型数据: 返回一个 fulfilled 状态的 Promise 对象，并将参数作为 promise resolve 时的值

Promise.reject

返回一个状态为 rejected 的 promise 对象，参数会作为 reject 的理由向下传递

Promise.try

当不想区分函数 f 时同步还是异步函数，就可以使用 `Promise.try` 包裹，然后统一当作 Promise 来处理它
