# Cooker Fullstack Application

这是一个基于 Vercel 的全栈应用，包含 React 前端和 Express 后端。

## 项目结构

```
root/
├── api/                    # Express 后端
│   ├── models/            # 数据模型
│   ├── routes/            # API 路由
│   ├── services/          # 业务逻辑服务
│   ├── config/            # 配置文件
│   ├── index.js           # Express 主文件（Vercel 入口）
│   └── package.json       # 后端依赖
├── src/                   # React 前端
│   ├── components/        # React 组件
│   ├── api/              # API 调用
│   └── ...
├── index.html            # 前端入口文件
├── vite.config.js        # Vite 配置
├── package.json          # 前端依赖和脚本
└── vercel.json           # Vercel 部署配置
```

## 开发环境设置

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd api && npm install
```

### 2. 环境变量配置

在 `api/` 目录下创建 `.env` 文件：

```env
# 数据库配置
DATABASE_URL=your_postgresql_connection_string
USE_MOCK=false

# 其他配置
PORT=5001
NODE_ENV=development
```

### 3. 启动开发服务器

#### 方式一：使用 Vercel Dev（推荐）
```bash
# 同时启动前端和后端（端口 3000）
vercel dev
```

#### 方式二：分别启动
```bash
# 启动前端开发服务器（端口 3000）
npm run dev

# 启动后端开发服务器（端口 5001）
npm run api:dev
```

### 4. 测试 API

启动后，您可以测试以下端点：

```bash
# 测试 API 是否工作
curl http://localhost:3000/api/test

# 测试登录接口
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动识别项目结构并部署

### 部署配置

- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **API 路由**: `/api/*` 自动路由到 `/api/index.js`
- **前端路由**: 所有其他路由重定向到 `index.html`

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

- `/api/auth` - 用户认证
- `/api/preference` - 用户偏好
- `/api/rating` - 评分系统
- `/api/community` - 社区功能
- `/api/chat` - 聊天功能
- `/api/image` - 图片处理
- `/api/interactive` - 交互功能

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

1. 在开发环境中，前端通过 Vite 代理访问后端 API
2. 在生产环境中，Vercel 会自动处理 API 路由
3. 确保数据库连接字符串正确配置
4. 可以使用 Mock 模式进行开发（设置 `USE_MOCK=true`）
