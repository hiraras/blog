# Carousel 代码

## Item.vue

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

## Carousel.vue

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

# 原生无缝轮播

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>轮播图</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        position: relative;
        left: 300px;
        border: 2px solid black;
        width: 300px;
        height: 180px;
        overflow: hidden;
      }
      .list {
        display: flex;
        white-space: nowrap;
        width: 300px;
        height: 180px;
      }
      .list div {
        width: 100%;
        flex-shrink: 0;
        font-size: 50px;
        line-height: 180px;
        text-align: center;
        color: #fff;
      }
      .item1 {
        background-color: deepskyblue;
      }
      .item2 {
        background-color: red;
      }
      .item3 {
        background-color: blueviolet;
      }
      .dots {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
        display: flex;
        gap: 10px;
      }
      .dots li {
        height: 20px;
        width: 20px;
        background-color: #fff;
        border-radius: 50%;
        opacity: 0.5;
        list-style: none;
        cursor: pointer;
      }
      .dots .active {
        opacity: 1;
      }
      .left,
      .right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .left {
        left: 5px;
      }
      .right {
        right: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="list">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
      </div>
      <div class="left">左</div>
      <div class="right">右</div>
      <ul class="dots">
        <li class="active"></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </body>
  <script>
    const doms = {
      list: document.querySelector(".list"),
      left: document.querySelector(".left"),
      right: document.querySelector(".right"),
      dots: document.querySelectorAll("ul li"),
    };
    const count = doms.dots.length;
    let currIndex = 0;

    function moveTo(i) {
      doms.list.style.transform = `translateX(-${i}00%)`;
      doms.list.style.transition = `0.5s`;
      const active = document.querySelector(".dots .active");
      active?.classList.remove("active");
      doms.dots[i].classList.add("active");
      currIndex = i;
    }

    doms.dots.forEach((item, i) => {
      item.onclick = function () {
        moveTo(i);
      };
    });

    function init() {
      const firstDom = doms.list.firstElementChild.cloneNode(true);
      const lastDom = doms.list.lastElementChild.cloneNode(true);
      doms.list.append(firstDom);
      doms.list.insertBefore(lastDom, doms.list.children[0]);
      // 保证添加头尾后，currIndex = 0还是对应原来的第一张
      doms.list.style.marginLeft = "-100%";
    }
    init();

    doms.left.onclick = function () {
      if (currIndex + 1 === count) {
        doms.list.style.transition = `none`;
        doms.list.style.transform = `translateX(100%)`;
        // moveTo里又添加了transtion，浏览器会执行完两段js后再触发渲染
        // 也就是说需要让浏览器先执行完无过渡的位移，再执行后续的moveTo方法
        // 有两种方法：1. 读取页面元素的几何信息，会强制浏览器渲染一次。2. 使用 requestAnimationFrame 等待浏览器渲染完跑过去后再滚动
        doms.list.getBoundingClientRect();
        moveTo(0);

        // requestAnimationFrame(function() {
        // 	moveTo(0)
        // })
      } else {
        moveTo(currIndex + 1);
      }
    };

    doms.right.onclick = function () {
      if (currIndex === 0) {
        doms.list.style.transition = `none`;
        doms.list.style.transform = `translateX(-${count}00%)`;
        doms.list.getBoundingClientRect();
        moveTo(count - 1);
      } else {
        moveTo(currIndex - 1);
      }
    };
  </script>
</html>
```
