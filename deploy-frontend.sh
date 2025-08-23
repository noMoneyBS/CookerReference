#!/bin/bash

# 前端部署脚本
echo "🚀 开始部署前端..."

# 检查是否安装了必要的工具
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 Node.js"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于 dist/ 目录"
    echo ""
    echo "🎯 部署选项:"
    echo "1. Vercel: 推送到 GitHub，然后在 Vercel 中导入项目"
    echo "2. Netlify: 推送到 GitHub，然后在 Netlify 中导入项目"
    echo "3. GitHub Pages: 使用 gh-pages 分支"
    echo ""
    echo "📝 记得设置环境变量 VITE_API_URL 为你的后端服务地址"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
