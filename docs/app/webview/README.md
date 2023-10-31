# webview

## webview 与原生的交互

### jsBridge

#### 调用 app 方法

```js
window.WebViewJavascriptBridge?.callHandler(
  "getEnvInfo", // 函数名
  null, // 参数
  function (response: any) {
    // 回调
    saveEnvInfo(getJsonData(response));
  }
);
```

#### 注册方法供 app 调用

```js
window.WebViewJavascriptBridge?.init(); // 需要初始化才能注册
window.WebViewJavascriptBridge?.registerHandler(
  "changeTheme", // 方法名
  function (theme: Theme) {
    // 回调
    update({ theme });
  }
);
```
