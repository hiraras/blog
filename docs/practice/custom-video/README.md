# 自控的 video

1. CustomVideo

index.tsx

```tsx
import React from "react";
import styles from "./style.module.less";
import classNames from "classnames";
import VideoControls from "../VideoControls";
import { getMediaSrc } from "@/utils/utils";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  className?: string;
  onEnded?: () => void;
  src?: string;
  poster?: string;
};

const CustomVideo: React.FC<Props> = (props) => {
  const { videoRef, className, onEnded, src, poster } = props;

  return (
    <div className={classNames(styles.customVideo, className)} id="video-ctn">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={styles.video}
        onEnded={onEnded}
      ></video>
      <VideoControls videoRef={videoRef} className={styles.controls} />
    </div>
  );
};

export default React.memo(CustomVideo);
```

style.module.less

```css
.customVideo {
  flex: 1;
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    .controls {
      visibility: visible;
    }
  }
}

.video {
  width: 100%;
  border-radius: 16px;
  height: 100%;
  object-fit: contain;
  background-color: black;
  &::-webkit-media-controls {
    display: none !important;
  }
  &::-moz-media-controls {
    display: none !important;
  }
  &::-ms-media-controls {
    display: none !important;
  }
  &::-o-media-controls {
    display: none !important;
  }
}

.controls {
  visibility: hidden;
}
```

2. VideoControls

index.tsx

```tsx
import React, { useEffect, useState } from "react";
import styles from "./style.module.less";
import {
  FullScreenIcon,
  PauseIcon,
  ExitFullScreenIcon,
  PlayIcon,
} from "@/assets";
import classNames from "classnames";
import { getVideoDuration } from "@/utils/utils";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  className?: string;
};

const VideoControls: React.FC<Props> = ({ className, videoRef }) => {
  const [isPause, setIsPause] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function isFullscreen() {
    return document.fullscreenElement === document.querySelector("#video-ctn");
  }

  function handleFullscreenChange() {
    setIsFullScreen(isFullscreen());
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
  }, []);

  function handleFullScreen() {
    if (isFullscreen()) {
      document.exitFullscreen();
    } else {
      // 请求视频全屏播放
      // 注意：这里全屏的是视频的包裹容器，如果直接请求video元素全屏，会导致控制条不显示
      document.querySelector("#video-ctn")?.requestFullscreen();
    }
  }

  function handlePlay() {
    if (videoRef.current?.readyState !== 4) {
      // 视频可以播放时readyState为4，如果视频加载失败则不会为4
      return;
    }
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setIsPause(Boolean(videoRef.current?.paused));
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = function () {
        // 视频元信息获取完毕后的钩子函数（这里视频时长获取完毕）
        setDuration(videoRef.current?.duration || 0);
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ontimeupdate = function (e) {
        // 视频进度变化时的钩子函数
        setCurrentTime(videoRef.current?.currentTime || 0);
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onended = function (e) {
        // 视频播放完毕的钩子函数
        setIsPause(true);
      };
    }
  }, []);

  return (
    <div className={classNames(styles.videoControls, className)}>
      <img
        src={isPause ? PlayIcon : PauseIcon}
        className={styles.icon}
        onClick={handlePlay}
      />
      <div className={styles.progressCtn}>
        <div
          className={styles.progress}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      <div>
        {getVideoDuration(currentTime)}/{getVideoDuration(duration)}
      </div>
      <img
        src={isFullScreen ? ExitFullScreenIcon : FullScreenIcon}
        className={styles.icon}
        onClick={handleFullScreen}
      />
    </div>
  );
};

export default React.memo(VideoControls);
```

style.module.less

```css
.videoControls {
  position: absolute;
  bottom: 12px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 24px;
  cursor: pointer;
}

.progressCtn {
  width: 1px;
  flex: 1;
  height: 3px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #fff;
  border-radius: 100px;
}
```

utils.ts

```ts
function getVideoDuration(duration: number) {
  const d = Math.floor(duration);
  const hour = Math.floor(d / 3600);
  const minutes = Math.floor((d - hour * 3600) / 60);
  const second = d % 60;
  const ph = padZero(hour);
  const pm = padZero(minutes);
  const ps = padZero(second);
  if (d >= 3600) {
    return `${ph}:${pm}:${ps}`;
  }
  return `${pm}:${ps}`;
}
```
