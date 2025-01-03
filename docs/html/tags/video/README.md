# video

## 属性

1. played(TimeRanges)

具有 length 属性，视频每播放过一段就会生成一条数据；
每段数据保存了播放的起止时间（开始时间通过`played.start(i)`获得，结束时间通过`played.end(i)`获得）
多段数据如果有重合则会重新整合。例如: 有两段数据[10s, 20s],[15s,25s]会整合为一段[10s,25s]。因此可以计算视频实际播放的时间

2. ended(boolean | undefined)

视频是否播放结束

## 事件

onerror 处理

```js
// video可能由于一些原因无法播放，下面代码可以获取错误提示
const video = document.querySelector("video");
video.onerror = function (e: any) {
  const error = video.error;
  let message = "";

  switch (error.code) {
    case error.MEDIA_ERR_ABORTED:
      message = "Video playback was aborted.";
      break;
    case error.MEDIA_ERR_NETWORK:
      message = "A network error caused the video download to fail.";
      break;
    case error.MEDIA_ERR_DECODE:
      message =
        "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.";
      break;
    case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      message =
        "The video could not be loaded, either because the server or network failed or because the format is not supported.";
      break;
    default:
      message = "An unknown error occurred.";
      break;
  }
};
```

onpause

```js
// 播放结束会调用
// 因为缓冲视频而造成的暂停并不会触发pause
```
