## Date 对象

Date 对象是 JavaScript 提供的内置对象，可以在任何可以运行 js 脚本的宿主环境中使用

### 使用

```js
const date = new Date(); // 不传话默认取的系统时间
const dateDetail = new Date("2023-12-12 12:00:00");
```

### 实例方法

#### getTime

用来获取当前的时间戳，即距离 1970 年 1 月 1 日 UTC 时间的毫秒数，它和 `+new Date()` 效果是完全一样的

**注意**：这个时间戳与在哪个时区无关

证明：

```js
const date = new Date("2023-01-01 12:00:00");
const timestamp = date.getTime(); // 1672545600000
const remainMins = (timestamp / 1000) % 86400; // 计算12点的时候，时间戳还剩余多少秒，14400
const remainHours = remainMins / 3600; // 剩余多少小时，4
```

同时也说明了 date 对象对时区进行了相应处理，

- 上述的 12 点自动转为了 utc 时区的 4 点，而不是直接把 12 点作为 utc 时区的 12 点
- new Date().toString() 输出的时间也是东八区的时间

#### getTimezoneOffset

获取当前时区与 utc 时间间隔(以分钟为单位)

```js
new Date().getTimezoneOffset(); // -480，需要将其取反再除以60就是小时数
```

#### 获取时间的各个字段

```js
const date = new Date("2023-7-24 12:12:12");
const year = date.getFullYear(); // 年份 2023
const month = date.getMonth() + 1; // 月份，从0开始 7
const day = date.getDate(); // 日期 24
const hour = date.getHours(); // 小时 12
const minute = date.getMinutes(); // 分钟 12
const second = date.getSeconds(); // 秒 12
const millSecond = date.getMilliseconds(); // 毫秒
const week = date.getDay(); // 星期 1
console.log(year, month, day, hour, minute, second, millSecond, week);
```

#### 各种 toString 方法

```js
const date = new Date("2023-7-24 12:12:12");
date.toString(); // Mon Jul 24 2023 12:12:12 GMT+0800 (中国标准时间)
date.toGMTString(); // Mon, 24 Jul 2023 04:12:12 GMT
date.toDateString(); // Mon Jul 24 2023
date.toISOString(); // 2023-07-24T04:12:12.000Z
date.toJSON(); // 2023-07-24T04:12:12.000Z
date.toLocaleDateString(); // 2023/7/24
date.toLocaleString(); // 2023/7/24 12:12:12
date.toLocaleTimeString(); // 12:12:12
date.toTimeString(); // 12:12:12 GMT+0800 (中国标准时间)
date.toUTCString(); // Mon, 24 Jul 2023 04:12:12 GMT
```

#### 获取 utc 时间的各个字段

```js
const date = new Date("2023-7-24 12:12:12");
const year = date.getUTCFullYear(); // 年份 2023
const month = date.getUTCMonth() + 1; // 月份，从0开始 7
const day = date.getUTCDate(); // 日期 24
const hour = date.getUTCHours(); // 小时 4
const minute = date.getUTCMinutes(); // 分钟 12
const second = date.getUTCSeconds(); // 秒 12
const millSecond = date.getUTCMilliseconds(); // 毫秒
const week = date.getUTCDay(); // 星期 1
console.log(year, month, day, hour, minute, second, millSecond, week);
```

#### 设置时间字段

```js
// 一下方法都返回date对象，因此可以链式调用
const date = new Date("2023-7-24 12:12:12");
// date.setYear(2022); // Sun Jul 24 2022 12:12:12 GMT+0800 (中国标准时间)，多传一些参数也只有年份生效（可以接受一个两位数的年份值，但是有歧义，不再推荐使用）
date.setFullYear(2022); // Sun Jul 24 2022 12:12:12 GMT+0800 (中国标准时间)，可以传3个参数，分别对应年份、月份、日期
date.setMonth(8); // Sat Sep 24 2022 12:12:12 GMT+0800 (中国标准时间) 变为了9月，可以传2个参数，分别对应月份、日期
date.setDate(26); // Mon Sep 26 2022 12:12:12 GMT+0800 (中国标准时间)，多传一些参数也只有日期生效
date.setHours(4); // Mon Sep 26 2022 04:12:12 GMT+0800 (中国标准时间)，可以传4个参数，分别对应小时、分钟、秒、毫秒
date.setMinutes(20); // Mon Sep 26 2022 04:20:12 GMT+0800 (中国标准时间)，可以传3个参数，分别对应分钟、秒、毫秒
date.setSeconds(20); // Mon Sep 26 2022 04:20:20 GMT+0800 (中国标准时间)，可以传2个参数，分别对应秒、毫秒
date.setMilliseconds(1000); // Mon Sep 26 2022 04:20:21 GMT+0800 (中国标准时间)，多传一些也只有毫秒生效
```

#### utc 相关设置方法是类似的，小时以 utc 时间为准
