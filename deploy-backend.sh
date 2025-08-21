#!/bin/bash

echo "🚀 部署后端到 Vercel..."

# 进入后端目录
cd ExpressDemo

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 部署到 Vercel
vercel --prod

echo "✅ 后端部署完成！"
echo "📝 请复制后端URL并更新前端环境变量"
