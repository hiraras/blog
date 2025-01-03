# github 访问缓慢，ping 不通，pull,push 失败

## 原因：dns 污染

github.com 有多个响应 IP 服务器。这就是开头提到的 CDN 服务。多个平行的服务器响应，均匀了中心服务器的负载，使得网络通讯更加迅速。
现实的情况是，github.com 启用的 CDN 节点遭到了 DNS 污染，错误的 IP 指向，包括错误 IP、响应过慢的 IP，都会造成我们访问 Github 失败。

「IP 地址」：每个连接到互联网的主机都会被分配一个 IP 地址，用来唯一标识该主机，节点之间的访问通过 IP 地址来进行，形如 192.30.253.112。
「域名」：IP 地址使用数字标识，使用时不好记忆书写，因此在 IP 地址的基础上又发展出一种符号化的地址方案，来代替数字型的 IP 地址。每一个符号化的地址都与特定的 IP 地址对应。IP 地址相对应的字符型地址，就被称为域名。形如 github.com。
「网址」：URL「统一资源定位符」，俗称为网址。浏览器地址栏输入的字符串，服务器上储存文件的位置。格式为：<协议>://<域名或 IP>:<端口>/<路径>。<协议>://<域名或 IP>是必需的，<端口>/<路径>有时可省略。形如https://www.github.com/wootommy。
「DNS」：域名虽然便于人们记忆，但节点之间通过 IP 地址通讯。两者之间的转换工作称为域名解析，域名解析需要由专门的域名解析服务器来完成，即 DNS 服务器。域名的最终指向是 IP 地址。

## 解决办法：修改 Hosts 文件

### 修改文件的路径

windows:
C:\Windows\System32\drivers\etc\hosts
mac
\etc\hosts
配置 ip
[https://ipaddress.com/](https://ipaddress.com/)
140.82.114.4 github.com
140.82.114.9 nodeload.github.com
140.82.112.5 api.github.com
140.82.112.10 codeload.github.com
185.199.108.133 raw.github.com
185.199.108.153 training.github.com
185.199.108.153 assets-cdn.github.com
185.199.108.153 documentcloud.github.com
140.82.114.17 help.github.com

# domain: githubstatus.com

185.199.108.153 githubstatus.com

# domain: fastly.net

199.232.69.194 github.global.ssl.fastly.net

# domain: githubusercontent.com

185.199.108.133 raw.githubusercontent.com
185.199.108.154 pkg-containers.githubusercontent.com
185.199.108.133 cloud.githubusercontent.com
185.199.108.133 gist.githubusercontent.com
185.199.108.133 marketplace-screenshots.githubusercontent.com
185.199.108.133 repository-images.githubusercontent.com
185.199.108.133 user-images.githubusercontent.com
185.199.108.133 desktop.githubusercontent.com
185.199.108.133 avatars.githubusercontent.com
185.199.108.133 avatars0.githubusercontent.com
185.199.108.133 avatars1.githubusercontent.com
185.199.108.133 avatars2.githubusercontent.com
185.199.108.133 avatars3.githubusercontent.com
185.199.108.133 avatars4.githubusercontent.com
185.199.108.133 avatars5.githubusercontent.com
185.199.108.133 avatars6.githubusercontent.com
185.199.108.133 avatars7.githubusercontent.com
185.199.108.133 avatars8.githubusercontent.com

### 修改后刷新 dns 缓存

windows
ipconfig /flushdns
mac
sudo killall -HUP mDNSResponder
