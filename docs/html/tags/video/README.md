# video

## 属性

1. played(TimeRanges)

具有 length 属性，视频每播放过一段就会生成一条数据；
每段数据保存了播放的起止时间（开始时间通过`played.start(i)`获得，结束时间通过`played.end(i)`获得）
多段数据如果有重合则会重新整合。例如: 有两段数据[10s, 20s],[15s,25s]会整合为一段[10s,25s]。因此可以计算视频实际播放的时间

2. ended(boolean | undefined)

视频是否播放结束
