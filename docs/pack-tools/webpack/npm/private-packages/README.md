## 部署私人 npm 服务器

[我的服务](http://www.tinypen.cn:4873)

这里使用 `verdaccio` 管理

1. 使用 npm 全局安装 verdaccio
2. 在 config.yaml 文件中配置 listen: 4873（在服务器中需要该步骤，如果不配置外部无法访问，注意：还要配置服务器的安全组/防火墙端口，4873 为默认端口）
3. 执行 verdaccio 启动服务
4. 在项目总添加.npmrc 文件，添加注册地址 @ljmp:registry=http://www.tinypen.cn:4873/
   （可以理解成 npm running cnfiguration, 即 npm 运行时配置文件）
5. 在项目中使用 npm adduser --registry http://www.tinypen.cn:4873（如果出现web not support login 信息则需要添加 --auth-type=legacy 后缀）注册用户
6. 在项目中使用 npm login --registry http://www.tinypen.cn:4873 登录
7. 使用 npm publish 发布包
