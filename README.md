# 作业AI助手 - Homework AI Assistant

一个基于 React + Node.js + 通义千问 的智能作业辅导系统，提供拍照识别、错题解析、学情诊断和家长报告功能。

## ✨ 核心功能

### 1. 📸 拍照识别作业
- 支持拖拽上传和点击上传
- 自动验证图片格式（JPG、PNG）和大小（最大5MB）
- 实时预览上传的作业照片

### 2. 🔍 智能错题解析
- AI自动识别作业中的所有题目
- 精准定位错题并分析错误原因
- 提供详细的知识点标注和难度分级
- 给出具体的改进建议

### 3. 📊 学情诊断报告
- 分析学生的优势和薄弱点
- 提供个性化的学习建议
- 展示作业完成统计数据

### 4. 📄 家长报告生成
- 一键生成专业的学情分析报告
- 包含家长辅导指导建议
- 支持导出为文本文件

## 🏗️ 技术架构

```
homework-ai/
├── client/                 # React 前端
│   ├── public/
│   └── src/
│       ├── components/    # React 组件
│       ├── services/      # API 服务
│       ├── App.js
│       └── index.js
├── server/                # Node.js + Express 后端
│   ├── routes/           # 路由
│   ├── controllers/      # 控制器
│   ├── services/         # 业务逻辑
│   └── server.js
└── README.md
```

### 技术栈

**前端：**
- React 18
- Axios（HTTP 客户端）
- CSS3（现代化样式）

**后端：**
- Node.js
- Express
- CORS（跨域支持）

**AI 服务：**
- 阿里云通义千问 VL Plus（多模态模型）

## 🚀 快速开始

### 前置要求

- Node.js 16+
- npm 或 yarn
- 通义千问 API Key（从 [阿里云](https://dashscope.aliyun.com/) 获取）

### 安装步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd homework-ai
```

2. **一键安装所有依赖**
```bash
npm run install-all
```

或者分别安装：

```bash
# 安装后端依赖
cd server
npm install

# 安装前端依赖
cd ../client
npm install
```

3. **配置环境变量**
```bash
cd server
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

`.env` 文件内容：
```
PORT=5000
QWEN_API_KEY=your_api_key_here
NODE_ENV=development
```

4. **启动项目**

方式一：使用根目录脚本（推荐）
```bash
# 在项目根目录
npm run dev
```

方式二：分别启动

终端1 - 启动后端：
```bash
cd server
npm start
```

终端2 - 启动前端：
```bash
cd client
npm start
```

- 后端服务：`http://localhost:5000`
- 前端应用：`http://localhost:3000`

## 📖 使用说明

### 1. 设置 API Key
- 打开应用后，在顶部输入框填入你的通义千问 API Key
- API Key 会自动保存到浏览器本地存储

### 2. 上传作业照片
- 点击上传区域选择照片，或直接拖拽照片到页面
- 支持 JPG、PNG 格式，最大 5MB

### 3. 开始分析
- 上传成功后点击"开始分析"按钮
- AI 将在 10-30 秒内完成分析

### 4. 查看结果
- 查看统计数据（总题数、正确率等）
- 查看详细的错题解析
- 了解学习优势和需要加强的方面

### 5. 生成家长报告
- 点击"生成家长报告"按钮
- 可选输入学生姓名
- 查看专业的学情分析报告
- 支持导出为文本文件

## 🔧 API 文档

### 后端 API

#### 1. 分析作业
```
POST /api/analyze
```

请求体：
```json
{
  "imageData": "data:image/jpeg;base64,/9j/4AAQ...",
  "apiKey": "sk-xxx"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "totalQuestions": 10,
    "correctCount": 8,
    "errors": [...],
    "overallComment": "...",
    "strengths": [...],
    "weaknesses": [...],
    "studyTips": [...]
  }
}
```

#### 2. 生成家长报告
```
POST /api/report/generate
```

请求体：
```json
{
  "analysisData": {...},
  "studentName": "张三",
  "apiKey": "sk-xxx"
}
```

响应：
```json
{
  "success": true,
  "data": {
    "title": "学情分析报告",
    "summary": "...",
    "performanceLevel": "良好",
    "strengthsAnalysis": "...",
    "weaknessesAnalysis": "...",
    "recommendedActions": [...],
    "parentGuidance": "...",
    "encouragement": "..."
  }
}
```

## 🎨 界面预览

- **现代化渐变设计**：紫色主题，视觉舒适
- **响应式布局**：完美支持移动端和桌面端
- **流畅动画**：淡入、悬停、弹跳等动画效果
- **清晰的信息层次**：卡片式布局，一目了然

## 🔐 安全说明

- API Key 仅存储在浏览器本地，不会上传到服务器
- 所有图片数据通过 HTTPS 加密传输
- 不保存用户上传的作业照片

## 📝 环境变量说明

### 后端 `.env`
```bash
PORT=5000                    # 服务器端口
QWEN_API_KEY=sk-xxx         # 通义千问 API Key（可选，前端也可传入）
NODE_ENV=development        # 运行环境
```

### 前端（可选）
如需修改 API 地址，创建 `.env` 文件：
```bash
REACT_APP_API_URL=http://localhost:5000
```

## 🚢 部署指南

### 部署后端（示例：使用 PM2）

```bash
cd server
npm install -g pm2
pm2 start server.js --name homework-ai-server
pm2 save
pm2 startup
```

### 部署前端（示例：使用 Nginx）

```bash
cd client
npm run build

# 将 build 目录部署到 Nginx
sudo cp -r build/* /var/www/html/
```

Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📦 项目脚本

```bash
# 根目录
npm run install-all   # 安装所有依赖
npm run dev          # 同时启动前后端（开发模式）
npm run server       # 只启动后端
npm run client       # 只启动前端
npm run build        # 构建前端生产版本

# server 目录
npm start            # 启动后端（生产模式）
npm run dev          # 启动后端（开发模式，自动重启）

# client 目录
npm start            # 启动前端开发服务器
npm run build        # 构建前端生产版本
npm test             # 运行测试
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License

## 🙏 致谢

- [阿里云通义千问](https://dashscope.aliyun.com/) - 提供强大的 AI 能力
- [React](https://reactjs.org/) - 前端框架
- [Express](https://expressjs.com/) - 后端框架

## 📞 联系方式

如有问题，请提交 Issue 或联系开发者。

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
