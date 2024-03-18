# 如何使用 react-router 控制页面权限

## V4

```ts
// 建立一个组件统一管理
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      condition ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

<Route path="/register" component={Register} />
<PrivateRoute
    path="/register-success"
    component={RegisterSuccess}
/>

// 如果condition为true则正常渲染页面，否则渲染Redirect，而Redirect被渲染的时候就直接重定向了
```

## 旧版本 V4 以前

Route 组件可以注入一个 onEnter 事件

```ts
<Route
  path="/home"
  component={App}
  onEnter={(nextState, replace) => {
    if (condition) {
      // 如果满足某个条件，就再次跳转到 /
      replace("/");
    } else {
    }
  }}
/>
```
