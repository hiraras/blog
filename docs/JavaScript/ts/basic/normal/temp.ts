type A = {
    a: string;
    b?: number;
    c: string;
};

type Optional<T> = {
    [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};
// 选出所有属性可以可选的键
type B = Optional<A>;

let b: B = {};

type F = { a: string } extends { a: string; b?: number } ? true : false;

type Z = string | undefined extends string ? true : false;

type Direction = "up" | "down" | "left" | "right";

// 设置属性可选
type O = {
    [P in Direction]?: string;
};

const o: O = {
    down: "down",
};

type R = {
    a?: number;
    b?: number;
};
// 设置属性必选
type Re = {
    [P in keyof R]-?: R[P];
};

const re: Re = {
    a: 1,
    b: 2,
};

type P = {
    a: number;
    b: string;
    c?: boolean;
    d?: (x: number) => number;
};

type P2 = {
    a: number;
};

type Pi<T, U> = {
    [K in keyof T as K extends U ? K : never]: T[K];
};

const pi: Pi<P, keyof P2> = {
    a: 1,
};

type Reco<T extends keyof any, U> = {
    [P in T]: U;
};

type Ex<T, U> = T extends U ? never : T;

type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
