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
