# 项目结构说明

## 目录结构

```
CookerReference/
├── src/                    # React 前端代码
│   ├── components/         # React 组件
│   ├── api/               # API 调用
│   ├── services/          # 前端服务
│   ├── locales/           # 国际化文件
│   ├── assets/            # 静态资源
│   ├── App.jsx            # 主应用组件
│   └── main.jsx           # 应用入口
├── server/                # Express 后端代码
│   ├── app/
│   │   ├── routes/        # API 路由
│   │   ├── models/        # 数据模型
│   │   ├── services/      # 业务逻辑
│   │   ├── config/        # 配置文件
│   │   ├── mocks/         # Mock 数据
│   │   ├── locales/       # 国际化
│   │   └── index.js       # 服务器入口
│   └── package.json       # 后端依赖
├── public/                # 静态文件
├── package.json           # 前端依赖和脚本
├── render.yaml            # Render 部署配置
├── RENDER_DEPLOYMENT.md   # Render 部署指南
├── deploy-render.sh       # 部署脚本
└── README.md              # 项目说明
```

## 部署配置

### Render 部署
- **后端**: Web Service (Node.js + Express)
- **前端**: Static Site (React + Vite)
- **数据库**: PostgreSQL
- **配置文件**: `render.yaml`

### 环境变量
- 后端环境变量示例: `env.render.example`
- 开发环境变量示例: `env.example`

## 开发脚本

### 前端
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run lint         # 代码检查
```

### 后端
```bash
npm run api:dev      # 启动后端开发服务器
npm run api:start    # 启动后端生产服务器
npm run api:reset-db # 重置数据库
npm run api:check-env # 检查环境变量
```

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

## 部署流程

1. 推送到 GitHub
2. 在 Render 中创建服务
3. 配置环境变量
4. 等待自动部署

详细步骤请查看 `RENDER_DEPLOYMENT.md`
