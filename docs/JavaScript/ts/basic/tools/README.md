## 类型工具

### 原生

1. Omit：去除对象类型的 key

```ts
interface A {
  a: number;
  b: string;
  c: boolean;
}

interface B {
  a: string;
  b: number;
}

// 两种方式一样
type T = Omit<A, "a" | "b">;
type T2 = Omit<A, keyof B>;
```

2. Partial：将对象的所有 key 变为非必须

```ts
interface A {
  a: string
  b: number
}

type PA = Partial<A>
// 等同于
type PA = interface {
    a?: string
    b?: number
}
```

3. Required: 将对象所有的 key 变为必须

```ts
type A = {
  a?: number;
  b: string;
};

type B = Required<A>;

const a: B = {
  b: "2",
  a: 1,
};
```

4. Pick: 从一个对象中取出其中指定的 key，组成一个新的对象

```ts
interface A {
  a: number;
  b: string;
  c: boolean;
}

type Pi = Pick<A, "a" | "b">;

// 第二个参数需要从 keyof A 的集合中取，超过了会报错
type Pi = Pick<A, "a" | "b" | "d">; // 报错

const pi: Pi = {
  a: 1,
  b: "2",
  c: true, // 报错
};
```

5. Readonly：将对象的 key 都设为 readonly

```ts
type R = Readonly<A>;

const r: R = {
  a: 1,
  b: "2",
  c: true,
};

r.a = 2; // 报错
```

6. Record：创建一个对象，对象的所有键的类型为第一个参数，键对应的值的类型都为第二个参数

```ts
const obj: Record<string, number> = {
  1: 1, // 正常
  2: "", // 报错
  [Symbol()]: 2, // 正常
};
```

7. Exclude：去除或集合中的某些元素

```ts
type T = Exclude<1 | 2 | 3, 1>;
const t: T = 1; // 报错
const t: T = 4; // 报错
const t: T = 2; // ok
const t: T = 3; // ok
```

8. ReturnType：获取函数类型的返回类型

```ts
function test(a: number | string) {
  if (typeof a === "string") {
    return "1";
  }
  return 1;
}

type Return = ReturnType<typeof test>;

const re: Return = "1"; // ok
const re: Return = 1; // ok
const re: Return = 2; // 报错
```

9. Parameters：获取函数的参数类型，参数列表是元组类型

```ts
function test(a: number | string, b: string) {
  if (typeof a === "string") {
    return "1";
  }
  return 1;
}
type Param = Parameters<typeof test>;
const p: Param = [2, "2"]; // ok
const p: Param = [true, "2"]; // 报错
const p: Param = [2, 2]; // 报错
```

### 自定义

将类型 T 中，存在于 U 的 key 去除

```js
type ExcludeKeys<T, U> = Pick<T, Exclude<keyof T, keyof U>>
```
