## React - ref

### 作为元素属性

ref 是一个特殊的属性，它不会被加到 props 中，可以用来获取 dom 元素、组件实例

### ref 的创建

1. 在函数式组件中使用 useRef

```js
const ref = useRef(null);
```

2. 在 class 组件中使用 React.createRef()

```js
const ref = React.createRef();
```

### 使用

1. 获取 dom 元素

**函数式组件**

```js
const Welcome = () => {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current); // input
  });
  return (
    <div>
      <input ref={ref} />
    </div>
  );
};
```

**class 组件**

```js
// 第一种：使用createRef API
class Welcome extends React.Component {
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount(): void {
    console.log(this.ref.current); // input
  }

  render() {
    return (
      <div>
        <input ref={this.ref} />
      </div>
    );
  }
}
```

```js
// 第二种，ref参数可以接受一个函数，函数的第一个参数就是dom，可以赋值到实例上
class Welcome extends React.Component {
  inputRef = null;
  componentDidMount(): void {
    console.log(this.inputRef); // input
  }

  render() {
    return (
      <div>
        <input
          ref={(ref) => {
            this.inputRef = ref;
          }}
        />
      </div>
    );
  }
}
```

2. 通过 forwardRef 获取 ref，它会将 ref 属性作为第二个参数传入到 render 函数中

```js
const Child = React.forwardRef(function Child(props, ref) {
  return <input ref={ref} />;
});

class Welcome extends React.Component {
  inputRef = null;
  componentDidMount(): void {
    console.log(this.inputRef); // input
  }

  render() {
    return (
      <div>
        <Child ref={(ref) => (this.inputRef = ref)} />
      </div>
    );
  }
}
```

3. 作为一个不受状态更新的盒子

```js
// 这里 ref 有两个作用，一个是保存 setTimeout 的指针，另一个是保存 input 的当前值
// 在下面这个例子中，如果先在 input 中输入 111 ，然后点击提交，然后再输入 222 ，会打印出 '111 111222' ，这是因为 text 会在点击时使用当前上下文中保存的值，而 ref 作为一个另外的存储空间(其实就是一个包含 current 属性的对象)，不管状态在什么时候更新，它都保存了最新值
const Welcome = () => {
  const [text, setText] = useState("");
  const ref = useRef("");
  const timerRef = useRef();

  const clickHandle = () => {
    timerRef.current = setTimeout(() => {
      console.log(text, ref.current);
    }, 3000);
    return () => {
      clearTimeout(timerRef.current);
    };
  };

  return (
    <div>
      <input
        value={text}
        onInput={(e) => {
          const { value } = e.target;
          setText(value);
          ref.current = value;
        }}
      />
      <button onClick={clickHandle}>submit</button>
    </div>
  );
};
```

4. 作为函数是否为第一次渲染的标记

```js
// init函数只会执行一次
const Welcome = () => {
  const [num, setNum] = useState(0);
  const flag = useRef(true);
  function init() {
    console.log("initial");
    flag.current = false;
  }
  if (flag.current) {
    init();
  }

  return <button onClick={() => setNum(num + 1)}>count: {num}</button>;
};
```
