## 算法-面试题

1. 用递归算法实现，数组长度为 5 且元素的随机数在 2-32 间不重复的值

```js
function getRandom(start, end) {
  return Math.floor(Math.random() * (end - start) + 1) + start;
}

function createArr(arr = []) {
  const num = getRandom(2, 32);
  while (arr.length < 5) {
    if (!arr.includes(num)) {
      arr.push(num);
    }
    createArr(arr);
  }
  return arr;
}

console.log(createArr());
```

2. 写一个方法去掉字符串中的空格

```js
// 1
function excludeSpace(str) {
  return str.replace(/\s+/g, "");
}
// 2
function excludeSpace(str) {
  let r = "";
  for (let char of str) {
    if (char !== " ") {
      r += char;
    }
  }
  return r;
}
// 3
function excludeSpace(str) {
  return str.split(" ").join("");
}
```

3. 去除字符串中最后一个指定的字符

```js
function excludeLastChar(str, char) {
  return str.replace(
    new RegExp(`(${char})([^${char}]*)$`),
    function ($1, $2, $3) {
      return $3;
    }
  );
}
```

4. 写一个方法把下划线命名转成大驼峰命名

```js
function changeLine(str) {
  return str.replace(/_\w/g, function ($1) {
    return $1.slice(1).toUpperCase();
  });
}
```

5. 写一个把字符串大小写切换的方法

```js
function transformLowAndHigh(str) {
  return str.replace(/\w/g, function ($1) {
    return $1.codePointAt() > 90 ? $1.toUpperCase() : $1.toLowerCase();
  });
}
```

6. 统计某一字符或字符串在另一个字符串中出现的次数

```js
function countSubStr(originStr, subStr) {
  return originStr.match(new RegExp(subStr, "g"))?.length ?? 0;
}
```
