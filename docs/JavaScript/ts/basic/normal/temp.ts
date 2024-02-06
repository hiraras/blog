type A = {
  a: string;
  b?: number;
  c: string;
};

type Optional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

type B = Optional<A>;

let b: B = {};

type F = { a: string } extends { a: string; b?: number } ? true : false;
