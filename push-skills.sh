#!/bin/bash

# 进入项目目录
cd /home/user/homework-ai

# 添加 skills 目录
git add skills/

# 提交
git commit -m "feat: 添加 Claude Code 学习助手技能包

添加内容：
- skills/learning-assistant/ 学习助手技能包
  - .claude/skills/learning-assistant/ 核心技能文件
  - README.md: 使用说明
  - EXAMPLES.md: 详细示例
  - LICENSE: MIT 开源协议

这是一个专为编程初学者设计的学习助手技能包，
提供通俗易懂的代码解释和概念教学。"

# 推送到 GitHub
git push -u origin claude/coding-tips-beginners-01Ts3PCgkAWZgdFa2KTmqpwN

echo "✅ 技能包已成功推送到 GitHub！"
echo "📦 仓库地址: https://github.com/zuofaming/homework-ai"
echo "🌿 分支: claude/coding-tips-beginners-01Ts3PCgkAWZgdFa2KTmqpwN"
