## useLayoutEffect

useLayoutEffect 是 useEffect 的一个版本，在浏览器**重新绘制屏幕之前**触发，换句话说它会阻止浏览器的重绘

**使用它的目的是让开发者使用布局信息来渲染**

### 参数

和 [useEffect](/frontend-frame/react/hooks/useEffect/) 一致

用途

在一些情况下，可能需要计算 dom 来确定组件渲染的位置，当使用时 useEffect 不会阻止浏览器渲染，所以当更新定位状态时可能会出现闪烁的情况，而 useLayoutEffect 会阻止重绘，并立即发起一个重渲染，所以不会有闪现的情况（在一些旧的设备会更明显）

```jsx
const [top, setTop] = useState(0);

// 更新box的位置，并且不会闪烁，使用useEffect在旧设备会看到box明显的位置变化
useLayoutEffect(() => {
  setTop(200);
}, []);

<div className={styles.page}>
  <div className={styles.box} style={{ top }}></div>
</div>;
```

```css
.page {
  position: relative;
  height: 100vh;
  border: 1px solid black;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-color: red;
}
```
