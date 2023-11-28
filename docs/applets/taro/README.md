# taro

Taro 是一款一次编码，多端运行的技术框架

通过自身的编译工具，编译成不同环境下的代码，实现多端运行

特点

- 遵循 react 语法规范，可以用 jsx 语法规范开发小程序应用
- 支持组件化开发
- 支持 TypeScript 语言开发
- 很强的开发体验，开发流程自动化，顺畅快捷

目前支持的场景

- 微信小程序
- 百度小程序
- 支付宝小程序
- web(H5)
- React Native

## 安装开发工具 @tarojs/cli

```
npm install -g @tarojs/cli
```

### cli 命令

一键检测 Taro 环境及依赖的版本等信息，方便大家查看项目的环境及依赖，排查环境问题。在提 issue 的时候，请附上 taro info 打印的信息，帮助开发人员快速定位问题。

```
taro info
```

Taro Doctor 就像一个医生一样，可以诊断项目的依赖、设置、结构，以及代码的规范是否存在问题，并尝试给出解决方案

```
taro doctor
```

## 创建项目

```
taro init myApp
```

## 项目运行命令

npm run dev:h5 -- web
npm run dev:weapp -- 微信小程序
npm run dev:alipay -- 支付宝
npm run dev:swan -- 百度
npm run dev:rn -- React Native
npm run dev:qq -- qq
npm run dev:jd -- 京东
npm run dev:tt -- 抖音

## 目录

dist 编译结果目录
config 配置目录
src 源码目录
package.json 包管理文件
project.config.json 微信小程序项目配置
project.tt.json 抖音小程序项目配置
app.config.js 全局配置文件，可以设置页面组件的路径、全局窗口、路由等信息
index.config.js 页面配置文件，可以设置页面的导航栏、背景颜色等参数

## 配置

### 模式

#### 默认模式

模式在 taro cli 中，是用于给环境变量分组并加载其分组下的环境变量，它是一组环境变量的 name

默认情况下有 2 个模式：

development 模式用于开发环境 `taro build --type weapp --watch`
production 模式用于生产环境 `taro build --type weapp`

可以在根目录下新建两个 env 环境文件 .env.development 和 .env.production

**注意**：只有 TARO*APP*开头的变量将通过 webpack.DefinePlugin 静态的嵌入到客户端代码中

被载入的环境变量可以在所有 taro 插件、config/index.ts 配置文件以及 src 目录下的文件中使用

#### 自定义模式

可以通过 --mode 模式名 来指定模式名

例如 --mode test 会在构建时加载 .env.test 文件中的环境变量

为一个特定模式准备的环境文件 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有更高的优先级。

.env 环境文件是通过运行 taro 命令载入的，因此环境文件发生变化，你需要重启服务。

#### 只在本地有效的变量

有时候你可能有一些提交到代码仓库中的变量，尤其是当你的项目托管在公共仓库时。可以用一个.env.local 文件取而代之，这个文件会默认被忽略，且出现在.gitignore 中

.local 也可以加在指定模式的环境文件上，比如.env.development.local 将会在 development 模式下被加载，且被 git 忽略

#### 自定义环境变量前缀

默认 `TARO_APP_` 前缀开头的环境变量会被注入到代码，如果想自定义可以在命令中添加 --env-prefix 参数来实现

例如：`taro build --type weapp --mode development --env-prefix JD_APP_` 命令能加载 JD*APP*前缀开头的变量

但是，有个特殊的环境变量不受自定义前缀配置的影响，始终会被加载，那就是 TARO_APP_ID

#### 特殊环境变量 TARO_APP_ID

TARO_APP_ID 是专门针对小程序的 appid 设计的，在构建输出 dist/project.config.json 文件前， 会将 dist/project.config.json 文件中的 appid 字段，修改为 TARO_APP_ID 的值。 在不同环境配置不同的小程序 appid 时，它特别有用，还能免去开发者在开发者工具上手动修改 appid 的麻烦。

### 编译配置

编译配置存放于项目根目录下的 config 目录中，只要确保 config/index.js 或者 config/index.ts 文件存在，可以作为用户自定义编译配置导出即可

[配置详情](https://taro-docs.jd.com/docs/config-detail)

#### defineConfig 辅助函数

Taro v3.6.9 开始支持，react native 暂不支持

开发者可以导入 defineConfig 函数包裹配置对象， 以获得 类型提示 和 自动补全

```js
import type { UserConfigExport } from '@tarojs/cli'
export default {
  // ...Taro 配置
} satisfies UserConfigExport
```

或者使用类型对象直接导出对象

```ts
import type { UserConfigExport } from "@tarojs/cli";
export default {
  // ...Taro 配置
} satisfies UserConfigExport;
```

defineConfig 也支持调用异步函数

```js
import { defineConfig } from "@tarojs/cli";
export default defineConfig(async (mergin, { command, mode }) => {
  const data = await asyncFunction();
  return {
    // Taro 配置
  };
});
```

### 设计稿及尺寸单位

在 Taro 中尺寸单位建议使用 px、 百分比 %，Taro 默认会对所有单位进行转换。在 Taro 中书写尺寸按照 1:1 的关系来进行书写，即从设计稿上量的长度 100px，那么尺寸书写就是 100px，当转成微信小程序的时候，尺寸将默认转换为 100rpx，当转成 H5 时将默认转换为以 rem 为单位的值。

如果你希望部分 px 单位不被转换成 rpx 或者 rem ，最简单的做法就是在 px 单位中增加一个大写字母，例如 Px 或者 PX 这样，则会被转换插件忽略。

Taro 默认以 750px 作为换算尺寸标准，如果设计稿不是以 750px 为标准，则需要在项目配置 config/index.js 中进行设置，例如设计稿尺寸是 640px，则需要修改项目配置 config/index.js 中的 designWidth 配置为 640

```js
const config = {
  projectName: "myProject",
  date: "2018-4-18",
  designWidth: 640,
  // ...
};
```

建议使用 Taro 时，设计稿以 iPhone 6 750px 作为设计尺寸标准。

如果你的设计稿是 375 ，不在以上三种之中，那么你需要把 designWidth 配置为 375，同时在 DEVICE_RATIO 中添加换算规则如下：

```js
const DEVICE_RATIO = {
  640: 2.34 / 2,
  750: 1,
  828: 1.81 / 2,
  375: 2 / 1,
};
```

在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API Taro.pxTransform 来做运行时的尺寸转换。

[样式相关配置文档](https://taro-docs.jd.com/docs/size) API 部分

#### css 编译时忽略(过滤)

- 忽略单个属性

当前忽略单个属性的最简单的方法，就是 px 单位使用大写字母。

- 忽略样式文件

对于头部包含注释 /_postcss-pxtransform disable_/ 的文件，插件不予处理。

- 忽略样式举例

样式文件里多行文本省略时我们一般如下面的代码：

```css
.textHide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

但 Taro 编译后少了 -webkit-box-orient: vertical; 这条样式属性，此时我们需要忽略掉这条样式

有 3 个方法解决这个问题

1. 加入 CSS 注释强制声明忽略下一行

```css
/* autoprefixer: ignore next */
-webkit-box-orient: vertical;
```

2. 加入 CSS 注释强制声明注释中间多行

```css
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
```

3. 写成行内样式

```js
<View
  style={{
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2,
    "text-overflow": "ellipsis",
    overflow: "hidden",
    "line-height": 2,
  }}
>
  这是要省略的内容这是要省略的内容这是要省略的内容
</View>
```

## 全局配置

根目录下的 app.config.js 文件用来对小程序进行全局配置，配置项遵循微信小程序规范，并且对所有平台进行统一

注意：

1. Taro v3.4 之前，app.config.js 里引用的 JS 文件没有经过 Babel 编译。(Taro v3.4 开始支持）
2. 多端差异化逻辑可以使用 process.env.TARO_ENV 变量作条件判断来实现。
3. app.config.js 不支持多端文件的形式，如 app.weapp.js 这样是不起作用的。

### defineAppConfig 宏函数

开发者可以使用编译时宏函数 defineAppConfig 包裹配置对象，以获得类型提示和自动补全

```js
export default defineAppConfig({
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
```

#### 通用配置项

| 属性        | 类型     | 必填 | 描述               |
| ----------- | -------- | ---- | ------------------ |
| pages       | string[] | yes  | 页面路径列表       |
| window      | Object   | no   | 全局的默认窗口表现 |
| tabBar      | Object   | no   | 底部 tab 栏的表现  |
| subPackages | Object[] | no   | 分包结构配置       |

#### pages

用于指定小程序由哪些页面组成，每一项都对应一个页面的`路径 + 文件名`信息。文件名不需要写文件后缀，框架会自动去寻找对应位置的文件进行处理

数组的第一项代表小程序的首页。小程序中新增/减少页面，都需要对 pages 数组进行修改

#### window

用于设置小程序的状态栏、导航条、标题、窗口背景色，其配置项如下

| 属性                         | 类型                       | 默认值   | 描述                                                                                  |
| ---------------------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------- |
| navigationBarBackgroundColor | HexColor（十六进制颜色值） | #000000  | 导航栏背景颜色，如 #000000                                                            |
| navigationBarTextStyle       | String                     | white    | 导航栏标题颜色，仅支持 black / white                                                  |
| navigationBarTitleText       | String                     |          | 导航栏标题文字内容                                                                    |
| navigationStyle              | String                     | default  | 导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮 |
| backgroundColor              | String                     |          | 窗口的背景色                                                                          |
| backgroundTextStyle          | String                     | dark     | 下拉 loading 的样式，仅支持 dark / light                                              |
| backgroundColorTop           | String                     | #ffffff  | 顶部窗口的背景色，仅 iOS 支持                                                         |
| backgroundColorBottom        | String                     | #ffffff  | 底部窗口的背景色，仅 iOS 支持                                                         |
| enablePullDownRefresh        | boolean                    | false    | 是否开启当前页面的下拉刷新。                                                          |
| onReachBottomDistance        | Number                     | 50       | 页面上拉触底事件触发时距页面底部距离，单位为 px                                       |
| pageOrientation              | String                     | portrait | 屏幕旋转设置，支持 auto / portrait / landscape 详见 响应显示区域变化                  |

各端支持程度如下

| 属性                         | 微信                                | 百度                       | 字节跳动 | 支付宝 | H5  | RN  |
| ---------------------------- | ----------------------------------- | -------------------------- | -------- | ------ | --- | --- |
| navigationBarBackgroundColor | ✔️                                  | ✔️                         | ✔️       | ✔️     | ✔️  | ✔️  |
| navigationBarTextStyle       | ✔️                                  | ✔️                         | ✔️       | ✘      | ✔️  | ✔️  |
| navigationBarTitleText       | ✔️                                  | ✔️                         | ✔️       | ✔️     | ✔️  | ✔️  |
| navigationStyle              | ✔️（微信客户端 6.6.0）              | ✔️（百度 App 版本 11.1.0） | ✔️       | ✘      | ✘   | ✘   |
| backgroundColor              | ✔️                                  | ✔️                         | ✔️       | ✘      | ✘   | ✘   |
| backgroundTextStyle          | ✔️                                  | ✔️                         | ✔️       | ✘      | ✘   | ✘   |
| backgroundColorTop           | ✔️ （微信客户端 6.5.16）            | ✘                          | ✔️       | ✘      | ✘   | ✘   |
| backgroundColorBottom        | ✔️ （微信客户端 6.5.16）            | ✘                          | ✔️       | ✘      | ✘   | ✘   |
| enablePullDownRefresh        | ✔️                                  | ✔️                         | ✔️       | ✔️     | ✘   | ✘   |
| onReachBottomDistance        | ✔️                                  | ✔️                         | ✔️       | ✘      | ✘   | ✘   |
| pageOrientation              | ✔️ 2.4.0 (auto) / 2.5.0 (landscape) | ✘                          | ✘        | ✘      | ✘   | ✘   |

#### tabBar

如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面

| 属性            | 类型                       | 必填 | 默认值 | 描述                                                     |
| --------------- | -------------------------- | ---- | ------ | -------------------------------------------------------- |
| color           | HexColor（十六进制颜色值） | 是   |        | tab 上的文字默认颜色，仅支持十六进制颜色                 |
| selectedColor   | HexColor（十六进制颜色值） | 是   |        | tab 上的文字选中时的颜色，仅支持十六进制颜色             |
| backgroundColor | HexColor（十六进制颜色值） | 是   |        | tab 的背景色，仅支持十六进制颜色                         |
| borderStyle     | String                     | 是   | black  | tabbar 上边框的颜色， 仅支持 black / white               |
| list            | Array                      | 是   |        | tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab |
| position        | String                     | 否   | bottom | tabBar 的位置，仅支持 bottom / top                       |
| custom          | Boolean                    | 否   | false  | 自定义 tabBar                                            |

其中 list 接受一个数组，只能配置最少 2 个，最多 5 个 tab。tab 按数组的顺序排序，每一项都是一个对象，属性值如下

| 属性             | 类型   | 必填 | 描述                                                                                                                   |
| ---------------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| pagePath         | String | 是   | 页面路径，必须在 pages 中先定义                                                                                        |
| text             | String | 是   | tab 上按钮文字                                                                                                         |
| iconPath         | String | 否   | 图片路径，icon 大小限制为 40kb，建议尺寸为 81px \* 81px，不支持网络图片。当 position 为 top 时，不显示 icon。          |
| selectedIconPath | String | 否   | 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px \* 81px，不支持网络图片。 当 position 为 top 时，不显示 icon。 |

支持程度

| 属性            | 微信                    | 百度 | 字节跳动 | 支付宝 | H5  | RN  |
| --------------- | ----------------------- | ---- | -------- | ------ | --- | --- |
| color           | ✔️                      | ✔️   | ✔️       | ✔️     | ✔️  | ✔️  |
| selectedColor   | ✔️                      | ✔️   | ✔️       | ✔️     | ✔️  | ✔️  |
| backgroundColor | ✔️                      | ✔️   | ✔️       | ✔️     | ✔️  | ✔️  |
| borderStyle     | ✔️                      | ✔️   | ✔️       | ✘      | ✔️  | ✔️  |
| list            | ✔️                      | ✔️   | ✔️       | ✔️     | ✔️  | ✔️  |
| position        | ✔️                      | ✘    | ✔️       | ✘      | ✘   | ✘   |
| custom          | ✔️（基础库 2.5.0 以上） | ✘    | ✘        | ✘      | ✘   | ✘   |

#### subPackages

启用分包加载时，声明项目分包结构

[其他配置参考](https://taro-docs.jd.com/docs/app-config#subpackages)

## 页面配置

每一个小程序页面都可以用 .config.js 文件来对本页面的窗口表现进行配置。页面中配置项在当前页面会覆盖全局配置 app.config.json 的 window 中相同的配置项

文件需要 export 一个默认对象，配置项遵循微信小程序规范，并且对所有平台进行统一

注意：

1. Taro v3.4 之前，page.config.js 里引用的 JS 文件没有经过 Babel 编译。(Taro v3.4 开始支持）
2. Taro v3.4 支持在页面 JS 中使用 definePageConfig 宏函数定义页面配置，代替 page.config.js 文件。
3. 多端差异化逻辑可以使用 process.env.TARO_ENV 变量作条件判断来实现。
4. page.config.js 不支持多端文件的形式，如 index.weapp.js 这样是不起作用的。

### definePageConfig 宏函数

开发者可以使用编译时宏函数包裹配置对象，以获得类型提示和自动补全

### 在页面 js 文件中使用

支持在页面 js 中使用 definePageConfig 定义页面配置，而不需要提供 page.config.js 文件

但需要注意的是，使用 definePageConfig 定义的页面配置对象**不能使用变量**

```js
definePageConfig({
  navigationBarTitleText: "首页",
});

export default function Index() {}
```

[具体配置项查看](https://taro-docs.jd.com/docs/page-config)

## 项目配置

各类小程序平台均有自己的项目配置文件，例如：

- 微信小程序，[project.config.json](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
- 百度小程序，[project.swan.json](https://smartprogram.baidu.com/docs/develop/devtools/editor_set/)
- 抖音小程序，[project.config.json](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/overview/directory-structure)
- QQ 小程序，project.config.json
- 支付宝小程序，[mini.project.json](https://opendocs.alipay.com/mini/framework/project)
- 京东小程序，暂无发现
- 飞书小程序，[project.config.json](https://open.feishu.cn/document/uYjL24iN/uEzMzUjLxMzM14SMzMTN/gadget-project-configuration?from=taro)

为了能够适配不同小程序平台的配置文件不同的情况，Taro 支持为各个小程序平台添加各自的项目配置文件。

## Babel 配置

Taro 项目的 Babel 配置位于根目录的 babel.config.js 文件中，里面默认添加了一个 preset: babel-preset-taro，它会根据项目的技术栈添加一些常用的 presets 和 plugins

开发者可以修改 babel.config.js，修改 babel-preset-taro 的配置项，或添加自己想要的 presets 和 plugins。

[详见](https://taro-docs.jd.com/docs/babel-config)

# React

Taro3 支持将 Web 框架直接运行在各平台，开发者使用的是真实的 React 和 Vue 等框架

但是 Taro 在组件、API、路由等规范上，遵循微信小程序规范，所以在 Taro 中使用 React 和开发者熟悉的 Web 端有一些差异

因为在 Taro 3 中开发者使用的是真实的 React，React 的 API 如 Component、useState、useEffect 等都需要从 React 包中获取。

```js
// 从 'react' 包中获取 React API
import React, { Component, useState, useEffect } from "react";
```

因为 Taro 遵循小程序的路由规范，所以引入了入口组件和页面组件的概念，分别对应小程序规范的入口组件 app 和页面组件 page

## 内置组件

自 Taro v3.3+，支持使用 H5 标签进行开发

Taro 中可以使用小程序规范的内置组件进行开发，如`<View>、<Text>、<Button>`等。[详见](https://taro-docs.jd.com/docs/components-desc)

Taro 规范

1. 在 React 中使用这些内置组件前，必须从 @tarojs/components 进行引入。
2. 组件属性遵从大驼峰式命名规范。

## 事件

事件和 Web 端一样。在事件回调函数中，第一个参数是事件对象，回调中调用 stopPropagation 可以阻止冒泡

Taro 规范

1. 内置事件名以 on 开头，遵从小驼峰式（camelCase）命名规范。
2. React 中点击事件使用 onClick。

```js
function Comp() {
  function clickHandler(e) {
    e.stopPropagation(); // 阻止冒泡
  }
  function scrollHandler() {}
  // 只有小程序的 bindtap 对应 Taro 的 onClick
  // 其余小程序事件名把 bind 换成 on 即是 Taro 事件名（支付宝小程序除外，它的事件就是以 on 开头）
  return <ScrollView onClick={clickHandler} onScroll={scrollHandler} />;
}
```

### Taro3 在小程序端的事件机制

在 Taro 1 & 2 中，Taro 会根据开发者是否使用了 e.stopPropagation()，来决定在小程序模板中绑定的事件是以 bind 还是以 catch 形式。因此事件冒泡是由小程序控制的。

但是在 Taro3 中，taro 在小程序逻辑层实现了一套事件系统，包括事件触发和事件冒泡。在小程序模板中绑定的事件都是以 bind 的形式

一般情况下，这套在逻辑层实现的小程序事件系统是可以正常工作的，事件回调能正确触发、冒泡、停止冒泡。

但是，小程序模板中绑定的 catchtouchmove 事件除了可以阻止回调函数冒泡触发外，还能阻止视图的滚动穿透，这点 Taro 的事件系统是做不到的。

### 阻止滚动穿透

因为事件都以 bind 的形式进行绑定，因此不能使用 e.stopPropagation() 阻止滚动穿透。

针对滚动穿透，目前总结了两种解决办法

1. 样式

```css
{
  overflow：hidden;
  height: 100vh;
}
```

2. catchMove

**Taro 3.0.21 版本开始支持**

但是地图组件本身就是可以滚动的，即使固定了它的宽高。所以第一种办法处理不了冒泡到地图组件上的滚动事件。

这时候可以为 View 组件增加 catchMove 属性：

```js
// 这个 View 组件会绑定 catchtouchmove 事件而不是 bindtouchmove
<View catchMove></View>
```
