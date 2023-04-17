## chrome 的进阶使用

1. **command 面板**

   - ctrl + shift + P 调出 command 面板
   - capture xxx 可以截图
   - theme xxx 可以调整开发工具的主题

2. **copy()**

   浏览器全局的 copy()方法可以赋值变量，copy($\_)可以赋值上一个打印的值

3. **样式微调**

   调数值样式时，方向键可以以个位变化

   - 按住 shift 是 10 位变化
   - 按住 ctrl 是 100 位变化
   - 按住 alt 是 0.1 变化

4. **ctrl + 数字键可以快速切换浏览 tab**

5. **source 面板下的 snippets 面板可以保存代码块**

   - 执行 snippet 的代码相当于在 console 面板直接输入保存的代码
   - 可以 ctrl + P 打开 command 面板，输入"!"可快速选择要执行的 snippet 代码片段

6. **$**:

   - element 面板：$0 代表当前选择的 dom，$1 代表上次选择的，以此类推，最多能拿到$4
   - console 面板：

   1. 如果页面没有$变量(jQuery)，$等同于 document.querySelector

   2. `?` 等同于在 document.querySelectorAll 的基础上将返回的列表变成数组
      Array.from(document.querySelectorAll('div')) === ?('div')

7. **network 面板调试**：

   - 过滤：

     1. method:get 过滤出 get 请求
     2. -method:get 反过滤出 get 之外的请求

   - 右键 name 那一列可以选择想要显示的请求信息列
   - 在 source 面板右侧，XHR/fetch Breakpoints 可以为请求添加断点

   - 可以添加条件断点为断点添加暂停条件

8. **console**:

   - **console.assert**：第一个参数如果为 falsy，则打印后续内容
   - **console.table**：
     1. 打印一个列表为表格形式，该表格还可缩放、排序；
     2. 或者直接打印一个对象;
     3. 还可以接受第二个参数为一个数组，可以选择要显示的字段，类似 select 语句
   - **console.dir**：
     可以将 DOM 节点以真实 js 对象形式打印出来
   - **console.time(key),console.timeEnd(key)**:
     time 开启一个计时器，timeEnd 关闭该计时器，然后会打印出期间的间隔时间

   - console.log('%caaa', 'color: red;');为打印字符添加样式

   - 安装 console importer 扩展程序
     然后可以在 console 面板使用$i('npm package name') 安装 npm 包，然后就能在控制台直接使用了

9. **元素面板**：

   - 在元素面板按一下 h 键就能隐藏选中的元素；
     可以使用 Ctrl + 上下键来移动元素，不过只能在同级 DOM 内移动，还可以使用 Ctrl + z 来撤销；
   - 可以在 style 面板找到 box-shadow 样式，点击前面的图标，然后调试 box-shadow；
     animation 属性的运动速率也可以点击前面图标进行调试；
   - 右键 DOM 元素，点击 expand recursively 可以直接展开所有子元素

10. **Drawer 面板（最底下的第二个控制台）**：
    - **Network conditions**：
      可以模拟网络行为：3G 网、离线等，还可以模拟特定的用户代理
    - **Changes**：
      可以显示在浏览器中直接调试样式时，修改了那些地方
