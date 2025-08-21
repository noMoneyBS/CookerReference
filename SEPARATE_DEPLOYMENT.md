# 分开部署指南

## 概述
将 ExpressDemo (后端) 和 ReactDemo (前端) 分别部署到不同的平台，实现更好的扩展性和维护性。

## 架构设计

```
┌─────────────────┐    ┌─────────────────┐
│   前端 (React)   │    │   后端 (Express) │
│                 │    │                 │
│  Netlify/Vercel │◄──►│  Vercel/Railway │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
```

## 1. 后端部署 (ExpressDemo)

### 选项 A: Vercel 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **配置环境变量**
   - 在 Vercel 控制台设置以下环境变量：
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `OPENAI_API_KEY`
     - `NUTRITION_API_KEY`
     - `ALLOWED_ORIGINS`

3. **部署**
   ```bash
   cd ExpressDemo
   vercel --prod
   ```

### 选项 B: Railway 部署

1. **连接 GitHub 仓库**
2. **设置环境变量**
3. **自动部署**

## 2. 前端部署 (ReactDemo)

### 选项 A: Netlify 部署

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **配置环境变量**
   - 在 Netlify 控制台设置：
     - `VITE_API_BASE_URL` = 你的后端URL

3. **部署**
   ```bash
   cd ReactDemo
   npm run build
   netlify deploy --prod --dir=dist
   ```

### 选项 B: Vercel 部署

1. **连接 GitHub 仓库**
2. **设置环境变量**
3. **自动部署**

## 3. 环境变量配置

### 后端环境变量
```env
DATABASE_URL=postgresql://username:password@host:port/db
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
NUTRITION_API_KEY=your_nutrition_key
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### 前端环境变量
```env
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_APP_NAME=CookerReference
```

## 4. CORS 配置

确保后端允许前端域名访问：

```javascript
// ExpressDemo/server.js
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
```

## 5. 部署步骤

### 第一步：部署后端
1. 选择部署平台 (Vercel/Railway)
2. 配置环境变量
3. 部署并获取后端URL

### 第二步：更新前端配置
1. 更新 `VITE_API_BASE_URL` 环境变量
2. 更新 `netlify.toml` 中的重定向规则

### 第三步：部署前端
1. 选择部署平台 (Netlify/Vercel)
2. 配置环境变量
3. 部署前端应用

## 6. 自动化部署

使用提供的脚本：

```bash
# 部署后端
chmod +x deploy-backend.sh
./deploy-backend.sh

# 部署前端
chmod +x deploy-frontend.sh
./deploy-frontend.sh
```

## 7. 监控和维护

### 后端监控
- 使用 Vercel Analytics 或 Railway 监控
- 设置健康检查端点
- 监控数据库连接

### 前端监控
- 使用 Netlify Analytics 或 Vercel Analytics
- 监控 API 调用成功率
- 设置错误追踪

## 8. 故障排除

### 常见问题

1. **CORS 错误**
   - 检查 `ALLOWED_ORIGINS` 配置
   - 确保前端域名在后端允许列表中

2. **API 调用失败**
   - 检查 `VITE_API_BASE_URL` 配置
   - 验证后端服务是否正常运行

3. **环境变量未生效**
   - 重新部署应用
   - 检查环境变量名称是否正确

## 9. 优势

✅ **独立扩展**: 前后端可以独立扩展
✅ **技术栈分离**: 可以使用不同的技术栈
✅ **团队协作**: 前后端团队可以独立工作
✅ **部署灵活性**: 可以选择最适合的平台
✅ **成本优化**: 可以根据需求选择不同的服务等级
