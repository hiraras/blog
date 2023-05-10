## 正则

### {}

- 量词，匹配多个相同的模式
- es6 新增了 u 修饰符，多了一种表示字符的方式

```js
/^(ab){3}$/.test('ababab') // true，匹配3个 ab
/^(ab){3,}$/.test('abababa') // false，匹配3个及以上的 ab，结尾的 a 没匹配上
/^(ab){3,}$/.test('abababab') // true，匹配3个及以上的 ab
/^(ab){3,5}$/.test('ababababab') // true，匹配3-5个 ab
```

```js
// 新的字符表示方式
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
/\u{61}/.test('a') // false，没有u修饰符被解释为量词，即匹配61个u
```

### 问号相关

- 匹配 0|1 个模式
- 前瞻
  exp1(?=exp2) 查找 exp2 前面的 exp1
- 后顾
  (?<=exp2)exp1 查找 exp2 后面的 exp1
- 负前瞻
  exp1(?!exp2) 查找后面不是 exp2 的 exp1
- 负后顾
  (?<!exp2)exp1 查找前面不是 exp2 的 exp1

### 示例

```js
/^(ab)?$/.test('') // true
/^(ab)?$/.test('ab') // true
```

```JavaScript
const { log: lg } = console
function func1() {
    let str = '1234567890123';
    let re = /\B(?=(\d{3})+\b)/g;
    let re2 = /\B(?=(\d{3})+$)/g;
    lg('func1:', str.replace(re, ','), str.replace(re2, ','))
}
func1()
function func2() {
    // (?:)表示非捕获分组，匹配到的组不会作为match的子组参数
    let str = 'abc123def'
    let re = /(?:[a-z]+)(\d+)/
    let re2 = /([a-z]+)(\d+)/
    lg('func2:', str.match(re), str.match(re2))
}
func2()

function func3() {
    // def(?!abc)表示匹配def后不接abc的def，且括号内不为捕获分组
    let str = 'defabcdef'
    let re = /def(?!abc)/
    lg('func3:', str.match(re)) // 匹配到了最后的def
}
func3()
```

结果

<img :src="$withBase('/img/js-ecma-regexp-01.png')" />

### 具名匹配组：

匹配到的内容可以通过 exec 返回的结果对象的 groups 属性上取到(result.groups.name)，如果没有匹配到，则 groups 对象上会有 name 这个键，但是值为 undefined

```JavaScript
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // "1999"
const month = matchObj.groups.month; // "12"
const day = matchObj.groups.day; // "31"
```

具名匹配组的引用：\k<组名>

与(xx)\1 的引用一样的意思

一个有意思的例子：

```JavaScript
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>') // '02/01/2015'
```
