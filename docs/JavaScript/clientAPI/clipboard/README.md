## 剪切板 api

### 从剪切板读取内容：

```JavaScript
navigator.clipboard.readText().then(clipText =>
  document.getElementById("outbox").innerText = clipText
);
```

### 将内容写入剪切板：

```JavaScript
function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
    /* clipboard successfully set */
    }, function() {
    /* clipboard write failed */
    });
}
```
