# 🚀 Vercel 部署指南

## 部署步骤

### 1. 准备工作
- 确保你的代码已推送到GitHub仓库
- 注册 [Vercel](https://vercel.com) 账号（免费）

### 2. 连接GitHub
1. 登录Vercel
2. 点击 "New Project"
3. 选择你的GitHub仓库
4. 点击 "Import"

### 3. 配置项目
Vercel会自动检测项目配置，但你需要设置以下环境变量：

#### 环境变量设置
在Vercel项目设置中添加：
```
USE_MOCK=true
NODE_ENV=production
```

### 4. 部署
1. 点击 "Deploy"
2. 等待部署完成（通常2-3分钟）
3. 获得你的应用URL（如：`https://your-app.vercel.app`）

## 项目结构说明

```
├── ReactDemo/          # 前端React应用
├── ExpressDemo/        # 后端Express服务器
├── api/               # Vercel API入口
├── vercel.json        # Vercel配置文件
└── DEPLOYMENT.md      # 部署说明
```

## 功能特性

✅ **完全免费** - Vercel个人计划免费额度充足
✅ **自动部署** - 每次Git推送自动部署
✅ **全栈支持** - 前端+后端一体化部署
✅ **Mock模式** - 无需数据库即可运行
✅ **多语言支持** - 8种语言界面
✅ **用户认证** - 注册/登录功能
✅ **食谱推荐** - AI驱动的个性化推荐

## 注意事项

1. **Mock模式**：当前配置使用Mock数据，无需数据库
2. **API限制**：免费版有API调用次数限制
3. **冷启动**：Serverless函数可能有冷启动延迟
4. **环境变量**：敏感信息请使用Vercel环境变量

## 故障排除

### 常见问题
1. **构建失败**：检查package.json中的依赖
2. **API错误**：确认环境变量设置正确
3. **CORS错误**：已配置允许所有来源

### 联系支持
如遇问题，可以：
- 查看Vercel部署日志
- 检查GitHub Actions（如果使用）
- 联系Vercel支持团队
