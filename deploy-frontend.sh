#!/bin/bash

echo "🚀 部署前端到 Netlify..."

# 进入前端目录
cd ReactDemo

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查是否安装了 Netlify CLI
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI 未安装，正在安装..."
    npm install -g netlify-cli
fi

# 部署到 Netlify
echo "🌐 部署到 Netlify..."
netlify deploy --prod --dir=dist

echo "✅ 前端部署完成！"
