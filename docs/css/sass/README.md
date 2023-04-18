## sass/scss

### @mixin

定一个样式集合，通过@include 引入到具体的类中，该类就会具有混合的样式
定义时还支持传入样式变量

示例：

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue, 1in); // 英寸
}
```

编译后：

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed;
}
```
