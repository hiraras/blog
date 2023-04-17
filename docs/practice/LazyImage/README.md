## LazyImage 代码

### Image.vue

```Vue
<script setup>
import { onMounted, ref, watchEffect } from "@vue/runtime-core";

const props = defineProps(["src", "noDataHeight"]);

const imgRef = ref(null);

const loading = ref(true);

const style = { height: `${props.noDataHeight}px` };

watchEffect(() => {
    if (imgRef.value && props.src) {
        imgRef.value.src = props.src;
        imgRef.value.onload = () => {
            loading.value = false;
        };
    }
});
</script>

<template>
    <div class="image">
        <img v-show="!loading" ref="imgRef" class="img" />
        <div v-show="loading" class="no-data" :style="style">loading</div>
    </div>
</template>

<style scoped>
.img {
    width: 100%;
}
.no-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(245, 247, 250);
    color: #666;
}
</style>
```

### LazyImage.vue

还可以试用 IntersectionObserver 观察图片的出现，默认视口为窗口（或根元素）

```Vue
<script setup>
import { computed, onMounted, onUnmounted, ref } from "@vue/runtime-core";
import Image from "./Image.vue";
const props = defineProps(["imgList", "className"]);

const ctnRef = ref(null);
const noDataHeight = 300;

const count = ref(0);
const loadedList = computed(() => {
    return props.imgList.slice(0, count.value);
});

const calc = () => {
    if (ctnRef.value) {
        const { clientHeight, scrollTop } = ctnRef.value;
        const imgs = [...ctnRef.value.getElementsByClassName("image")];
        imgs.forEach((dom, index) => {
            const top = imgs.reduce((t, img, i) => {
                return t + (index > i ? img.getBoundingClientRect().height : 0);
            }, 0);
            if (scrollTop + clientHeight + 20 > top) {
                count.value = index + 1;
            }
        });
    }
};

const scrollHandler = (e) => {
    calc();
};

onMounted(() => {
    calc();
    ctnRef.value.addEventListener("scroll", scrollHandler, false);
});

onUnmounted(() => {
    ctnRef.value.removeEventListener("scroll", scrollHandler, false);
});
</script>

<template>
    <div :class="['lazy-image', className]" ref="ctnRef">
        <Image
            v-for="index in imgList.length"
            :key="index"
            :src="loadedList[index - 1]"
            :noDataHeight="noDataHeight"
        />
    </div>
</template>

<style scoped>
.lazy-image {
    width: 100%;
    min-height: 500px;
    max-height: 1000px;
    overflow: auto;
}
</style>
```
