## forceUpdate

### 参数

接受一个函数作为参数，该函数会在状态更新被提交(committed)之后触发

```js
forceUpdate(callback?)
```

### 用处

调用后会跳过 shouldComponentUpdate 的检查（但不会跳过子组件的），然后使用最新的 state 对象作为新的状态执行 render，可以用在以下两种情况

1. 你知道深层的状态属性发生改变（在状态上直接修改属性，然后调用 forceUpdate 使组件强制更新），把状态更新为最新，然后调用 re-render

```jsx
// 父组件的render导致子组件的重新渲染，但如果子组件继承于PureComponent，实际上list和obj的引用没变，不会触发重渲染
class List extends React.Component<any> {
  render() {
    console.log("list Render");
    return <div>{this.props.list}</div>;
  }
}
class Obj extends React.Component<any> {
  render() {
    console.log("obj Render");
    return <div>{JSON.stringify(this.props.obj)}</div>;
  }
}

class Welcome extends React.Component {
  state = {
    list: [1, 2, 3],
    obj: { a: 1 },
  };

  forceUpdateHandle = () => {
    this.forceUpdate();
  };

  changeHandle = () => {
    this.state.obj.a = 2;
  };

  render() {
    return (
      <div>
        <Obj obj={this.state.obj} />
        <List list={this.state.list} />
        <button onClick={this.forceUpdateHandle}>force update</button>
        <button onClick={this.changeHandle}>change</button>
        <br />
        <div>{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}
```

2. 状态之外的变量发生改变，同时想要更新组件（例如定义在组件外层的一个变量）

```jsx
// 以下代码点击 change 后不会更新界面上的x，调用 forceUpdate 后会重新渲染为最新的值

let x = 100;

class Welcome extends React.Component {
  forceUpdateHandle = () => {
    this.forceUpdate();
  };

  changeHandle = () => {
    x = 200;
  };

  render() {
    return (
      <div>
        <div>{x}</div>
        <button onClick={this.forceUpdateHandle}>force update</button>
        <button onClick={this.changeHandle}>change</button>
      </div>
    );
  }
}
```

### 扩展

**备份一下一个使用 immer 优化复杂状态更新的例子，后续在 immer 的文章里再弄过去**

```jsx
import React from "react";
import { produce } from "immer";

class List extends React.PureComponent<any> {
  render() {
    console.log("list Render");
    return <div>{this.props.list}</div>;
  }
}
class Obj extends React.PureComponent<any> {
  render() {
    console.log("obj Render");
    return <div>{JSON.stringify(this.props.obj)}</div>;
  }
}

class Welcome extends React.Component {
  state = {
    list: [1, 2, 3],
    obj: { a: 1 },
  };

  forceUpdateHandle = () => {
    this.forceUpdate();
  };

  changeHandle = () => {
    this.setState(
      produce((draft) => {
        draft.obj.a = 2;
      })
    );
  };

  render() {
    return (
      <div>
        <Obj obj={this.state.obj} />
        <List list={this.state.list} />
        <button onClick={this.forceUpdateHandle}>force update</button>
        <button onClick={this.changeHandle}>change</button>
        <br />
        <div>{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}
```
