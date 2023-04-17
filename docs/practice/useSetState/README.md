## useSetState 代码

```TS
import { useState } from 'react';

type Update<T> = (patch: Partial<T> | ((data: T) => Partial<T>)) => void;

const useSetState = <T extends Record<string, any>>(initial: T = {} as T): [T, Update<T>] => {
    const [state, setState] = useState<T>(initial);

    // function update(patch: Partial<T>): void;
    // function update(patch: (data: T) => Partial<T>): void;
    function update(patch: Partial<T> | ((data: T) => Partial<T>)) {
        let newData: Partial<T> = {};
        if (typeof patch === 'function') {
            newData = patch(state);
        } else {
            newData = patch;
        }
        setState((s) => ({ ...s, ...newData }));
    }

    return [state, update];
};

export default useSetState;
```
