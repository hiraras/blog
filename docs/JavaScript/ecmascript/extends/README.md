## JavaScript 的继承/原型链

继承是指：当在一个对象上取值时，如果该对象上没有对应的键，会继续沿着原型链向上查找，直到找到 `null`，还是没有的话则返回 `undefined`

原型链是指：一个对象的 `__proto__` 属性指向另一个对象，该对象还可以继续向上寻找父类，直到为 null，这样的一条链式结构就是原型链

**原型链：**

<img :src="$withBase('/img/extends.jpg')" />

### ES5

```js
function Build() {}
const b = new Build();
b.key = 1;

function House() {}

House.prototype = b;
console.log(new House().key); // 1
```

### ES6

ES6 使用 class 实现继承，实际上是 Function 的语法糖，不过有些不一样的地方

- 不能当函数使用，必须使用 `new` 调用
- 类中定义的方法在 prototype 上，且不可被枚举
- 有 3 条继承链
- 不存在提升

```js
class Build {
  key = 1;
  static s = 2;
  test() {} // 会定义在 Build.prototype 上
}

class House extends Build {}

console.log(new House().key); // 1

// 同时
House.__proto__ === Build; // 类的继承，true
new House().__proto__ === House.prototype; // 原型链的继承 true
House.s === 2; // 静态属性的继承 true
```
