#!/bin/bash

# 作业AI助手 - 本地开发启动脚本

echo "======================================"
echo "  作业AI助手 - 本地开发环境启动"
echo "======================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js 16+"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 检查并安装根目录依赖
echo "📦 检查根目录依赖..."
if [ ! -d "node_modules" ]; then
    echo "正在安装根目录依赖..."
    npm install
else
    echo "✅ 根目录依赖已安装"
fi
echo ""

# 检查并安装后端依赖
echo "📦 检查后端依赖..."
cd server
if [ ! -d "node_modules" ]; then
    echo "正在安装后端依赖..."
    npm install
else
    echo "✅ 后端依赖已安装"
fi

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  警告: 未找到 .env 文件"
    echo "正在创建 .env 文件..."
    cp .env.example .env
    echo ""
    echo "请编辑 server/.env 文件，填入你的通义千问 API Key"
    echo "获取地址: https://dashscope.aliyun.com/"
    echo ""
fi

cd ..

# 检查并安装前端依赖
echo "📦 检查前端依赖..."
cd client
if [ ! -d "node_modules" ]; then
    echo "正在安装前端依赖..."
    npm install
else
    echo "✅ 前端依赖已安装"
fi

cd ..

echo ""
echo "======================================"
echo "  环境准备完成！"
echo "======================================"
echo ""
echo "启动说明："
echo ""
echo "方式1 - 使用 concurrently 同时启动（推荐）："
echo "  npm run dev"
echo ""
echo "方式2 - 分别启动："
echo "  终端1: cd server && npm start"
echo "  终端2: cd client && npm start"
echo ""
echo "访问地址："
echo "  前端: http://localhost:3000"
echo "  后端: http://localhost:5000"
echo ""
echo "======================================"
