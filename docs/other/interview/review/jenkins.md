# jenkins

运行依赖java，所以需要看好下载的jenkins所需的java版本，链接[https://www.jenkins.io/doc/book/platform-information/support-policy-java/]

## 下载地址

[https://www.jenkins.io/download/]

推荐下载 .war 包，windows包有各种问题

## 运行jenkins

命令行进入jenkins位置，并执行

```bash
# 默认为8080端口，被占用了就指定别的端口
java -jar jenkins.war --httpPort=9090
```

## 访问jenkins

浏览器访问 `http://localhost:9090`

C:\Users\Administrator\.jenkins\secrets\initialAdminPassword
这个地址保存了jenkins的密码

## 插件安装

访问 `http://localhost:9090` 的过程会包含插件的下载，如果下载失败的也没事，进入页面后，右上角设置按钮点击可以查看插件安装情况

插件系统的 Available plugins[http://localhost:9090/manage/pluginManager/available]，可以选择可以安装的插件进行安装。

如果遇到说磁盘空间不够了，可以设置jenkins的位置

```bash
set JENKINS_HOME=D:\jenkins
java -jar jenkins.war --httpPort=9090
```

## 任务

### freestyle任务

windows中不要选择shell命令，可以选择 "执行 Windows 批次指令"

```bash
echo "hello"
echo "first job" > hello.txt # 生成 D:\jenkins\workspace\first-job\hello.txt
```

### 流水线

可以用代码控制发布流程

包括声明式和脚本式两种方式

#### 声明式

```groovy
pipeline {
    agent any

    stages {
        stage('安装node_modules') {
            steps {
                echo 'pnpm i'
            }
        }
        stage('检查代码状态') {
            steps { // 一个stage只有一个steps
                echo 'pnpm lint:eslint'
                echo 'pnpm format'
            }
        }
        stage('测试') {
            steps {
                echo 'pnpm test'
            }
        }
        stage('构建') {
            steps {
                echo '构建成功'
            }
        }
    }
}

```

推荐插件 blue ocean - 更好的流水线任务查看工具

## Trigger - 触发器

决定任务的触发时机

- 定时构建 - 输入 cron 表达式
- 轮询 SCM(Source code Management) - 输入 cron 表达式，定时轮询代码仓库变化，当有变化的时候触发，所以还要配置git仓库信息
- git hook 触发 - 当git提交了代码，触发了 git hook 就会构建
