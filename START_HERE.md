# 🚀 开始使用 - START HERE

欢迎使用作业AI助手！这是一个快速启动指南。

## ⚡ 最快启动方式（推荐）

```bash
# 1. 运行一键安装脚本
./setup.sh

# 2. 配置 API Key
nano server/.env  # 填入你的通义千问 API Key

# 3. 启动项目
npm run dev
```

然后访问：http://localhost:3000

就这么简单！🎉

## 📋 详细说明

如果上面的快速启动遇到问题，请查看 [QUICKSTART.md](./QUICKSTART.md) 获取详细指南。

## 🔑 获取 API Key

1. 访问：https://dashscope.aliyun.com/
2. 注册/登录阿里云账号
3. 创建 API Key
4. 复制到 `server/.env` 文件

## 🎯 核心功能

1. **📸 拍照识别** - 上传作业照片
2. **🔍 错题解析** - AI自动分析错题
3. **📊 学情诊断** - 生成学习分析报告
4. **📄 家长报告** - 一键生成专业报告

## 💡 使用技巧

### 上传照片
- 支持拖拽上传
- 建议照片清晰、光线充足
- 最大5MB

### 分析结果
- 等待10-30秒
- 查看详细错题分析
- 了解优势和薄弱点

### 生成报告
- 点击"生成家长报告"
- 可选填写学生姓名
- 支持导出为文本文件

## 🛠️ 常用命令

```bash
# 同时启动前后端（推荐）
npm run dev

# 只启动后端
cd server && npm start

# 只启动前端
cd client && npm start

# 构建生产版本
npm run build
```

## ❓ 遇到问题？

### 依赖安装失败
```bash
# 清除并重新安装
npm cache clean --force
./setup.sh
```

### 端口被占用
```bash
# 修改后端端口
nano server/.env  # 修改 PORT=5001
```

### API 调用失败
- 检查 API Key 是否正确
- 确保有网络连接
- 查看浏览器控制台错误

## 📚 更多文档

- [详细启动指南](./QUICKSTART.md)
- [完整README](./README.md)
- [项目架构](./README.md#技术架构)

## 🎉 开始使用

现在你可以：
1. 打开 http://localhost:3000
2. 输入你的 API Key
3. 上传一张作业照片
4. 体验 AI 智能分析！

---

祝使用愉快！如有问题欢迎反馈。
