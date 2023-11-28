## git 命令行

### git lg 别名配置

```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

**git clone storename**：克隆仓库

**git add filename | .**：将指定文件或当前有修改的文件全部添加到 `Stage` 阶段

**git commit -m 'commit'**：将 `Stage` 阶段的文件进行提交

**git commit --amend**：当 `commit` 的信息需要修改时可以使用该命令重命名

**git fetch**：当远程分支信息发生变化，可以使用该命令重新同步分支信息

**git checkout [-b] branch**：当带有 `-b` 时，新建分支，不带时切换到分支

**git branch [-a]**：查看本地有的分支，当有 `-a` 时，同时查看远程分支

**git branch -D branchname**：删除指定分支

**git branch -m old_branch new_branch**：重命名分支

**git pull**：拉取代码并合并

**git push origin branch**：向远程推送分支

**git push origin --delete branch**：删除远程分支

**git reset HEAD^ | hash**：回退分支的版本

**git reset --soft**：软回溯，回退 commit 的同时保留修改内容

**git merge branch**： 合并分支，历史记录会有分叉

**git rebase branch**：合并分支，历史记录是一条直线，但是可能需要多次处理冲突

**git rebase -i hash**：将若干个提交合并为一个提交

**git cherry-pick hash**：将一个提交的修改（可以在其他分支上）合并到当前

**git cherry-pick hashA..hashB**：(多个 commit，此时会 pick A 提交到 B 提交之间的提交不包括 A; A^..B 则包括 A)

**git reflog**：记录了 commit 的历史操作，即便 reset --hard 也会有历史的记录可以拿到历史提交的 hash

**git log**：查看当前分支的历史提交记录

**git config --global core.autocrlf false**：配置 git 提交修改时忽略 `CRLF` 格式

**git config --get core.autocrlf**

**git remote remove origin**: 删除 origin

**git tag**：显示出所有本地标签

**git ls-remote --tags origin**：显示出名为 origin 的远程存储库中的所有标签

**git tag [tagName]**：创建轻量级 tag

**git tag [tagName] -m"message"**：创建一个带有注释消息的 tag

**git show [tagName]**：查看标签信息

**git push origin [tagName]**：将 tag 推送到远程

**git push --delete origin [tagName]**：删除远程 tag

**git checkout [tagName]**：检出 tag，这将使存储库进入游离 HEAD 状态，此时可以再用 `git checkout -b [branchName]` 切出新分支

**git checkout -b [branchName] [tagName]**：创建一个分支，并将其设置为 tag 所指向的提交
