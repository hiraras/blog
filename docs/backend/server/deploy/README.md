## 阿里云服务器配置 web 服务

1.  购买服务器（需要选择操作系统），会自动创建实例
2.  远程连接
3.  如果忘了连接密码需要重置实例密码
4.  安装宝塔控制面板
    centos 安装脚本：

    ```
    yum install -y wget && wget -O install.sh http://download.bt.cn/install/install.sh && sh install.sh
    ```

5.  安装结束会输出对应的宝塔访问地址、账户、密码
    <img src="/img/backend-server-deploy-01.png" />

6.  设置安全组，服务器默认没有 8888 端口，需要在安全组中添加 8888 端口，授权对象选 0.0.0.0/0 即可
7.  访问宝塔面板，安装必要软件
    nginx、pm2（管理 node 环境）
8.  nginx 服务启动后，往 html 文件夹中添加源文件即可通过域名访问 9.绑定域名，只要在域名解析中添加公网 ip（要同一个网络服务商）
