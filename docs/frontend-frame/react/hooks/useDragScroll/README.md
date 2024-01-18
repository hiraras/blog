# useDragScroll

该 hook 传入一个元素，该元素如果有 x 轴滚动条就可以鼠标拖动进行滚动。适用于一些要隐藏滚动条的场景

```ts
import { useEffect, useRef, useState } from "react";

export default function useDragScroll(selector: string) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const [initialed, setInitialed] = useState(false);
  const node = useRef<Element | null>();

  function handleMousedown(event: any) {
    isDragging.current = true;
    startX.current = event.pageX;
    event.preventDefault();
  }

  function handleMousemove(event: any) {
    if (isDragging.current && node.current) {
      const deltaX = event.pageX - startX.current;
      node.current.scrollLeft -= deltaX;
      startX.current = event.pageX;
    }
  }

  function handleMouseup() {
    isDragging.current = false;
  }

  useEffect(() => {
    node.current = document.querySelector(selector);
    setInitialed(true);
  }, []);

  useEffect(() => {
    if (!initialed) {
      return;
    }
    node.current?.addEventListener("mousedown", handleMousedown);
    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleMouseup);
    return () => {
      node.current?.removeEventListener("mousedown", handleMousedown);
      document.removeEventListener("mousemove", handleMousemove);
      document.removeEventListener("mouseup", handleMouseup);
    };
  }, [initialed]);
}
```
