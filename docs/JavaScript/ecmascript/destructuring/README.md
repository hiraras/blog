## 解构赋值

### 通过结构赋值声明变量

**数组**

按照对应的位置，对变量赋值

```js
const [a, b, c] = [1, 2, 3]; // abc分别为123
```

```js
const [a, b, [d, c]] = [1, 2, [4, 3]]; // abcd分别为1234
```

```js
const [a, b, [, c]] = [1, 2, [4, 3]]; // abc分别为123
```

```js
const [a, ...rest] = [1, 2, 3, 4]; // a为1，rest为[2, 3, 4]
```

若没有匹配到则为`undefined`，rest 为`[]`

```js
const [a, ...rest] = []; // a为undefined，rest为[]
```

**如果等号的右边不是可遍历结构，则会报错**

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

默认值，当匹配的值严格等于(===)undefined，会启用默认值

```js
const [a = 1] = []; // a为1
const [b = 1] = [null]; // b为null
```

**对象**

```js
const { a, b } = { a: 1, b: 2 }; // a为1，b为2
// 对象的解构赋值与位置无关
const { c, d } = { d: 1, c: 2 }; // c为2，d为1
```

**实际上对象的解构赋值匹配的是模式**

```js
const { a: b } = { a: 1 }; // a未定义，b为1
```

```js
// const { a } = { a: 1 }; // 等同于如下写法
const { a: a } = { a: 1 }; // a为1
```

```js
let obj = {
  p: ["Hello", { y: "World" }],
};

let {
  p,
  p: [x, { y }],
} = obj;
x; // "Hello"
y; // "World"
p; // ["Hello", {y: "World"}]
```

```js
const { a, ...rest } = { a: 1, b: 2, c: 3 }; // a为1，rest为{b:2,c: 3}
```

默认值，当匹配的值严格等于(===)undefined，会启用默认值

```js
const { a = 1, ...rest } = {}; // a为1，rest为{}
```

```js
// 对于已经声明的变量
let x;
// {x} = {x: 1} // 报错
({ x } = { x: 1 }); // 不报错
```

**字符串**

```js
const [a, b] = "12"; // a为'1',b为'2'
const { length } = "12"; // length为2
```

**数值和布尔值**

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

**函数参数**

与上述的类似

```js
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3
```

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

### 应用

1. 交换变量的值

```js
let x = 1;
let y = 2;
[x, y] = [y, x];
```

2. 函数参数定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

3. 参数默认值

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {}
) {
  // ... do stuff
};
```

4. 帮助遍历 map 结构

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
// map的默认iterator方法为entries
for (let [key, value] of map) {
  console.log(key, value);
}
// a 1
// b 2
```
