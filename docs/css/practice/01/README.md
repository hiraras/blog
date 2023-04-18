## 绘制自适应正方形

### 使用 margin-top 绘制自适应正方形

- 子元素 margin-top: 100% 取得是父容器的宽度，所以在父容器没有指定高度时会被它的 margin 撑开,此时父元素需要设置 overflow: hidden
- 如果使用的是 padding-top: 100%则不需要 overflow: hidden

```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: "";
  display: block;
  margin-top: 100%;
}
```
