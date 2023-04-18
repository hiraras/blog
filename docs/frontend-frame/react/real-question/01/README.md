## 为 children 注入父组件的 props

**应用**：FormItem 的 value 注入到 Input 组件

**代码**

```JSX
const Parent: React.FC = (props) => {
  return <div>{React.cloneElement(props.children, { name: props.name })}</div>;
};

const Child: React.FC = (props) => {
  return <div>{JSON.stringify(props)}</div>;
};

<Parent name="parent">
    <Child self="child" />
</Parent>
```

也可以使用 React.createElement 注入 props，此时因为 createElement 的参数是组件，而不是元素，而 children.type 就是元素的组件，故可以使用如下写法：

```JavaScript
return React.createElement(children.type, { ...rest });
```
