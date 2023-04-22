## 作用域与闭包

### 作用域

作用域具体指的是变量的作用域，表示在一个函数/全局环境中去使用一个变量时，能否取到该变量

在全局环境和函数执行的时候，会各自产生一个上下文，上下文保存着各自定义的变量(像洋葱圈一样，一圈一圈的)，且内层上下文可以取到外层上下文中的变量，而无法取到内层中的变量

```js
const a = 1;
function test() {
  console.log(a); // 1
}
test();
```

```js
// 这种情况下 a 会被声明为全局变量
(function () {
  a = 1;
})();
console.log(a);
```

```js
function test() {
  var a = 1;
}
console.log(a); // 报错 a is not defined，外层变量无法访问到内部变量
```

### 闭包

利用函数执行时，参数会作为内部变量被保存在函数上下文，且内层作用域和上层作用域会一直存在，不被垃圾回收的特性，让程序员可以保留变量和访问函数内部变量的实现

#### 应用

1. 使用闭包保存变量

```js
// 输出 10 个 10，因为执行函数的时候取的都是同一个变量，即加到 10 的 i
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 利用传参的方式应用闭包，将每次+1的i保留在每次生成的上下文中
// 输出 0-9
for (var i = 0; i < 10; i++) {
  setTimeout(
    (i) => {
      console.log(i);
    },
    1000,
    i
  );
}

// let 因为作用域不需要闭包也能按期望输出
// 输出 0-9
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

2. 使用闭包防止全局污染

```js
var Counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```

3. 外层访问函数内层变量

```js
const fn = (function () {
  var a = 1;
  return function () {
    console.log(a);
  };
})();
fn(); // 1
```
