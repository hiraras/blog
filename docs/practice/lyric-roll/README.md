# 歌词滚动效果-笔记

innerHTML 效率低的原因

innerHTML 赋值为一个字符串时，浏览器需要解析 html 字符串，会经过一整个渲染流程，而使用 js 直接操作 dom 树，就避免了解析这个过程

一个原生界面经历以下开发阶段

1. 静态界面
2. 数据逻辑(数据处理)
3. 界面逻辑(界面变化需要用到的功能方法)
4. 事件(监听)

框架的意义是帮我们完成了界面逻辑

## 代码

### html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" rel="external nofollow" href="favicon.ico" />
    <title></title>
    <link rel="stylesheet" href="./css/index.css" />
  </head>
  <body>
    <audio
      src="assets/audio/鈴華ゆう子 - 永世のクレイドル (永世的摇篮).flac"
      controls
    ></audio>
    <div class="container">
      <ul class="lrc-list"></ul>
    </div>
  </body>
  <script src="./test.js"></script>
  <script></script>
</html>
```

### css

```css
* {
  margin: 0;
  padding: 0;
}

body {
  background: #000;
  color: #666;
  text-align: center;
}

audio {
  width: 450px;
  margin: 30px auto;
}

.container {
  height: 420px;
  overflow: hidden;
}

.container ul {
  transform: translateY(10px);
  transition: transform 0.2s;
  list-style: none;
}

.container li {
  height: 30px;
  line-height: 30px;
  transition: transform 0.2s;
}

.container li.active {
  transform: scale(1.2);
  color: #fff;
}
```

### js

```js
const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".lrc-list"),
  container: document.querySelector(".container"),
};

const lyric = `[00:0.0] 永世的摇篮
[00:10.0] 
[00:27.0] 青い空は遠く広がって
[00:34.0] 幾つの火が消えるのだろう?
[00:40.0] 君が願う夢の
[00:45.0] その欠片を全て集めてゆく
[00:53] 憧れは絡まった車輪
[01:00] 黄昏の様に深く
[01:06] 一人きりではとても
[01:10] 超えられない夜には
[01:13] 悲しみのその全てにと
[01:17] 希望を燈そう
[01:19] 永遠がきっとあって
[01:23] 誰もが手をのばして
[01:26] いつか君のその手を握るよ
[01:48] 風に舞った砂が降り注ぎ
[01:54] 歩む足は重くなって
[02:00]  例えば今日眠る場所も
[02:07] 何もかもを失っても
[02:14] 朧気な温もりを探した
[02:19] 時が移ろう程に
[02:26] 振り返るだけ過去は`;

function parseLyric(lyric) {
  const lines = lyric.split("\n");
  return lines.map((line) => {
    const [t, words] = line.split("] ");
    const timeStr = t.slice(1);
    return { time: parseTimeStr(timeStr), words };
  });
}

function parseTimeStr(timeStr) {
  const [minutes, seconds] = timeStr.split(":");
  return minutes * 60 + Number(seconds);
}

const lyricList = parseLyric(lyric);
// console.log(lyricList)

function findIndex(time) {
  for (let i = 0; i < lyricList.length; i++) {
    if (lyricList[i].time > time) {
      return i - 1;
    }
  }
  return lyricList.length - 1;
}

function createLyricElements() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < lyricList.length; i++) {
    const li = document.createElement("li");
    li.textContent = lyricList[i].words;
    fragment.appendChild(li);
  }
  doms.ul.appendChild(fragment);
}

createLyricElements();

const containerHeight = doms.container.clientHeight;
const liHeight = doms.ul.children[0].clientHeight;
const maxOffset = doms.ul.clientHeight - containerHeight;

function setOffset() {
  const currentTime = doms.audio.currentTime;
  const index = findIndex(currentTime);
  const currentLineOffset = index * liHeight;
  const offset = currentLineOffset + liHeight / 2 - containerHeight / 2;
  doms.ul.style.transform = `translateY(${-Math.min(
    Math.max(0, offset),
    maxOffset
  )}px)`;
  setActive(index);
}

function setActive(index) {
  const activeLi = document.querySelector("li.active");
  activeLi?.classList.remove("active");
  doms.ul.children[index].classList.add("active");
}

// 添加audio播放监听事件
doms.audio.addEventListener("timeupdate", setOffset);
```
