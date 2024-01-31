type A = {
  a?: number;
  b: string;
};

type B = Required<A>;

const a: B = {
  b: "2",
  a: 1,
};

type F = string extends string ? true : false;
type F2 = string extends number ? true : false;
