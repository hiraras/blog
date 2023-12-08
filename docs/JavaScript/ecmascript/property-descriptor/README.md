# 属性描述符

## 获取属性描述符

```js
const obj = { a: 1, b: 2 };
console.log(Object.getOwnPropertyDescriptor(obj, "a"));
// {
//     "value": 1,
//     "writable": true,
//     "enumerable": true,
//     "configurable": true
// }

console.log(Object.getOwnPropertyDescriptors(obj));
// {
//     "a": {
//         "value": 1,
//         "writable": true,
//         "enumerable": true,
//         "configurable": true
//     },
//     "b": {
//         "value": 2,
//         "writable": true,
//         "enumerable": true,
//         "configurable": true
//     }
// }
```

### writable 是否可以赋新值

```js
const obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(obj, "a", {
  writable: false,
});
obj.a = 3;
console.log(obj); // {a: 1, b: 2}
```

### enumerable 是否可以枚举

```js
const obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(obj, "a", {
  value: 3,
  enumerable: false,
});
console.log(obj); // {b: 2, a: 3}
console.log(Object.keys(obj)); // ['b']
for (let key in obj) {
  console.log(key); // b
}
```

### configurable 属性描述符本身是否可以再次修改，该属性是否可以删除

```js
const obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(obj, "a", {
  writable: true,
  configurable: false,
});
Object.defineProperty(obj, "a", {
  writable: false,
});
console.log(Object.getOwnPropertyDescriptor(obj, "a")); // 没实验成功
//     {
//     "value": 1,
//     "writable": false,
//     "enumerable": true,
//     "configurable": false
// }
delete obj.a;
delete obj.b;
console.log(obj); // {a: 1}
```

## 取值器(getter) & 设置器(setter)

```js
// 基本使用
// es5
const obj = {};
Object.defineProperty(obj, "a", {
  get() {
    return 1;
  },
  set(val) {
    console.log(val);
  },
});

obj; // {}
obj.a; // 1
obj.a = 10; // 输出10
obj.a; // 1

// class
class T {
  get a() {
    return 1;
  }
  set a(val) {
    console.log(val);
  }
}
```

```js
// 使用get与set的同时又想要普通属性的特性，需要借助额外的变量
const obj = {};
let innerA = undefined;
Object.defineProperty(obj, "a", {
  get() {
    return innerA;
  },
  set(val) {
    innerA = val;
  },
});
console.log(obj); // {}
console.log(obj.a); // undefined
obj.a = 10;
console.log(obj.a); // 10
```

```js
// 计算属性
const obj = { price: 20, amount: 10 };
Object.defineProperty(obj, "totalPrice", {
  get() {
    return this.price * this.amount;
  },
  // setter 不写就行
});
console.log(obj.totalPrice); // 200
```
