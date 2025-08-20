# 完整部署指南 - 一次性部署前后端

## 项目架构

```
CookerReference/
├── api/
│   └── index.js              # Vercel Serverless函数（使用ExpressDemo的所有功能）
├── ExpressDemo/              # 完整的后端实现
│   ├── routes/               # API路由
│   ├── models/               # 数据库模型
│   ├── services/             # 业务逻辑
│   └── config/               # 数据库配置
├── ReactDemo/                # React前端应用
├── vercel.json               # Vercel配置
└── package.json              # 项目配置
```

## 核心设计

### api/index.js 的作用
- 作为Vercel Serverless函数的入口
- 直接使用ExpressDemo的所有路由和功能
- 支持Mock模式和数据库模式
- 提供完整的API功能

### 部署策略
- **一次部署**: 只需要部署到Vercel
- **完整功能**: 前端 + 后端API + 数据库（可选）
- **灵活配置**: 通过环境变量控制功能

## 部署步骤

### 1. 本地测试

```bash
# 安装所有依赖
npm run install:all

# 测试API功能
npm run test:api

# 本地开发
npm run dev
```

### 2. Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署到Vercel
vercel --prod
```

### 3. 环境变量配置

在Vercel控制台中设置以下环境变量：

#### 基础配置
```
USE_MOCK=true              # 使用Mock数据（推荐用于演示）
NODE_ENV=production
```

#### 数据库配置（可选）
```
USE_MOCK=false             # 使用真实数据库
DATABASE_URL=postgresql://username:password@host:5432/database
```

## API端点

部署后，所有ExpressDemo的API都会以 `/api` 前缀提供：

### 用户认证
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册

### 用户偏好
- `GET /api/preference` - 获取用户偏好
- `POST /api/preference/update` - 更新用户偏好

### 社区功能
- `GET /api/community/recipes` - 获取社区食谱
- `POST /api/community/share` - 分享食谱
- `POST /api/community/recipes/:id/rate` - 评分

### 聊天功能
- `POST /api/chat` - AI聊天
- `POST /api/interactive` - 交互式聊天

### 图片处理
- `POST /api/image/upload` - 图片上传
- `POST /api/image/recognize` - 图片识别

## 功能特性

### Mock模式（USE_MOCK=true）
- ✅ 完整的Mock数据
- ✅ 所有API功能
- ✅ 无需数据库
- ✅ 快速部署

### 数据库模式（USE_MOCK=false）
- ✅ 真实数据库连接
- ✅ 数据持久化
- ✅ 完整业务逻辑
- ✅ 需要配置DATABASE_URL

## 开发建议

### 本地开发
```bash
# 启动完整的前后端开发环境
npm run dev

# 前端: http://localhost:5173
# 后端: http://localhost:5001
```

### 生产部署
```bash
# 部署到Vercel
vercel --prod

# 访问: https://your-project.vercel.app
```

## 常见问题

### 1. API返回404
- 检查vercel.json中的路由配置
- 确保ExpressDemo路由正确加载
- 验证API路径是否正确

### 2. 数据库连接问题
- 确保DATABASE_URL环境变量正确
- 检查数据库是否允许外部连接
- 如果问题持续，使用Mock模式

### 3. 冷启动延迟
- Vercel函数首次调用会有延迟
- 数据库连接会在每次请求时建立
- 考虑使用连接池优化

### 4. 文件大小限制
- Vercel函数有大小限制
- 确保依赖包不会过大
- 考虑使用CDN存储静态资源

## 优势

### 一次性部署
- ✅ 前端和后端同时部署
- ✅ 无需管理多个服务器
- ✅ 自动扩展和负载均衡

### 完整功能
- ✅ 所有ExpressDemo功能
- ✅ 支持Mock和数据库模式
- ✅ 完整的用户系统

### 成本效益
- ✅ Vercel免费额度
- ✅ 按使用量计费
- ✅ 无需服务器维护

## 下一步

1. 部署到Vercel
2. 配置环境变量
3. 测试所有功能
4. 根据需要选择Mock或数据库模式
