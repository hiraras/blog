# 分享

## twitter 分享

```ts
const shareUrl = "https://xxx.com";
const shareContent = `来MEET48看看 ${shareUrl}`;
const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  shareContent
)}`;
window.open(url, "_blank");
```

## Facebook

```ts
const shareUrl = "https://xxx.com";
const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  shareUrl
)}`;
window.open(url, "_blank");
```

## Discord

discord 是加入社群，直接打开邀请链接

```ts
const url = `https://discord.com/invite/W2vXnPqYBx`;
window.open(url, "_blank");
```
