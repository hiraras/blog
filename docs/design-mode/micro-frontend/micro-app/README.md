## micro-app

### 文档

[http://cangdu.org/micro-app/docs.html#/zh-cn/start](http://cangdu.org/micro-app/docs.html#/zh-cn/start)

### 安装

```
npm i @micro-zoe/micro-app --save
```

### 使用

#### 主应用

1. 主应用在入口处引用：

```JavaScript
import microApp from '@micro-zoe/micro-app'

microApp.start()
```

2. 分配一个路由给子应用(这里是 react，vue 使用 vue-router 的配置方式)

```JSX
// router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MyPage from './my-page'

export default function AppRoute () {
  return (
    <BrowserRouter>
      <Switch>
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        <Route path='/my-page'>
          <MyPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```

3. 在 `MyPage` 页面中嵌入子应用

```JavaScript
// my-page.js
export function MyPage () {
  return (
    <div>
      <h1>子应用</h1>
      // name(必传)：应用名称
      // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
      // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
      <micro-app name='app1' url='http://localhost:3000/' baseroute='/my-page'></micro-app>
    </div>
  )
}
```

#### 子应用

1. 设置基础路由(如果基座应用是 history 路由，子应用是 hash 路由，这一步可以省略)

```JSX
// router.js
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function AppRoute () {
  return (
    // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}>
      ...
    </BrowserRouter>
  )
}
```

2. 在 webpack-dev-server 的 headers 中设置跨域支持。

```JavaScript
{
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
}
```

#### 注意：

1. name 必须以字母开头，且不可以带有除中划线和下划线外的特殊符号
2. url 只是 html 地址，子应用的页面渲染还是基于浏览器地址的，关于这点请查看[路由一章](http://cangdu.org/micro-app/docs.html#/zh-cn/route)
3. baseroute 的作用请查看[路由配置](http://cangdu.org/micro-app/docs.html#/zh-cn/route?id=%e8%b7%af%e7%94%b1%e9%85%8d%e7%bd%ae)
4. 子应用必须支持跨域访问，跨域配置参考[这里](http://cangdu.org/micro-app/docs.html#/zh-cn/questions?id=_2%e3%80%81%e5%ad%90%e5%ba%94%e7%94%a8%e9%9d%99%e6%80%81%e8%b5%84%e6%ba%90%e4%b8%80%e5%ae%9a%e8%a6%81%e6%94%af%e6%8c%81%e8%b7%a8%e5%9f%9f%e5%90%97%ef%bc%9f)
