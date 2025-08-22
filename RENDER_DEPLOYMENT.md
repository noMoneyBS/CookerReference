# Render 部署指南

## 概述
本项目使用Render进行部署，包含以下服务：
- **后端API服务** (Node.js + Express)
- **前端静态网站** (React + Vite)
- **PostgreSQL数据库**

## 部署步骤

### 1. 准备GitHub仓库
确保您的代码已推送到GitHub仓库。

### 2. 在Render中创建服务

#### 2.1 创建数据库
1. 登录 [Render Dashboard](https://dashboard.render.com)
2. 点击 "New" → "PostgreSQL"
3. 配置：
   - **Name**: `cooker-database`
   - **Database**: `cooker_db`
   - **User**: `cooker_user`
   - **Plan**: `Starter` (免费)
4. 点击 "Create Database"
5. 记录数据库连接信息

#### 2.2 创建后端服务
1. 点击 "New" → "Web Service"
2. 连接您的GitHub仓库
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
   DATABASE_URL=<从数据库服务获取的连接字符串>
   JWT_SECRET=<生成一个随机字符串>
   USE_MOCK=false
   ```

5. 点击 "Create Web Service"

#### 2.3 创建前端服务
1. 点击 "New" → "Static Site"
2. 连接您的GitHub仓库
3. 配置：
   - **Name**: `cooker-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: `Starter` (免费)

4. 环境变量设置：
   ```
   VITE_API_URL=https://cooker-backend.onrender.com
   ```

5. 点击 "Create Static Site"

### 3. 配置环境变量

#### 后端环境变量
在Render Dashboard中，进入后端服务设置，添加以下环境变量：

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<数据库连接字符串>
JWT_SECRET=<随机生成的JWT密钥>
USE_MOCK=false
```

#### 前端环境变量
在Render Dashboard中，进入前端服务设置，添加：

```
VITE_API_URL=https://cooker-backend.onrender.com
```

### 4. 自动部署
- 每次推送到GitHub主分支时，Render会自动重新部署
- 可以在Render Dashboard中查看部署日志

## 服务URL
部署完成后，您将获得以下URL：
- **前端**: `https://cooker-frontend.onrender.com`
- **后端API**: `https://cooker-backend.onrender.com`
- **数据库**: 内部连接，通过DATABASE_URL访问

## 故障排除

### 常见问题
1. **构建失败**: 检查package.json中的依赖是否正确
2. **数据库连接失败**: 确认DATABASE_URL格式正确
3. **CORS错误**: 后端已配置CORS，支持所有来源

### 查看日志
- 在Render Dashboard中点击服务
- 查看 "Logs" 标签页获取详细错误信息

## 注意事项
- Render免费计划有使用限制
- 数据库在15分钟无活动后会休眠
- 建议在生产环境中使用付费计划以获得更好的性能

## 更新部署
1. 修改代码
2. 推送到GitHub
3. Render会自动重新部署
4. 在Dashboard中监控部署状态
