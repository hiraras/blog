# webview

## webview 与原生的交互

### jsBridge

#### 调用及注册事件的辅助方法

```ts
export function setupBridge(callback: (...rest: any[]) => void) {
  // 这里视为android和ios互相独立
  if (window.WebViewJavascriptBridge) {
    // android的bridge
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WKWebViewJavascriptBridge) {
    // ios的bridge
    return callback(window.WKWebViewJavascriptBridge);
  }
  if (window.WKWVJBCallbacks) {
    // ios没有WKWebViewJavascriptBridge时的备用方法
    window.WKWVJBCallbacks.push(callback);
    return;
  }
  window.WKWVJBCallbacks = [callback];
  window.webkit?.messageHandlers?.iOS_Native_InjectJavascript?.postMessage?.(
    null
  );

  // android没有WebViewJavascriptBridge使的备用方法
  document.addEventListener(
    "WebViewJavascriptBridgeReady",
    function () {
      callback(window.WebViewJavascriptBridge);
    },
    false
  );
}
```

#### 调用 app 方法

```js
setupBridge(function (bridge) {
  bridge?.callHandler("getEnvInfo", null, function (response: any) {
    console.log(getJsonData(response));
  });
});
```

#### 注册方法供 app 调用

```js
bridge?.init?.(); // 需要初始化才能注册
bridge?.registerHandler("changeTheme", function (theme: Theme) {
  // 回调
  update({ theme });
});
```
