## useState

添加一个状态变量给函数式组件

### 参数

- 接受一个初始值作为参数，可以为函数
- 如果为函数，初始值为函数的返回结果

### 返回值

- 返回一个数组，数组的第一个值为状态变量，第二个值为修改该状态的函数并触发重渲染
- 更新函数可以接受一个新值或者一个函数
- 当为函数时，以该函数的返回值作为新的状态，同时旧的状态会作为函数的参数传递

### 示例：

```JavaScript
const [data, setData] = useState(1) // 初始值为 1

setData(2) // 更新为 2

const [data2, setData2] = useState(() => {
    return Math.floor(1.1) + 22
}) // 初始值为 23

setData2((oldData2) => oldData2 + 1) // 更新为24
```

### 状态合并更新

当连续调用更新函数的时候，react 会将多次更新合并为一次（提高性能），这个机制有时候会达不到想要的结果

```js
// 以下结果age最终为43
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

当传入更新函数的时候可以保证每次都是新的

```js
// 以下结果age最终为45
function handleClick() {
  setAge((a) => a + 1); // setAge(42 => 43)
  setAge((a) => a + 1); // setAge(43 => 44)
  setAge((a) => a + 1); // setAge(44 => 45)
}
```

另一个应用：使用 useEffect 设置 interval 的问题

```js
// 这里的代码设置了定时器，但因为闭包的原因 count 更新到2后就不会再往上加了
const [count, setCount] = useState(1);
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}, []);
```

```js
// 如果将count添加到依赖列表，那么页面上显示的count是对了，但其实每次都会创建新的定时器
const [count, setCount] = useState(1);
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}, [count]);
```

```js
// 使用更新函数就能完美解决
const [count, setCount] = useState(1);
useEffect(() => {
  const timer = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}, []);
```

### 将一个函数作为状态保存

```js
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```

### 初始化函数和更新函数运行了两次

在严格模式（开发环境），react 会调用初始化函数和更新函数两次，一般来讲它不会破坏逻辑，而且它能够帮助开发者检查出是否有错误的初始化函数|更新函数调用

```js
setTodos((prevTodos) => {
  // createTodo 创建一个新的item，因为调用了两次，所以你会看到item被增加了两次
  prevTodos.push(createTodo());
});
```

```js
setTodos((prevTodos) => {
  // 这个写法即便调用了两次也会保证只增加了一个item
  return [...prevTodos, createTodo()];
});
```
