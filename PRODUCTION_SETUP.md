# 🚀 生产环境配置指南

## 📋 必需的环境变量

### 1. 数据库配置
```bash
# PostgreSQL 数据库连接
DATABASE_URL=postgresql://username:password@host:port/database_name

# 或者分别配置
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
```

### 2. OpenAI API 配置
```bash
# OpenAI API 密钥
OPENAI_API_KEY=sk-your-openai-api-key-here

# OpenAI 配置（可选）
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

### 3. 应用配置
```bash
# 应用模式
USE_MOCK=false
NODE_ENV=production

# 服务器配置
PORT=5001
```

## 🗄️ 数据库设置

### 选项 1: Vercel Postgres (推荐)
1. 在 Vercel 项目设置中启用 Postgres
2. 自动获得 `DATABASE_URL` 环境变量
3. 数据库会自动创建和配置

### 选项 2: 外部 PostgreSQL
1. 使用 Supabase、Railway、或 AWS RDS
2. 获取连接字符串
3. 在 Vercel 环境变量中设置 `DATABASE_URL`

### 选项 3: 其他数据库服务
- **Supabase**: 免费 PostgreSQL 服务
- **Railway**: 简单部署
- **Neon**: Serverless PostgreSQL
- **AWS RDS**: 企业级选择

## 🔑 OpenAI API 设置

### 1. 获取 API 密钥
1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的 API 密钥

### 2. 设置环境变量
在 Vercel 项目设置中添加：
```
OPENAI_API_KEY=sk-your-key-here
```

## 🚀 Vercel 部署配置

### 环境变量设置
在 Vercel 项目设置中添加以下环境变量：

```bash
# 数据库
DATABASE_URL=your-postgres-connection-string

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# 应用配置
USE_MOCK=false
NODE_ENV=production
```

### 部署步骤
1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量
4. 点击部署

## 🔧 数据库初始化

### 自动初始化
应用启动时会自动：
- 连接数据库
- 创建表结构
- 设置关联关系

### 手动初始化（如果需要）
```bash
# 本地运行
cd ExpressDemo
npm run reset-db
```

## 📊 监控和日志

### Vercel 监控
- 在 Vercel 仪表板查看函数执行情况
- 监控 API 调用次数和响应时间
- 查看错误日志

### 数据库监控
- 监控数据库连接数
- 查看查询性能
- 设置告警

## 💰 成本估算

### Vercel 免费计划
- **函数执行**: 100GB-hours/月
- **带宽**: 100GB/月
- **构建时间**: 6000分钟/月

### OpenAI API 成本
- **GPT-3.5-turbo**: $0.002/1K tokens
- **估算**: 每月约 $5-20 (取决于使用量)

### 数据库成本
- **Vercel Postgres**: 免费计划可用
- **Supabase**: 免费计划可用
- **Railway**: 免费计划可用

## 🛠️ 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 `DATABASE_URL` 格式
   - 确认数据库服务正常运行
   - 检查防火墙设置

2. **OpenAI API 错误**
   - 验证 API 密钥正确性
   - 检查账户余额
   - 确认 API 限制

3. **部署失败**
   - 检查环境变量设置
   - 查看构建日志
   - 确认依赖安装

### 调试技巧
```bash
# 查看 Vercel 函数日志
vercel logs

# 本地测试
npm run dev
```

## 📞 支持

如遇问题：
1. 查看 Vercel 部署日志
2. 检查环境变量设置
3. 联系技术支持
