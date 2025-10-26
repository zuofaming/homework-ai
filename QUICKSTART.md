# 作业AI助手 - 快速启动指南

## 🚀 快速开始

### 方式一：一键启动（推荐）

```bash
# 1. 进入项目目录
cd homework-ai

# 2. 给启动脚本添加执行权限
chmod +x setup.sh

# 3. 运行启动脚本（会自动安装所有依赖）
./setup.sh

# 4. 配置 API Key
# 编辑 server/.env 文件，填入你的通义千问 API Key
nano server/.env  # 或使用其他编辑器

# 5. 启动项目
npm run dev
```

### 方式二：手动启动

#### 步骤 1: 安装依赖

```bash
# 安装根目录依赖（concurrently）
npm install

# 安装后端依赖
cd server
npm install

# 安装前端依赖
cd ../client
npm install

# 返回根目录
cd ..
```

#### 步骤 2: 配置环境变量

```bash
# 复制环境变量模板
cd server
cp .env.example .env

# 编辑 .env 文件，填入你的 API Key
nano .env
```

`.env` 文件内容：
```
PORT=5000
QWEN_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxx
NODE_ENV=development
```

**如何获取 API Key：**
1. 访问 https://dashscope.aliyun.com/
2. 注册/登录阿里云账号
3. 进入控制台 -> API-KEY 管理
4. 创建新的 API-KEY
5. 复制并粘贴到 `.env` 文件中

#### 步骤 3: 启动服务

**选项 A - 同时启动前后端（推荐）**
```bash
# 在项目根目录运行
npm run dev
```

**选项 B - 分别启动**

终端 1 - 启动后端：
```bash
cd server
npm start
```

终端 2 - 启动前端：
```bash
cd client
npm start
```

#### 步骤 4: 访问应用

- 前端应用：http://localhost:3000
- 后端API：http://localhost:5000
- 健康检查：http://localhost:5000/health

## 📋 使用说明

### 1. 设置 API Key
打开应用后，在顶部输入框填入通义千问 API Key（会自动保存）

### 2. 上传作业照片
- 点击上传区域选择照片
- 或直接拖拽照片到页面
- 支持 JPG、PNG，最大 5MB

### 3. 分析作业
点击"开始分析"，等待 10-30 秒

### 4. 查看结果
- 查看统计数据和错题详情
- 点击"生成家长报告"获取详细报告
- 可导出报告为文本文件

## 🔧 常见问题

### 问题 1: npm install 失败

**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
rm -rf client/node_modules client/package-lock.json

# 重新安装
npm install
cd server && npm install
cd ../client && npm install
```

### 问题 2: 端口被占用

**解决方案：**

后端端口（5000）被占用：
```bash
# 查找占用端口的进程
lsof -i :5000

# 杀死进程
kill -9 <PID>

# 或修改 server/.env 中的 PORT
```

前端端口（3000）被占用：
```bash
# React 会自动提示使用其他端口
# 或手动设置
PORT=3001 npm start
```

### 问题 3: API 请求失败

**检查清单：**
- [ ] 后端服务是否正常运行（访问 http://localhost:5000/health）
- [ ] API Key 是否正确配置
- [ ] 网络连接是否正常
- [ ] 检查浏览器控制台的错误信息

### 问题 4: concurrently 命令未找到

**解决方案：**
```bash
# 在根目录安装依赖
npm install

# 或单独安装 concurrently
npm install --save-dev concurrently
```

### 问题 5: 前端无法连接后端

**解决方案：**
1. 确保后端在 5000 端口运行
2. 检查 `client/package.json` 中的 proxy 配置：
   ```json
   "proxy": "http://localhost:5000"
   ```
3. 重启前端开发服务器

## 📦 项目脚本说明

### 根目录脚本
```bash
npm run dev          # 同时启动前后端
npm run server       # 只启动后端
npm run client       # 只启动前端
npm run install-all  # 安装所有依赖
npm run build        # 构建前端生产版本
```

### 后端脚本（server/）
```bash
npm start            # 启动后端（生产模式）
npm run dev          # 启动后端（开发模式，自动重启）
```

### 前端脚本（client/）
```bash
npm start            # 启动开发服务器
npm run build        # 构建生产版本
npm test             # 运行测试
```

## 🔍 验证安装

运行以下命令验证安装：

```bash
# 检查后端
curl http://localhost:5000/health

# 预期输出
{"status":"ok","message":"服务运行正常"}
```

在浏览器访问：
- http://localhost:3000 （应该看到应用界面）
- http://localhost:5000/health （应该看到 JSON 响应）

## 🎯 下一步

1. **测试上传功能**：上传一张作业照片
2. **测试分析功能**：点击"开始分析"
3. **测试报告功能**：生成家长报告
4. **测试导出功能**：导出报告文件

## 📞 需要帮助？

如果遇到问题：
1. 检查终端输出的错误信息
2. 查看浏览器控制台的错误
3. 确认所有依赖已正确安装
4. 检查 API Key 是否有效

---

Happy Coding! 🎉
