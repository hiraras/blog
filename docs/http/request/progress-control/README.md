# 请求进度控制

## 获取数据的进度控制

### xhr

```js
export function request(options = null) {
  // onProgress 是返回请求进度的回调，需要当前上传量和总量两个参数
  const { url, method = "GET", data = null, onProgress } = options;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      // 请求状态的监听，xhr.DONE 的值为4
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText);
      }
    });
  });
  xhr.addEventListener("progress", (e) => {
    console.log(e.loaded); // 当前请求回来的数据量
    console.log(e.total); // 当前请求会返回的数据总量
    onProgress(e.loaded, e.total);
  });
  xhr.open(method, url); // 配置请求url和请求类型
  xhr.send(data); // 发送请求
}
```

### fetch

```js
export function request(options = null) {
  // onProgress 是返回请求进度的回调，需要当前上传量和总量两个参数
  const { url, method = "GET", data = null, onProgress } = options;
  return new Promise(async (resolve) => {
    // fetch 方法没有直接提供回调/监听方法供开发者获取请求总量&当前上传量
    const response = await fetch(url, { method, body: data });

    // 这种情况下需要把返回的数据手动拼接上，如果还用 response.text() 获得最终结果，数据就会被解析两次
    const decoder = new TextDecoder();
    let body = "";

    // 总量
    const total = +response.headers.get("content-length");

    // 当前量
    let loaded = 0;
    // response.body 是这次请求的服务端方返回数据的对象，类型是ReadableStream
    const reader = response.body.getReader();
    while (1) {
      // value是二进制数据，类型是Unit8Array ，所以可以通过取value的length得到每次读取时的长度，累加起来就是当前已经上传的所有数据量
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // value.length // 当前循环上传的数据量
      loaded += value.length;
      body += decoder.decode(value);
      onProgress(loaded, total);
    }

    // const result = await response.text();
    resolve(body);
  });
}
```

## 上传

### xhr

```js
export function request(options = null) {
  // onProgress 是返回请求进度的回调，需要当前上传量和总量两个参数
  const { url, method = "GET", data = null, onProgress } = options;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      // 请求状态的监听，xhr.DONE 的值为4
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText);
      }
    });
  });
  xhr.addEventListener("progress", (e) => {
    console.log(e.loaded); // 当前请求回来的数据量
    console.log(e.total); // 当前请求会返回的数据总量
    onProgress(e.loaded, e.total);
  });
  // 上传时的进度监听事件
  xhr.upload.addEventListener("progress", (e) => {
    console.log(e.loaded, e.total);
  });
  xhr.open(method, url); // 配置请求url和请求类型
  xhr.send(data); // 发送请求
}
```

### fetch

暂不支持，不过有个在试验中的 api(`BackgroundFetchManager`)，将来可能能支持
