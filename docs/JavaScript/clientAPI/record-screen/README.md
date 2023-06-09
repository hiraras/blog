## 录屏

```Vue
<template>
    <div id="app" v-cloak>
    <p v-if="!inProgress">
        <button @click="start" type="button">开始录制</button>
    </p>
    <p v-else>
        <button @click="stop" type="button">停止录制</button>
    </p>
    <video ref="video" controls autoplay webkit-playsinline="true" playsinline="true" width="50%"></video>
    <video ref="playbackVideo" controls autoplay webkit-playsinline="true" playsinline="true" width="50%"></video>
    </div>
</template>
```

```JavaScript
new Vue({
    el: '#app',
    data: {
        inProgress: false, //是否正在录制
        mediaDevices: null, //MediaDevices对象
        mediaRecorder: null, //录制器
        mediaStreamTrack: null, //音频或视频流
        blob: null, //录制的视频
    },
    mounted() {


    },
    methods: {
        isObjEmpty(obj) {
            return (
                obj === undefined ||
                obj === "undefined" ||
                obj == null ||
                obj === "" ||
                obj.length === 0 ||
                (typeof obj === "object" && Object.keys(obj).length === 0)
            );
        },
        start() {
            const mediaOpts = {
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
                    frameRate: { ideal: 100, max: 150 } //最佳帧率
                }
            }
            if (!this.isObjEmpty(typeof navigator.mediaDevices)) {
                navigator.mediaDevices.getDisplayMedia(mediaOpts).then(stream => {
                    this.inProgress = true;
                    this.mediaStreamTrack = stream;
                    const video = this.$refs.video;
                    if ("srcObject" in video) {
                        video.srcObject = stream
                    } else {
                        video.src = window.URL && window.URL.createObjectURL(stream) || stream
                    };
                    video.play();
                    this.mediaRecorder = new MediaRecorder(stream, {
                        audioBitsPerSecond: 1280000, //音频码率
                        videoBitsPerSecond: 8500000, //视频码率 (数值越大视频越清晰)
                        mimeType: 'video/webm;codecs=h264' //视频编码格式
                    });



                    this.mediaRecorder.start();
                    this.mediaRecorder.ondataavailable = e => {
                        this.blob = new Blob([e.data], {
                            'type': 'video/mp4'
                        });
                    }
                    this.mediaRecorder.onerror = e => {
                        console.error(e)
                    }
                    this.mediaRecorder.onstart = e => {
                        console.log('开始', e)
                    }
                    this.mediaRecorder.onstop = e => {
                        console.log('结束', e);
                        const url = window.URL && window.URL.createObjectURL(this.blob);
                        this.$refs.playbackVideo.src = url;
                    }
                    console.log('this.mediaRecorder', this.mediaRecorder);
                }).catch(err => {
                    console.log(err);
                    alert('该浏览器不支持屏幕录制');
                })
            } else {
                alert('该浏览器不支持屏幕录制');
            }


        },
        stop() {
            this.inProgress = false;
            this.mediaStreamTrack.getVideoTracks().forEach(track => {
                track.stop();
            })
            this.mediaRecorder.stop();
        },
    }
});
```
