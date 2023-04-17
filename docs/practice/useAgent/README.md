## useAgent 代码

```TS
import { useMemo, useState } from 'react';

type FunctionKeys<T extends Record<string, any>> = Pick<
    T,
    { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T]
>;
type OtherKeys<T extends Record<string, any>> = Pick<
    T,
    { [K in keyof T]-?: T[K] extends Function ? never : K }[keyof T]
>;

// 获取对象所有的键，包括继承链上的
const getAllKeys = (obj: Object) => {
    let proto = obj;
    const keys: (symbol | string)[] = [];
    while (proto !== null && proto.constructor !== Object) {
        keys.push(...Reflect.ownKeys(proto));
        proto = Reflect.getPrototypeOf(proto)!;
    }
    return keys.filter((key) => key !== 'constructor');
};

const useAgent = <T extends Record<string | symbol, any>>(initialState: T) => {
    const [v, setV] = useState(0);

    const proxyHandler = useMemo(() => {
        return {
            apply(target: Function, ctx: any, args: any) {
                // setV((v) => v + 1);
                return Reflect.apply(target, ctx, args);
            },
        };
    }, []);

    const s: OtherKeys<T> = useMemo(() => {
        console.log(initialState);
        const s: any = {};
        const keys = Object.keys(initialState).filter((key) => typeof initialState[key] !== 'function');
        keys.forEach((key) => {
            Object.assign(s, { [key]: initialState[key] });
        });
        return s;
    }, [initialState, v]);

    const methods: FunctionKeys<T> = useMemo(() => {
        const s: any = {};
        const keys = getAllKeys(initialState);
        keys.forEach((key) => {
            if (typeof initialState[key] === 'function') {
                Object.assign(s, { [key]: new Proxy(initialState[key], proxyHandler) });
            }
        });
        return s;
    }, [initialState, v]);

    return {
        state: s,
        methods,
    };
};

export default useAgent;

```
