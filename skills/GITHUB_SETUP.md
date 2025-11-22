# 📤 GitHub 仓库创建和推送指南

本指南将帮助你在 GitHub 上创建新仓库并推送代码。

## 🎯 快速步骤

### 方法一：通过 GitHub 网页界面（推荐）

#### 1. 创建 GitHub 仓库

1. 登录你的 GitHub 账号
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name（仓库名称）**: `claude-code-learning-skill`
   - **Description（描述）**: `编程学习助手技能包 - Claude Code Skill for Programming Beginners`
   - **Public/Private（公开/私有）**: 选择 `Public`（推荐）
   - **❗ 重要**: 不要勾选 "Initialize this repository with a README"
   - 不要添加 .gitignore 和 license（我们已经有了）
4. 点击 `Create repository` 按钮

#### 2. 推送代码到 GitHub

创建完仓库后，GitHub 会显示推送指令。在你的终端中执行：

```bash
# 进入项目目录
cd /home/user/homework-ai/claude-code-learning-skill

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-learning-skill.git

# 推送代码到 GitHub
git push -u origin main
```

#### 3. 验证

访问你的仓库页面：
```
https://github.com/YOUR_USERNAME/claude-code-learning-skill
```

你应该能看到所有文件和漂亮的 README 页面！

---

## 方法二：使用 GitHub CLI（如果已安装）

```bash
# 进入项目目录
cd /home/user/homework-ai/claude-code-learning-skill

# 创建 GitHub 仓库并推送
gh repo create claude-code-learning-skill --public --source=. --remote=origin --push

# 在浏览器中打开仓库
gh repo view --web
```

---

## 📝 完整的命令清单

### 如果你已经在项目目录中

```bash
# 查看当前状态
git status

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-learning-skill.git

# 推送到 GitHub
git push -u origin main
```

### 如果你需要从其他目录进入

```bash
# 进入项目目录
cd /home/user/homework-ai/claude-code-learning-skill

# 查看当前状态
git status

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/claude-code-learning-skill.git

# 推送到 GitHub
git push -u origin main
```

---

## ❓ 常见问题

### Q: 推送时要求输入用户名和密码怎么办？

A: GitHub 已经不再支持密码认证，你需要使用 Personal Access Token（个人访问令牌）：

1. 访问 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 `Generate new token (classic)`
3. 设置权限（至少勾选 `repo`）
4. 生成并复制 token
5. 推送时，用户名输入你的 GitHub 用户名，密码处输入 token

### Q: 如果提示 "remote origin already exists" 怎么办？

A: 先删除旧的 remote，再添加新的：

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/claude-code-learning-skill.git
git push -u origin main
```

### Q: 如何验证 remote 是否配置正确？

A: 运行以下命令：

```bash
git remote -v
```

应该显示：
```
origin  https://github.com/YOUR_USERNAME/claude-code-learning-skill.git (fetch)
origin  https://github.com/YOUR_USERNAME/claude-code-learning-skill.git (push)
```

---

## 🎉 推送成功后

恭喜！你的技能包现在已经在 GitHub 上了。接下来你可以：

1. **分享给其他人**: 把仓库链接发给朋友
2. **添加主题标签**: 在仓库设置中添加 topics：`claude-code`, `skills`, `learning`, `beginner`
3. **完善 README**: 添加使用截图或演示视频
4. **收集反馈**: 在 Issues 中收集用户反馈
5. **持续改进**: 根据反馈优化技能包

---

## 📚 相关资源

- [GitHub 快速入门](https://docs.github.com/cn/get-started/quickstart)
- [Git 基础教程](https://git-scm.com/book/zh/v2)
- [如何写好 README](https://docs.github.com/cn/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)

---

需要帮助？欢迎随时提问！🚀
