# 前后端分离部署指南

## 概述
本项目采用前后端分离架构，可以分别部署到不同的平台：
- **前端**: React + Vite 静态网站
- **后端**: Node.js + Express API 服务
- **数据库**: PostgreSQL

## 部署选项

### 前端部署平台
- **Vercel** (推荐) - 免费，自动部署
- **Netlify** - 免费，自动部署
- **GitHub Pages** - 免费
- **Cloudflare Pages** - 免费

### 后端部署平台
- **Render** - 免费计划
- **Railway** - 免费计划
- **Heroku** - 付费
- **DigitalOcean App Platform** - 付费

### 数据库
- **Render PostgreSQL** - 免费计划
- **Railway PostgreSQL** - 免费计划
- **Supabase** - 免费计划
- **PlanetScale** - 免费计划

## 部署步骤

### 1. 数据库部署 (以 Render 为例)

1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 "New" → "PostgreSQL"
3. 配置：
   - **Name**: `cooker-database`
   - **Database**: `cooker_db`
   - **User**: `cooker_user`
   - **Plan**: `Starter` (免费)
4. 点击 "Create Database"
5. 记录数据库连接字符串

### 2. 后端部署 (以 Render 为例)

1. 在 Render 中点击 "New" → "Web Service"
2. 连接你的 GitHub 仓库
3. 配置：
   - **Name**: `cooker-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: `Starter` (免费)

4. 环境变量设置：
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=<你的数据库连接字符串>
   JWT_SECRET=<生成一个随机字符串>
   USE_MOCK=false
   ```

5. 点击 "Create Web Service"
6. 记录后端服务 URL (例如: `https://cooker-backend.onrender.com`)

### 3. 前端部署 (以 Vercel 为例)

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置：
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (根目录)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. 环境变量设置：
   ```
   VITE_API_URL=https://cooker-backend.onrender.com
   ```

6. 点击 "Deploy"

## 环境变量配置

### 后端环境变量
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://username:password@host:port/database_name
JWT_SECRET=your_random_secret_key
USE_MOCK=false
```

### 前端环境变量
```
VITE_API_URL=https://your-backend-url.com
```

## 本地开发

### 启动前端
```bash
npm install
npm run dev
```

### 启动后端
```bash
cd server
npm install
npm run dev
```

### 环境变量配置
在 `server/` 目录下创建 `.env` 文件：
```env
NODE_ENV=development
PORT=5001
DATABASE_URL=your_local_or_remote_database_url
JWT_SECRET=your_secret_key
USE_MOCK=true
```

## 故障排除

### 常见问题

1. **CORS 错误**
   - 确保后端设置了正确的 CORS 配置
   - 检查前端 API URL 是否正确

2. **数据库连接失败**
   - 检查 DATABASE_URL 是否正确
   - 确保数据库服务正在运行

3. **前端无法访问后端**
   - 检查 VITE_API_URL 环境变量
   - 确保后端服务正在运行

### 调试技巧

1. **检查后端日志**
   - 在部署平台查看后端服务日志

2. **检查前端构建**
   - 确保构建成功，没有错误

3. **测试 API 端点**
   ```bash
   curl https://your-backend-url.com/test
   ```

## 更新部署

### 自动部署
- 推送到 GitHub 主分支会自动触发部署
- 确保环境变量配置正确

### 手动部署
- 在部署平台手动触发重新部署
- 清除缓存后重新部署

## 性能优化

1. **前端优化**
   - 启用代码分割
   - 压缩静态资源
   - 使用 CDN

2. **后端优化**
   - 启用数据库连接池
   - 添加缓存层
   - 优化查询性能
