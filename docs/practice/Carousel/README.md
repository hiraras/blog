## Carousel 代码

### Item.vue

```Vue
<script setup>
import { ref } from "vue";
const { className } = defineProps(["className"]);
</script>

<template>
    <div :class="[`carousel-item`, className]">
        <slot></slot>
    </div>
</template>

<style scoped>
.carousel-item {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 60px;
    line-height: 60px;
}
.carousel-animation {
    transition: all 0.5s;
    z-index: 2;
}
</style>

```

### Carousel.vue

```Vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const { auto = true, duration = 3000 } = defineProps(["auto", "duration"]);

const current = ref(0);

const carouselDom = ref(null);
let timer = null;

const count = ref(0);

const refreshClass = (next, prev) => {
    const children = [...document.getElementsByClassName("carousel-item")];
    const width = carouselDom.value?.clientWidth;

    for (let i = 0; i < children.length - 1; i++) {
        children[(next + i) % children.length].style.left = `${i * width}px`;
    }

    // const prev = (next - 1 + children.length) % children.length;
    children[
        (next - 1 + children.length) % children.length
    ].style.left = `-${width}px`;

    children.forEach((child) => {
        child.classList.remove("carousel-animation");
    });

    if (children[prev]) {
        children[prev].classList.add("carousel-animation");
    }

    children[next].classList.add("carousel-animation");
};

const init = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        const children = document.getElementsByClassName("carousel-item");
        const next = (current.value + 1) % children.length;
        refreshClass(next, current.value);
        current.value = next;
    }, duration);
};

onMounted(() => {
    const children = [...document.getElementsByClassName("carousel-item")];
    if (children.length) {
        count.value = children.length;
        refreshClass(current.value);
    }

    if (!auto) {
        return;
    }

    init();
});

onUnmounted(() => {
    clearInterval(timer);
});

const change = (item) => {
    refreshClass(item, current.value);
    current.value = item;
    if (!auto) {
        return;
    }
    init();
};
</script>

<template>
    <div class="carousel" ref="carouselDom">
        <slot>暂无数据</slot>
        <ul class="carousel-points">
            <li
                v-for="item in count"
                :key="item"
                class="carousel-point"
                @click="change(item - 1)"
            ></li>
        </ul>
    </div>
</template>

<style>
.carousel {
    position: relative;
    overflow: hidden;
    height: 300px;
    background-color: transparent;
}
.carousel-points {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 24px;
    z-index: 100;
    bottom: 20px;
}
.carousel-point {
    width: 20px;
    height: 4px;
    background: gray;
    display: inline-block;
    cursor: pointer;
}
</style>
```

## 用法

```Vue
<template>
    <Carousel :auto="false">
        <CarouselItem className="item1">1</CarouselItem>
        <CarouselItem className="item2">2</CarouselItem>
        <CarouselItem className="item3">3</CarouselItem>
        <CarouselItem className="item2">4</CarouselItem>
    </Carousel>
</template>
```
