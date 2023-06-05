## useImperativeHandle

### 参数

- 第一个参数为传入的 ref
- 第二个参数为一个函数，该函数返回一个对象，对象的属性方法即为暴露出去的方法，只有暴露出去的方法可以被引用的 ref 调用（属性名任意）

实际上是将外部的 ref.current 的值替换为在 useImperativeHandle 调用中创建的自定义对象

函数式组件没有实例，正常无法调用内部方法，但是通过它暴露后就可以通过 ref 调用

### 示例：

```JavaScript
function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus()
        }
    }))
    return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput)
```
