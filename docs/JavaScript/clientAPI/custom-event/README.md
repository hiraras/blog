## 自定义 event

自定义的 eventListener 及触发

```JavaScript
window.addEventListener('test', e => {
    console.log(e)
}, false)

function exec() {
    const event = new Event('test')
    event.key = 'abc'
    event.val = 'ccc'
    window.dispatchEvent(event)
}
```
