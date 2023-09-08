# 并发请求

接受一些列 url 和最大并发数，每次最多有最大并发数个请求在执行，当一个请求结束，并且还有 url 没请求时，继续执行剩余的请求，直到所有请求都结束，最后按 url 顺序返回请求结果列表

```js
// 模拟请求的函数
function request(url) {
  return new Promise(function (r) {
    const time = Math.random() * 4000 + 1000;
    console.log(url + "  ->  start", time);
    setTimeout(() => {
      r(url);
      console.log(url + "  ->  end");
    }, time);
  });
}

function concurRequest(urls, maxNum) {
  return new Promise(function (resolve) {
    const results = new Array(urls.length);

    // 统一操作所有请求的promise，当其结束时执行相同的回调
    function handlePromise(p) {
      return p.then((data) => {
        supplyPromise();
        return data;
      });
    }

    // 使用 slice 同时能够保证 maxNum 大于 urls 长度时的场景
    const promises = urls
      .slice(0, maxNum)
      .map((url) => handlePromise(request(url)));

    function supplyPromise() {
      const len = promises.length;
      if (len >= urls.length) {
        Promise.all(promises).then((data) => {
          resolve(data);
        });
        return;
      }
      promises.push(handlePromise(request(urls[len])));
    }
  });
}
const urls = new Array(100).fill(1).map((_, i) => `/api/${i + 1}`);
concurRequest(urls, 5).then((results) => console.log(results));
```
