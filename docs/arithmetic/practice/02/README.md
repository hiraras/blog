## 深拷贝

1. 使用 JSON.stringify 和 JSON.parse

```js
const obj = {
  bike: {
    brand: "giant",
  },
  name: "jack",
};

const clone = JSON.parse(JSON.stringify(obj));
clone.bike.brand = "xds";
console.log(JSON.stringify(obj)); // {"bike":{"brand":"giant"},"name":"jack"}
console.log(JSON.stringify(clone)); // {"bike":{"brand":"xds"},"name":"jack"}
```

**优点：**

- 简单且适用于大部分场景

**缺点：**

- 一些特殊类型会被忽略（值为 Symbol、键为 Symbol、值为 function、值为 undefined）
- date 对象会调用 toJSON 方法
- 正则表达式、Set、Map 会转为{}
- 值为 BigInt 类型的会报错
- 会丢失原型链的信息
- 会丢失循环引用

2. 使用递归(基础版)

```js
function deepClone(target) {
  const BASE_TYPE_LIST = [
    "string",
    "number",
    "boolean",
    "symbol",
    "function",
    "bigint",
  ];
  if (
    target === null ||
    target === undefined ||
    BASE_TYPE_LIST.includes(typeof target) ||
    target instanceof Date ||
    target instanceof RegExp
  ) {
    return target;
  }

  const result = new target.constructor();

  let keys = [];
  if (target instanceof Map || target instanceof Set) {
    keys = [...target.keys()];
  } else {
    keys = Object.keys(target);
  }
  for (let key of keys) {
    if (target instanceof Map) {
      const value = target.get(key);
      result.set(key, deepClone(value));
    }
    if (target instanceof Set) {
      const value = key;
      result.add(deepClone(value));
    } else {
      const value = target[key];
      result[key] = deepClone(value);
    }
  }
  return result;
}
```

```js
// 测试用例
class Build {
  x = 1;
  constructor(height) {
    this.height = height;
  }
}

const pro = { s: "xxx" };
Reflect.setPrototypeOf(pro, { d: "ddd" });

const obj = {
  a: 1,
  b: "string",
  c: new Map([[1, 2]]),
  d: new Set([2, 3, 4]),
  e: [9999],
  f: {
    t: true,
    g: {
      h: "ssss",
    },
  },
  house: new Build(20),
  pro,
};

console.log(deepClone("1"));
console.log(deepClone(1));
console.log(deepClone(true));
console.log(deepClone(Symbol()));
console.log(deepClone(() => {}));
console.log(deepClone(10n));
console.log(deepClone());
console.log(deepClone(null));

const clone = deepClone(obj);
clone.c.set(2, 3);
clone.d.add(5);
clone.e.push(10000);
clone.f.t = false;
clone.f.g.h += "r";
clone.house.height = 30;
clone.pro.s += "l";

console.log(obj);
console.log(clone);
console.log(clone.pro.d);
```

**优点：**

- 对各种类型的数据都进行了深拷贝

**缺点：**

- 没有解决循环引用的问题
- 丢失了原型链（如果是构造函数创建的对象不会丢失，但如果是使用`.__proto__`实现继承则会丢失）
- 效率比 JSON 的方式低

3. 完整版（继承、递归）

```js
function deepClone(target, wm = new WeakMap()) {
  const BASE_TYPE_LIST = [
    "string",
    "number",
    "boolean",
    "symbol",
    "function",
    "bigint",
  ];
  if (
    target === null ||
    target === undefined ||
    BASE_TYPE_LIST.includes(typeof target) ||
    target instanceof Date ||
    target instanceof RegExp
  ) {
    return target;
  }

  const result = new target.constructor();
  Object.setPrototypeOf(result, Object.getPrototypeOf(target));

  if (!wm.has(target)) {
    wm.set(target, result);
  } else {
    return wm.get(target);
  }

  let keys = [];
  if (target instanceof Map || target instanceof Set) {
    keys = [...target.keys()];
  } else {
    keys = Object.keys(target);
  }
  for (let key of keys) {
    if (target instanceof Map) {
      const value = target.get(key);
      result.set(key, deepClone(value, wm));
    }
    if (target instanceof Set) {
      const value = key;
      result.add(deepClone(value, wm));
    } else {
      const value = target[key];
      result[key] = deepClone(value, wm);
    }
  }
  return result;
}
```

```js
// 测试用例
class Build {
  x = 1;
  constructor(height) {
    this.height = height;
  }
}

const pro = { s: "xxx" };
Reflect.setPrototypeOf(pro, { d: "ddd" });

const obj = {
  a: 1,
  b: "string",
  c: new Map([[1, 2]]),
  d: new Set([2, 3, 4]),
  e: [9999],
  f: {
    t: true,
    g: {
      h: "ssss",
    },
  },
  house: new Build(20),
  pro,
};

console.log(deepClone("1"));
console.log(deepClone(1));
console.log(deepClone(true));
console.log(deepClone(Symbol()));
console.log(deepClone(() => {}));
console.log(deepClone(10n));
console.log(deepClone());
console.log(deepClone(null));

const clone = deepClone(obj);
clone.c.set(2, 3);
clone.d.add(5);
clone.e.push(10000);
clone.f.t = false;
clone.f.g.h += "r";
clone.house.height = 30;
clone.pro.s += "l";

console.log(obj);
console.log(clone);
console.log(clone.pro.d);

const loopObj = { a: 1 };
loopObj.l = loopObj;

const cloneLoopObj = deepClone(loopObj);
cloneLoopObj.a = 2;
console.log(loopObj);
console.log(cloneLoopObj);
```

**优点：**

- 对各种类型的数据都进行了深拷贝
- 保持了循环引用
- 保持了原型链

**缺点：**

- 效率比 JSON 的方式低
