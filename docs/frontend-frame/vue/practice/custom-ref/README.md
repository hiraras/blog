# customRef

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

它接受一个工厂函数作为参数，这个工厂函数接受`track`和`trigger`两个函数作为参数，并返回一个带有`get`和`set`方法的对象

track: 调用就会进行依赖收集
trigger: 调用后会触发派发更新

一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

## 这里是 customRef api 的使用示例

### debounce & v-model

一般情况下使用 v-model 绑定 input

```vue
<script setup>
import { ref } from "vue";
import { debounce } from "./utils";
const text = ref("");

function update(e) {
  text.value = e.target.value;
}

const handleUpdate = debounce(update);
</script>

<template>
  <input :value="text" @input="handleUpdate" />
  <p>{{ text }}</p>
</template>

<style scoped></style>
```

```js
export function debounce(func, delay = 1000) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, delay);
  };
}
```

使用 customRef 实现防抖

```vue
<script setup>
import { debounceRef } from "./utils/customRefs";
const text = debounceRef("");
</script>

<template>
  <input v-model="text" />
  <p>{{ text }}</p>
</template>

<style scoped></style>
```

```js
import { customRef } from "vue";

export function debounceRef(value, delay = 1000) {
  let timer = null;
  return customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(val) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        value = val;
        trigger();
      }, delay);
    },
  }));
}
```
