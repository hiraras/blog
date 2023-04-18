## 过滤出对象中值为 Function 类型的键

```TS
type FilterOptional<T extends {}> = Pick<T, { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T]>

type A = {
    name: string;
    age?: number;
    sex?: boolean;
    say(): void;
}

type B = FilterOptional<A>
```
