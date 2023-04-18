## File 类

1. File 接口可以将 blob、ArrayBuffer、ArrayBufferView 或 DOMString 对象的 Array 生成与 input.files[0]相同的 file 类型数据

用法

```JavaScript
new File([blob], 'filename.ext', { type: 'image/jpg' })
```
