## createObjectURL 创建临时 URL

根据对象创建为临时 URL，可以为 file 对象、blob、或者 mediaSource。
然后可以通过生成的 URL 赋值给 a 标签或 img 标签做到生成或者预览。

用法

```html
<input type="file" accept="image/*" id="file" name="file" />
<a id="link" target="_blank">link</a>
```

```JavaScript
let url = ''
document.getElementById('file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const windowURL = window.URL || window.webkitURL;
    url = windowURL.createObjectURL(file)
    document.getElementById('link').href = url
})
```

渲染后的结果

```html
<a
  id="link"
  target="_blank"
  href="blob:http://127.0.0.1:8848/8fdaf6e2-9229-46d7-af71-184d4df805e2"
  >link</a
>
```

撤销生成的临时 URL

```JavaScript
// 销毁上面创建的链接，之后点击 link，会跳转但是不会显示图片，会提示资源被删除
windowURL.revokeObjectURL(url)
```
