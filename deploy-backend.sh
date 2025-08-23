#!/bin/bash

# 后端部署脚本
echo "🚀 开始部署后端..."

# 检查是否在正确的目录
if [ ! -f "server/package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 进入后端目录
cd server

# 检查是否安装了必要的工具
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 Node.js"
    exit 1
fi

# 安装依赖
echo "📦 安装后端依赖..."
npm install

# 检查环境变量
echo "🔍 检查环境变量..."
if [ ! -f ".env" ]; then
    echo "⚠️  警告: 未找到 .env 文件"
    echo "📝 请创建 .env 文件并设置以下环境变量:"
    echo "   DATABASE_URL=your_database_url"
    echo "   PORT=5001"
    echo "   NODE_ENV=development"
    echo "   USE_MOCK=true"
    echo ""
    echo "💡 或者使用示例文件: cp env.example .env"
else
    echo "✅ 找到 .env 文件"
fi

# 测试启动
echo "🧪 测试启动后端服务..."
timeout 10s npm start &
PID=$!
sleep 5

if kill -0 $PID 2>/dev/null; then
    echo "✅ 后端服务启动成功！"
    kill $PID
    echo ""
    echo "🎯 部署选项:"
    echo "1. Render: 推送到 GitHub，然后在 Render 中创建 Web Service"
    echo "2. Railway: 推送到 GitHub，然后在 Railway 中导入项目"
    echo "3. Heroku: 使用 Heroku CLI 部署"
    echo ""
    echo "📝 记得设置环境变量:"
    echo "   DATABASE_URL=your_database_url"
    echo "   PORT=10000"
    echo "   NODE_ENV=production"
    echo "   USE_MOCK=false"
else
    echo "❌ 后端服务启动失败，请检查错误信息"
    exit 1
fi
