## 使用 github-actions 建立打包发布流水线

### 发布 vuepress 到 github pages

1. 建立项目

2. 在根目录创建 .github/workflows 目录，在其中添加.yml 文件

```yml
name: Build and Deploy
on: [push] # 监听push操作
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: vuepress-deploy
        uses: jenkey2011/vuepress-deploy@master # 这是一个打包发布工具
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 在github项目中配置的环境变量，值为 Personal access token 中生成的token
          TARGET_REPO: hiraras/blog # 打包后的目标仓库
          TARGET_BRANCH: gh-pages # 打包后的目标分支，gh-pages会自动发布到github pages
          BUILD_SCRIPT: yarn && yarn docs:build # 构建命令
          BUILD_DIR: docs/.vuepress/dist # 构建产物的路径
```

3. 创建 Personal access token

   - 点击头像
   - Settings
   - Developer settings
   - Personal access tokens
   - Tokens(classic)
   - 勾选相关权限后生成

生成的 token 需要保存，不然再进来的时候是无法查看的，只能重新生成

4. 创建仓库变量（有两种变量，Environment secrets 和 Repository secrets，前者范围小一点可能在 yml 文件中读不到，后者是仓库变量，具体还需要深入研究）

   - 进到对应项目
   - Settings
   - Secrets and variables
   - Actions
   - New repository secret
   - 创建 ACCESS_TOKEN ,值为上面的 token

5. 在远程创建 gh-pages 分支

6. 在 github pages 中配置发布分支

- 进到对应项目
  - Settings
  - Pages

7. 后续提交就会自动执行流水线啦
