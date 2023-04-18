## 切换主题的几种实现

### 原理

1. link 标签动态引入

提前准备好几套 css 主题样式文件，切换的时候创建 link 标签动态加载到 head 中，或者动态改变 link 标签的引用

#### 优点：

- 实现了按需加载，提高了首屏加载的性能

#### 缺点：

- 动态加载样式文件，如果文件过大会有加载延迟，导致切换不流畅
- 如果样式表定义不当，会有优先级问题
- 各个主体样式写死，后续不好维护

2. 提前引入所有主体样式，做类名切换

与第一种比较类似，为了解决反复加载样式文件问题提前将样式全部引入，在需要切换的时候将指定的根元素类名更换，相当于直接做了样式覆盖

#### 优点：

- 不用重新加载样式文件，切换时也不会有卡顿

#### 缺点：

- 首屏加载会牺牲一些时间加载样式资源（可用 preload 优化）
- 如果主题样式表内定义不当，也会有优先级问题
- 各个主体样式写死，后续不好维护

3. CSS 变量+类名切换

提前将样式文件引入，切换时将指定的根元素类名更换，不过使用的是根作用域下定义好的 CSS 变量，只需要在不同的主题下更改 CSS 变量对应的取值即可（VUE 官网）

#### 优点：

- 不用重新加载样式文件，在切换时不会卡顿
- 在需要切换主题的地方利用 var()绑定变量即可，不存在优先级问题
- 新增或修改主题方便灵活，仅需要新增或修改 CSS 变量即可

#### 缺点：

- IE 兼容

4. Vue3 新特性（v-bind），只能在 vue 中使用

```vue
<script setup>
// 这里可以是原始对象值，也可以是ref()或reactive()包裹的值，根据具体需求而定
const theme = {
  color: "red",
};
</script>
<template>
  <p>hello</p>
</template>
<style scoped>
p {
  color: v-bind("theme.color");
}
</style>
```

vue3 在 style 样式通过 v-bind()绑定变量的原理其实就是给元素绑定 CSS 变量，在绑定的数据更新时调用 CSSStyleDeclaration.setProperty 更新 CSS 变量值。

优缺点和 3 类似，同时只能在 Vue3 中使用，当应用达到一定量级性能也许也会有问题

5. 利用 SCSS 的 mixin 加类名切换

使用@mixin 定义混合样式，然后在切换时为根元素添加属性，使 mixin 中对应属性的样式生效

#### 优点：

基本和第 3 点一致

#### 缺点：

- 首屏需要加载更多的样式资源 6.使用 style.setProperty 修改变量

6. 前面几种方法除了第 4 点，都只适用于固定的主题，这种可用在用户自定义的主题颜色中

```TypeScript
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
    dom.style.setProperty(prop, val)
}
setCssVar('--theme-color', color)
```

上述调用方法，可以修改根节点的--theme-color 变量的值为指定的值

#### 优点：

- 不用重新加载样式文件，切换时不会有卡顿
- 可支持自定义主题
- 只需要动态修改根节点的变量值即可，不存在样式优先级问题

### 示例

#### 使用 @mixin

定义属性变量

```less
$background-color-theme: #d43c33; //背景主题颜色默认(网易红)
$background-color-theme1: #42b983; //背景主题颜色1(QQ绿)
$background-color-theme2: #333; //背景主题颜色2(夜间模式)
```

定义@mixin

```less
// 注意&表示混入的目标类名，这里指的就是下面的.header
// 这样[data-theme=theme1] & 表示[data-theme=theme1]子元素类名为header的元素被筛选到
@mixin bg_color() {
  background: $background-color-theme;
  [data-theme="theme1"] & {
    background: $background-color-theme1;
  }
  [data-theme="theme2"] & {
    background: $background-color-theme2;
  }
}
```

在类中混入样式

```less
.header {
  width: 100%;
  height: 100px;
  font-size: $font_medium;
  @include bg_color();
}
```

切换时为根元素添加属性标记

```js
document.documentElement.setAttribute("data-theme", "theme1");
```

这样当根元素添加了 data-theme=theme1 时，就能用上

```less
[data-theme="theme1"] & {
  background: $background-color-theme1;
}
```

#### 使用原生 css 变量

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>theme</title>
    <style>
      :root {
        --color: blue;
        --bg-color: green;
      }
      .dark {
        --color: white;
        --bg-color: black;
      }
      .day {
        --color: black;
        --bg-color: white;
      }
      .div {
        color: var(--color);
        background-color: var(--bg-color);
        height: 300px;
      }
    </style>
  </head>
  <body>
    <div class="div">我是文字</div>
    <button onclick="change()">default</button>
    <button onclick="change('day')">day</button>
    <button onclick="change('dark')">dark</button>
  </body>
  <script>
    function change(theme) {
      const other = theme === "day" ? "dark" : "day";
      document.documentElement.setAttribute("class", theme);
    }
  </script>
</html>
```
