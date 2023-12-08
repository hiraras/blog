# mini-vue

数据响应式：

粗犷的解释：数据的改变，促成界面的改变
本质：数据的改变，触发一系列使用过该数据的函数、方法的执行

```js
// mini vue
const obj = {
  name: "haha",
  age: 2,
};

observe(obj);

function observe(obj) {
  for (const key in obj) {
    let internalVal = obj[key];
    let funcs = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (window.__func) {
          funcs.add(window.__func);
        }
        return internalVal;
      },
      set(val) {
        internalVal = val;
        funcs.forEach((func) => func());
      },
    });
  }
}

// 将函数运行交给autorun，在运行的开始和结束保存这个函数，那么在运行过程中函数内部调用getter函数时就能获取到这个函数，从而进行依赖收集
function autorun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}

function sayName() {
  console.log(obj.name);
}

function sayAge() {
  console.log(obj.age);
}

autorun(sayName);
autorun(sayAge);
```
