# composition 文本合成系统

当使用中文输入法在 input 中输入内容时，还在输入拼音的时候就会触发 onChange 事件，并且 input 内容会有一些特殊的符号
当可控组件需要验证字符的时候，就可能出现还没输完但是一直触发 onChange 事件里的验证失败逻辑，这时可以使用 compositionStart 和 compositionEnd 避免还在输入的时候触发 onChange 的验证

```jsx
const [value, setValue] = useState('')

const isComposite = useRef(false)
const onChange = (e: any) => {
    setValue(e.target.value as string)
    if (!isComposite.current) {
        // 验证输入是否合法，如果返回string，则为报错了
        const msg = checkInputName(e.target.value, i18n.language as Lang)
        if (msg) {
            notice(msg)
        }
    }
}

<input
  placeholder="请输入"
  className={styles.input}
  value={value}
  onChange={onChange}
  onCompositionStart={() => {
    // 设置当前正在输入拼音
    isComposite.current = true;
  }}
  onCompositionEnd={(e) => {
    // 设置输入结束
    // 可控组件的话，需要onChange触发后(也就是input的内容确确实实发生了变化)，才会触发end事件
    isComposite.current = false;
    onChange(e);
  }}
/>
```
