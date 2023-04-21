## this 指向

## 全局环境

```js
(function () {
  console.log(this); // window对象
})();
```

```js
"use strict";
(function () {
  console.log(this); // 严格模式为undefined
})();
```

## 在对象上被调用，指向该对象

```js
const people = {
  name: "ming",
  say() {
    console.log(this.name);
  },
};
people.say(); // ming
```

## 构造函数中指向实例

```js
function People(name) {
  this.name = name;
}
const p = new People("ming");
console.log(p.name); // ming
```

## 使用 apply/call 调用时，指向绑定的对象

```js
const obj = {
  a: 1,
  test() {
    console.log(this.a);
  },
};
const obj2 = {
  a: 2,
};
obj.test.call(obj2); // 2
obj.test.apply(obj2); // 2
```

## 箭头函数，没有自己的 this，因此将函数创建时的作用域内的 this 作为自己的 this

```js
const obj = {
  test: () => {
    console.log(this); // window对象，创建该对象时在全局环境下
  },
};
obj.test();

const obj2 = {
  test() {
    const inner = () => {
      console.log(this === obj2); // true
    };
    inner();
  },
};
obj2.test();
```
