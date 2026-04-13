# Intersection Observer

提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。

## API

```js
const ob = new IntersectionObserver(
    function (entries) {
        // 回调，entries为交互信息列表，存放了所有观察对象和root元素的交叉情况
        // 一些还未交叉的元素信息也会在里面，但是交叉信息（isIntersecting属性）会是false
    },
    {
        root: null, // 测试交叉时，用作边界盒的元素或文档。如果构造函数未传入 root 或其值为null，则默认使用顶级文档的视口。
        rootMargin: 0, // 指定root位置大小的基础上扩展多大的观察范围，单位为px或百分比，默认为“0px 0px 0px 0px”
        threshold: 0, // 值为 0-1，表示每个观察元素和根元素有多少交叉范围时触发。如0表示只要一交叉就触发，1为完全出现在根元素中，才触发，可以设置为数组[0,0.25,0.5,1]则4个位置都会触发
    }
);

// 观察某个元素
const box = document.querySelector(".box");
ob.observe(box);
// 解除观察
ob.unobserve(box);
```

## 示例

1. 以视口为根

```html
<style>
    * {
        margin: 0;
    }

    .box {
        background-color: aquamarine;
        height: 100vh;
    }

    .box2 {
        background-color: aqua;
    }

    .box3 {
        background-color: fuchsia;
    }
</style>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
```

```js
const ob = new IntersectionObserver(
    function (entries) {
        console.log(entries);
    },
    {
        threshold: 0,
    }
);
const boxes = document.querySelectorAll(".box");
for (let box of boxes) {
    ob.observe(box);
}
```

2. 以父元素为根

```html
<style>
    * {
        margin: 0;
    }

    .box {
        background-color: aquamarine;
        height: 100vh;
    }

    .box2 {
        background-color: aqua;
    }

    .box3 {
        background-color: fuchsia;
    }

    .modal {
        width: 300px;
        height: 300px;
        background-color: black;
        max-height: 100vh;
        overflow-y: auto;
    }
</style>
<div class="modal">
    <div class="box"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
</div>
```

```js
const ob = new IntersectionObserver(
    function (entries) {
        console.log(entries);
    },
    {
        root: document.querySelector(".modal"),
        threshold: 0,
    }
);
const boxes = document.querySelectorAll(".box");
for (let box of boxes) {
    ob.observe(box);
}
```

## 使用注意点

用以下虚拟列表和懒加载的 demo 说明注意点

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>虚拟列表和懒加载</title>
        <style>
            #list {
                width: 100%;
            }
            .item {
                height: 50px;
                border: 1px solid #ccc;
                line-height: 50px;
            }
        </style>
    </head>
    <body>
        <div id="container" style="height: 500px; overflow-y: auto">
            <div id="scroll" style="position: relative">
                <div
                    id="list"
                    style="position: absolute; left: 0; top: 0"
                ></div>
            </div>
            <!-- 如果触底哨兵高度为0可能产生几个问题: 1. threshold > 0 基本失效；2. 不同浏览器/场景下回调时机可能不一样；调试困难：你看到 isIntersecting 变化，但 intersectionRatio 一直不具参考价值 -->
            <!-- 设置为1px 几乎没有成本，但能避免很多边界问题 -->
            <div id="observer" style="height: 1px"></div>
        </div>

        <script>
            const container = document.getElementById("container");
            const scroll = document.getElementById("scroll");
            const list = document.getElementById("list");
            const obDom = document.getElementById("observer");
            let start = 0;
            let data = [];

            function delay() {
                return new Promise(function (resolve) {
                    setTimeout(() => {
                        resolve();
                    }, 300);
                });
            }

            async function getData() {
                await delay();
                start += 10;
                return new Array(10)
                    .fill(0)
                    .map((_, index) => index + start - 10);
            }

            const itemHeight = 50;
            const visibleCount = Math.ceil(500 / itemHeight);

            // 撑开总高度
            scroll.style.height = data.length * itemHeight + 20 + "px";

            function render() {
                const scrollTop = container.scrollTop;

                const start = Math.floor(scrollTop / itemHeight);
                const end = start + visibleCount;

                const visibleItems = data.slice(start, end);

                list.innerHTML = visibleItems
                    .map(
                        (i) => `
          <div style="height:${itemHeight}px;border:1px solid #ccc;line-height:${itemHeight}px">
            Item ${i}
          </div>
        `
                    )
                    .join("");

                list.style.transform = `translateY(${start * itemHeight}px)`;
            }

            container.addEventListener("scroll", render);

            render();

            const preloadBottom = 200;
            let loading = false;

            function isObserverWithinPreloadRange() {
                const rootRect = container.getBoundingClientRect();
                const obRect = obDom.getBoundingClientRect();
                return obRect.top <= rootRect.bottom + preloadBottom;
            }

            async function appendData() {
                const newData = await getData();
                data = [...data, ...newData];
                scroll.style.height = data.length * itemHeight + 20 + "px";
                render();
            }

            async function loadMoreIfNeeded() {
                if (loading) return;
                loading = true;
                try {
                    while (isObserverWithinPreloadRange()) {
                        await appendData();
                    }
                } finally {
                    loading = false;
                }
            }

            const observer = new IntersectionObserver(
                async (entries) => {
                    // 进入和离开都会触发，进入的时候isIntersecting为true
                    if (!entries[0].isIntersecting) {
                        return;
                    }
                    await loadMoreIfNeeded();
                },
                {
                    root: container,
                    rootMargin: `0px 0px ${preloadBottom}px 0px`, // 触底200px之前就触发，相当于扩大观察视口的大小，到达底部200px的时候提前触发
                }
            );
            observer.observe(obDom);
        </script>
    </body>
</html>
```
