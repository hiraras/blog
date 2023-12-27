# 注释

## 文档注释

**注意：在 js 文件中，写好文档注释可以在调用的时候具有提示，但是参数有误的情况并不会提示**

好处：

1. 编辑器提示（实现函数功能过程中参数的使用提示/函数调用提示）
2. 可以借助一些工具快速生成文档(如 JSDoc)

### 示例 1

```js
/**
 * @description 函数防抖
 * @author hirara <kazilagui@163.com>
 * @test 这是一个提示测试
 * @param {Function} func 目标函数
 * @param {number} [duration] 延迟间隔，默认1s
 * @return {Function} 防抖的函数
 * @example
 *  debounce(function() {
 *    console.log(111)
 *  }, 300)
 */
function debounce(func, duration = 1000) {
  return () => {
    func();
  };
}

debounce(() => {});
```

**说明:**

1. 如果注释卸载 ts/tsx 文件（即与 ts 有关的文件中），可能会受到 ts 规则的影响导致一些类型标注错误。如果是 js 文件就可以正常显示
2. @description 用来标注函数功能
3. @author 用来标注作者还可以添加邮箱地址；邮箱地址放在`<>`中，在编辑器的提示框内可以点击该邮箱
4. @test 为随意添加的标注类型，用来测试是不是任意文本都会被提示出来。结果会提示但没啥特别作用
5. @param 用来标注参数，先接类型（类型放在`{}`内）再接参数名，最后还可以加上参数描述；如果参数是可选的可以将参数名放到`[]`内
6. @return 用来标注返回值类型
7. @example 后面可以添加函数调用的示例代码，可以为多行

### 示例 2

```js
/**
 * ajax请求
 * @param {string} url
 * @param {Object} options
 * @param {'get' | 'post'} options.method
 * @param {*} other
 */

function request(url, options, other) {}

request("/", { method: "get" });
```

```js
/**
 * ajax请求
 * @param {string} url
 * @param {{ method: 'get' | 'post', timeout: number }} options
 */

function request(url, options) {}

request("/", { method: "get", timeout: 3000 });
```

**说明:**

1. 类型为对象的，可以使用以上两种方式进行类型说明(options 参数)
2. any 类型可以使用 `*` 标注
