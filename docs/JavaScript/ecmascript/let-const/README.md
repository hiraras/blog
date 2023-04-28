## let 和 const

let 和 const 是 es6 中新增的声明变量的命令

### let 用法

```js
let i = 0;
const j = 1;
```

1. 只能在声明它们的作用域块中使用，否则会报错

```js
{
  let a = 1;
}
console.log(a); // ReferenceError： a is not defined
```

2. 不存在变量提升

```js
console.log(a); // 不报错，输出undefined
var a = 1;

console.log(a); // 不报错，输出undefined
let a = 1; // 报错，ReferenceError: Cannot access 'a' before initialization
```

3. 暂时性死区

当变量在某个代码块中声明了，则该代码块就会绑定该变量，声明的变量必须在声明语句后使用，否则会报错

```js
let a = 1;
{
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 2;
}
```

4. 不允许重复声明

```js
// 1.
{
  let a = 1;
  let a = 2; // SyntaxError: Identifier 'a' has already been declared
}
// 2.
{
  let a = 1;
  var a = 2; // SyntaxError: Identifier 'a' has already been declared
}
// 3.
function func(arg) {
  let arg; // SyntaxError: Identifier 'arg' has already been declared
}
func();
// 4. 不报错
function func(arg) {
  {
    let arg;
  }
}
func();
```

### const 用法

const 的用法与 let 大致一样，区别如下：

1. 变量声明后，变量的值无法改变，如果是复杂类型，则复杂类型的引用无法改变，但复杂类型的属性是可以改变的
2. 基于第一条，变量在声明时就需要赋值

```js
const a = 1;
a = 2; // TypeError: Assignment to constant variable.
```

```js
const a; // SyntaxError: Missing initializer in const declaration
```

```js
const obj = { a: 1 };
obj.a = 2; // 不报错

const arr = [1, 2, 3];
arr.length = 1;
console.log(arr); // [1]
```

如果要冻结对象可以使用 Object.freeze，冻结的对象非严格模式下不会生效，严格模式下会报错

```js
const arr = [1, 2, 3];
Object.freeze(arr);
arr.length = 1;
console.log(arr); // [1, 2, 3]
```
