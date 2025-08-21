# 部署指南

## Vercel 部署

### 1. 项目结构
项目已重构为 Vercel 支持的全栈结构：
```
root/
├── api/              # Express 后端
├── src/              # React 前端
├── index.html        # 前端入口
├── vite.config.js    # Vite 配置
├── package.json      # 前端依赖
└── vercel.json       # Vercel 配置
```

### 2. 环境变量配置

在 Vercel 项目设置中配置以下环境变量：

#### 必需的环境变量
- `DATABASE_URL`: PostgreSQL 数据库连接字符串
- `USE_MOCK`: 是否使用 Mock 模式 (true/false)

#### 可选的环境变量
- `PORT`: 服务器端口 (默认: 5001)
- `NODE_ENV`: 环境模式 (development/production)

### 3. 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "重构为 Vercel 全栈项目"
   git push origin main
   ```

2. **在 Vercel 中导入项目**
   - 登录 Vercel
   - 点击 "New Project"
   - 选择 GitHub 仓库
   - 配置环境变量
   - 部署

3. **自动部署配置**
   - 构建命令: `npm run build`
   - 输出目录: `dist`
   - 安装命令: `npm install && cd api && npm install`

### 4. API 路由

Vercel 会自动处理以下路由：
- `/api/*` → 路由到 `api/index.js`
- `/*` → 路由到 `index.html` (前端路由)

### 5. 数据库设置

确保 PostgreSQL 数据库已正确配置：
1. 创建数据库
2. 配置连接字符串
3. 运行数据库迁移 (如果需要)

### 6. 验证部署

部署完成后，访问以下端点验证：
- 前端: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/auth`

## 本地开发

### 启动开发服务器

#### 方式一：使用 Vercel Dev（推荐）
```bash
# 安装依赖
npm install
cd api && npm install

# 同时启动前端和后端 (端口 3000)
vercel dev
```

#### 方式二：分别启动
```bash
# 安装依赖
npm install
cd api && npm install

# 启动前端 (端口 3000)
npm run dev

# 启动后端 (端口 5001)
npm run api:dev
```

### 环境变量

在 `api/.env` 文件中配置：
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database
USE_MOCK=false
PORT=5001
NODE_ENV=development
```

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的依赖
   - 确保所有环境变量已配置

2. **API 路由不工作**
   - 检查 `vercel.json` 配置
   - 验证 `api/index.js` 导出正确

3. **数据库连接失败**
   - 检查 `DATABASE_URL` 格式
   - 确保数据库可访问

4. **前端路由问题**
   - 检查 `vite.config.js` 代理配置
   - 验证 `vercel.json` 重写规则
