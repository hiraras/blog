## InfiniteScroll 代码

```JavaScript
const vInfiniteScroll = {
    mounted(el, binding) {
        el.eventHandler = (e) => {
            const { clientHeight, scrollHeight, scrollTop } = e.target;
            if (scrollTop + clientHeight > scrollHeight - 10) {
                binding.value();
            }
        };
        el.addEventListener("scroll", el.eventHandler, false);
    },
    unmounted(el) {
        el.removeEventListener("scroll", el.eventHandler, false);
    },
};
```

## 用法

```Vue
<script setup>
const load = () => {
    count.value += 2;
};
</script>

<template>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">
            {{ i }}
        </li>
    </ul>
</template>
```
