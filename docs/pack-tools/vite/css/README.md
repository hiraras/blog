# vite & css

## vite 中对 css 以及 css 模块化的处理

vite 天生就支持对 css 文件的直接处理

对 css 文件的处理过程

1. vite 读取到 css 文件的引用后，直接去使用 fs 模块读取 css 文件的代码
2. 创建一个 style 标签，将读取到的内容 copy 进 style 标签里
3. 将 style 标签插入到 index.html 的 head 中
4. 另外，将该 css 文件的内容替换为 js 脚本（方便热更新和 css 模块化），同时设置 Content-Type 为 js，从而让浏览器以 JS 脚本的形式来执行该 css 后缀文件

## css 模块化

1. 将 css 文件命名为 `xxx.module.css`
2. 导入该 css 文件的时候使用 default 方式 `import styles from './xxx.module.css'`
3. styles 变量是个对象，保存了 css 文件的类名作为键，带 hash 值的真实类名为值
4. 使用的时候使用 `styles.类名` 来使用，注入到 html 中的 css 类型就是带 hash 的类名

原理：

1. module 是一种约定，表示开启 css 模块化
2. 他会将你的所有类名进行一定进行规则的替换
3. 同时创建一个映射对象
4. 将替换后的内容塞入 style 标签然后放入 head 标签中
5. 将原 css 文件抹除，替换为 js 脚本（同 css 文件的处理方式）
6. 将创建的映射对象在脚本中进行默认导出

## less 预处理器

只需要安装 less npm 包，同时开启 css 模块化也是命名文件为 `xxx.module.less`

## vite 配置文件中 css 配置流程（preprocessorOptions 篇）

主要是用来配置 css 预处理的一些全局参数

```js
// 在config文件中
{
  // ...,
  css: {
    preprocessorOptions: { // key + config，key代表预处理器的名
      less: {}, // 整个配置对象都会最终给到less的行参数（全局参数）
      sass: {}
    }
  }
}
```

如果没有使用构建工具，我们又想去编译 less 文件的话，需要安装 less 包，并使用 lessc 来编译

```r
yarn add less # lessc的编译器
# 类似于安装了node，就可以使用 node index.js 来执行脚本
# 安装了less后就可以使用lessc编译less文件
npx lessc style.less
```

### 定义 less 全局变量（在 webpack 中使用 less-loader 配置）

以前使用 less 变量会建一个文件，用来专门存储各种样式变量，通过使用 `@import url('')` 的方式引入到各个需要的地方，但是这个方式不适合用来做全局变量（主题切换等）

- 使用 @import 性能不是那么好
- 虽然配置到了一个文件中，但是可以预见许多文件都需要引用进来

```js
{
  // ...,
  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          mainColor: 'red', // 使用的时候使用 @mainColor
        }
      },
    }
  }
}
```

### css sourceMap

源文件和编译过后文件之间的索引

压缩之后的文件代码的行无法追踪，使用 sourceMap 可以映射回源文件的代码位置

```js
{
  // ...,
  css: {
    preprocessorOptions: {
      less: {},
    },
    devSourceMap: true
  }
}
```

### postcss

vite 天生对 postcss 有非常良好的支持

功能：postcss 保证了 css 在执行起来是万无一失的

1. 保证在各个浏览器中的兼容性（前缀补全）
2. 对未来 css 属性的使用降级问题（使用 var(全局变量)）

postcss 工作流程：

我们写的代码 ---> (postcss ---> less)语法转化 ---> 对未来的高级 css 语法进行降级 ---> 前缀补全 ---> 浏览器客户端

- 其中 postcss 可以对 less 中的嵌套、变量等写法进行转化，即 postcss 可以包括 less；
- 语法降级、前缀补全是 postcss 的功能

注意：postcss 原来是支持 less 的一些编译功能，提供了一些插件来帮助编译，但是因为每次 less 和 sass 一更新就会导致提供的插件也需要更新，好像没什么必要而且需要成本，所以目前这些插件就不再维护了

**所以产生了一个新的说法：postcss 是后处理器（先处理完 less、sass 的一些语法，再来进行 css 降级等）**

**使用：**

1. 安装依赖

```r
# postcss-cli 提供了一些命令
yarn add postcss-cli postcss -D
# 使用postcss编译css文件，输出为result.css
npx postcss style.css -o result.css
```

2. 书写描述文件

postcss.config.js

```js
// postcss打包过程实际还有许多插件要用到
// 例如降级插件、编译插件等
// 使用 postcss-preset-env 插件里边就包含了这些东西

const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [postcssPresetEnv(/* pluginOptions */)],
};
```

示例：

```css
/* 源文件 */
:root {
  --globalColor: skyblue;
}

.text {
  color: var(--globalColor);
  display: flex;
}
```

```r
npx postcss high-css.css -o result.css
```

```css
/* 结果 */
:root {
  --globalColor: skyblue;
}

.text {
  /* 多加了一句这个，保证了低版本浏览器的识别 */
  color: skyblue;
  color: var(--globalColor);
  display: flex;
}
```

**注意**：如果定义的变量在另一个文件里（定义了一个 variable.css 文件，用来保存各种变量）,那么这个文件不会做降级处理(没有上面的 color: skyblue)，因为 postcss 处理变量是以文件为单位的，这个文件处理完里边的变量就被丢弃了。所以必要的话，需要配置 variable.css 文件里的变量一直有效

```js
{
  // ...,
  css: {
    // ...
    postcss: {
        plugins: [
            postcssPresetEnv({
                importFrom: path.resolve(__dirname, "./variable.css"),
            }),
        ],
    },
  }
}
```

既可以创建 postcss.config.js 来配置 postcss，也可以在 vite 中直接配置，都有的话，vite.config.js 里的优先级高于 postcss.config.js

```js
const postcssPresetEnv = require('postcss-preset-env')

{
  // ...,
  css: {
    devSourceMap: true,
    postcss: {
      // 这里的配置就是 postcss.config.js 的配置
      plugins: [postcssPresetEnv] // 不需要配置其他项的时候可以直接传入不需要 postcssPresetEnv()
    }
  }
}
```
