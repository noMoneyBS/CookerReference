# Cooker Fullstack Application

这是一个前后端分离的全栈应用，包含 React 前端和 Express 后端，支持分别部署到不同的平台。

## 项目结构

```
root/
├── server/                # Express 后端
│   ├── app/
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # API 路由
│   │   ├── services/      # 业务逻辑服务
│   │   ├── config/        # 配置文件
│   │   └── index.js       # Express 主文件
│   ├── package.json       # 后端依赖
│   └── Procfile           # Heroku 部署配置
├── src/                   # React 前端
│   ├── components/        # React 组件
│   ├── api/              # API 调用
│   └── ...
├── index.html            # 前端入口文件
├── vite.config.js        # Vite 配置
├── package.json          # 前端依赖和脚本
├── vercel.json           # Vercel 部署配置
├── netlify.toml          # Netlify 部署配置
└── deploy-*.sh           # 部署脚本
```

## 开发环境设置

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
```

### 2. 环境变量配置

在 `server/` 目录下创建 `.env` 文件：

```env
# 数据库配置
DATABASE_URL=your_postgresql_connection_string
USE_MOCK=true

# 服务器配置
PORT=5001
NODE_ENV=development
```

### 3. 启动开发服务器

```bash
# 启动前端开发服务器（端口 3000）
npm run dev

# 启动后端开发服务器（端口 5001）
npm run api:dev
```

### 4. 快速部署测试

```bash
# 测试前端构建
./deploy-frontend.sh

# 测试后端启动
./deploy-backend.sh
```

### 5. 测试 API

启动后，您可以测试以下端点：

```bash
# 测试 API 是否工作
curl http://localhost:5001/test

# 测试登录接口
curl -X POST http://localhost:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 部署选项

### 前端部署

#### Vercel (推荐)
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置环境变量 `VITE_API_URL` 为你的后端服务地址
4. 自动部署

#### Netlify
1. 将代码推送到 GitHub
2. 在 [Netlify](https://netlify.com) 中导入项目
3. 设置环境变量 `VITE_API_URL`
4. 自动部署

### 后端部署

#### Render
1. 将代码推送到 GitHub
2. 在 [Render](https://render.com) 中创建 Web Service
3. 设置环境变量：
   - `DATABASE_URL`: 数据库连接字符串
   - `PORT`: 10000
   - `NODE_ENV`: production
   - `USE_MOCK`: false

#### Railway
1. 将代码推送到 GitHub
2. 在 [Railway](https://railway.app) 中导入项目
3. 配置环境变量

### 数据库部署

推荐使用 Render PostgreSQL 或 Railway PostgreSQL 的免费计划。

## 详细部署指南

查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 获取详细的部署步骤。

## 可用的脚本

### 前端脚本
- `npm run dev` - 启动前端开发服务器
- `npm run build` - 构建前端生产版本
- `npm run preview` - 预览构建结果

### 后端脚本
- `npm run api:dev` - 启动后端开发服务器
- `npm run api:start` - 启动后端生产服务器
- `npm run api:reset-db` - 重置数据库
- `npm run api:check-env` - 检查环境变量

## API 端点

- `/auth` - 用户认证
- `/preference` - 用户偏好
- `/rating` - 评分系统
- `/community` - 社区功能
- `/chat` - 聊天功能
- `/image` - 图片处理
- `/interactive` - 交互功能

## 技术栈

### 前端
- React 19
- Vite
- Tailwind CSS
- Axios

### 后端
- Express.js
- PostgreSQL
- Sequelize ORM
- Multer (文件上传)
- Sharp (图片处理)

## 注意事项

1. 前端和后端完全分离，需要分别部署
2. 确保前端环境变量 `VITE_API_URL` 指向正确的后端服务地址
3. 确保数据库连接字符串正确配置
4. 可以使用 Mock 模式进行开发（设置 `USE_MOCK=true`）
5. 生产环境建议使用真实的数据库（设置 `USE_MOCK=false`）
