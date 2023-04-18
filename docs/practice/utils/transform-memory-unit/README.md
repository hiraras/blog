## 转换内存单位

```JavaScript
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k)); // 确定数量级
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
```
