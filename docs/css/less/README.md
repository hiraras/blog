## less

### 安装

```
npm install less -g
```

不知道写出来的结果时，可以使用以下命令进行输出编译后的结果

```
lessc .\common.less .\common.css
```

### 变量

- @img: "~@src/img"; // 作为 url，可以配合路径别名一起使用，这里可以把图片路径进行声明，减少后期使用时的路径冗余
- @link-color: #428bca; // 作为属性值
- @i: 1; // 作为选择器
- @ml: margin-left; // 作为属性名

```less
// 作为选择器、属性名、url 时，插入变量与普通作为属性值的形式有所区别，需要使用
.mt-@{i} {
   margin-top: @i \* 1rem;
}
// 作为 url
.content {
   .bg-img("@{img}/common/popup1.png");
}
// 作为属性名
a {
  @{ml}: 10rem;
}
```

### 混入

```less
.unselect() {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.class1 {
  .unselect();
}
.class2 {
  .unselect();
}

.bg-img(@u) {
   background-image: url(@u);
}
// 这两个可以一起使用（使用时，取决于传参数量）
.bg-img(@u1, @u2) {
   background-image: url(@u1);
   &:hover {
       background-image: url(@u2);
  }
}
```

### 递归

```less
.size-factory(@n, @i: 1) when (@i =< @n) {
   .mt-@{i} {
       margin-top: @i _ 1rem;
  }
   .mr-@{i} {
       margin-right: @i _ 1rem;
  }
   .mb-@{i} {
       margin-bottom: @i _ 1rem;
  }
   .ml-@{i} {
       margin-left: @i _ 1rem;
  }
   .size-factory(@n, (@i + 1)); // 进入下一次循环
}
.size-factory(30);
```

结果：

```less
.mt-1 {
   margin-top: 1rem;
}
.mr-1 {
   margin-right: 1rem;
}
.mb-1 {
   margin-bottom: 1rem;
}
.ml-1 {
   margin-left: 1rem;
}
.... ​ .mt-30 {
   margin-top: 30rem;
}
.mr-30 {
   margin-right: 30rem;
}
.mb-30 {
   margin-bottom: 30rem;
}
.ml-30 {
   margin-left: 30rem;
}
```

### 循环 each

```less
// example
@colors: {
  info: #eee;
  danger: #f00;
};
each(@colors, {
    .text-@{key} {
    　　 color: @value
    }
})
//outputs
.text-info {
  color: #eee;
}
.text-danger {
  color: #f00;
}
```
