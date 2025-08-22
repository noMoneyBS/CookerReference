#!/bin/bash

# Render 部署脚本
echo "🚀 开始部署到 Render..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查Git状态
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  警告：有未提交的更改"
    echo "建议先提交更改："
    echo "  git add ."
    echo "  git commit -m '准备部署到Render'"
    echo "  git push"
fi

echo "✅ 项目检查完成"
echo ""
echo "📋 部署步骤："
echo "1. 确保代码已推送到GitHub"
echo "2. 登录 https://dashboard.render.com"
echo "3. 创建PostgreSQL数据库"
echo "4. 创建Web Service (后端)"
echo "5. 创建Static Site (前端)"
echo ""
echo "📖 详细步骤请查看 RENDER_DEPLOYMENT.md"
echo ""
echo "🔗 有用的链接："
echo "- Render Dashboard: https://dashboard.render.com"
echo "- 部署指南: RENDER_DEPLOYMENT.md"
echo "- render.yaml: 配置文件"

echo ""
echo "🎯 下一步："
echo "1. 推送到GitHub: git push"
echo "2. 按照 RENDER_DEPLOYMENT.md 在Render中创建服务"
echo "3. 配置环境变量"
echo "4. 等待自动部署完成"
