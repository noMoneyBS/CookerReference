#!/bin/bash

echo "🔧 修复Render部署问题..."

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "✅ 检查项目结构..."

# 检查关键文件
if [ ! -f "render.yaml" ]; then
    echo "❌ 缺少 render.yaml 文件"
    exit 1
fi

if [ ! -f "server/package.json" ]; then
    echo "❌ 缺少 server/package.json 文件"
    exit 1
fi

echo "✅ 项目结构检查完成"

echo ""
echo "🔍 问题诊断："
echo "1. 'Missing script: start' 错误通常发生在以下情况："
echo "   - 在Render中创建了错误的服务类型"
echo "   - 前端服务被错误地创建为 'Web Service' 而不是 'Static Site'"
echo ""

echo "📋 解决方案："
echo ""
echo "1. 在Render Dashboard中检查您的服务类型："
echo "   - 后端服务应该是 'Web Service'"
echo "   - 前端服务应该是 'Static Site'"
echo ""
echo "2. 如果前端服务类型错误，请："
echo "   - 删除错误的前端服务"
echo "   - 重新创建为 'Static Site' 类型"
echo "   - 使用以下配置："
echo "     * Build Command: npm install && npm run build"
echo "     * Publish Directory: dist"
echo "     * Environment Variable: VITE_API_URL=https://your-backend-url.onrender.com"
echo ""
echo "3. 确保后端服务配置正确："
echo "   - Build Command: cd server && npm install"
echo "   - Start Command: cd server && npm start"
echo ""

echo "🎯 推荐操作："
echo "1. 使用 render.yaml 进行一键部署："
echo "   - 在Render Dashboard中点击 'New' → 'Blueprint'"
echo "   - 连接您的GitHub仓库"
echo "   - 选择 render.yaml 文件"
echo "   - Render会自动创建所有服务"
echo ""

echo "📖 详细步骤请查看 RENDER_DEPLOYMENT.md"
