# 🍳 CookerReference - 智能食谱推荐系统

一个基于AI的全栈食谱推荐应用，支持多语言界面和个性化推荐。

## 📁 项目结构

```
cooker-reference/
├── 📦 package.json              # 总项目配置
├── 🚀 vercel.json              # Vercel部署配置
├── 📖 README.md                # 项目说明
├── 📋 DEPLOYMENT.md            # 部署指南
├── 🔧 .gitignore               # Git忽略文件
├── 📁 ExpressDemo/             # 后端服务器 (Node.js + Express)
│   ├── 🗄️ models/             # 数据库模型
│   ├── 🛣️ routes/             # API路由
│   ├── 🔧 services/            # 业务逻辑服务
│   ├── 🌍 locales/             # 多语言配置
│   └── 📄 server.js            # 服务器入口
├── 📁 ReactDemo/               # 前端应用 (React + Vite)
│   ├── 🧩 src/components/      # React组件
│   ├── 🌍 src/locales/         # 前端多语言
│   ├── 🔌 src/api/             # API接口
│   └── 📄 package.json         # 前端依赖
└── 📁 api/                     # Vercel API入口
    └── 📄 index.js             # Serverless函数入口
```

## 🚀 快速开始

### 1. 安装依赖
```bash
# 安装总项目依赖
npm install

# 安装所有子项目依赖
npm run install:all
```

### 2. 启动开发环境
```bash
# 同时启动前端和后端
npm run dev

# 或者分别启动
npm run dev:backend  # 后端 (端口 5001)
npm run dev:frontend # 前端 (端口 5173)
```

### 3. 访问应用
- 前端: http://localhost:5173
- 后端API: http://localhost:5001

## 🛠️ 可用命令

```bash
# 开发
npm run dev                    # 同时启动前后端
npm run dev:backend           # 仅启动后端
npm run dev:frontend          # 仅启动前端

# 构建
npm run build                 # 构建前端
npm run build:frontend        # 构建前端

# 部署
npm start                     # 启动生产环境后端

# 数据库
npm run reset-db              # 重置数据库

# 代码质量
npm run lint                  # 代码检查
```

## 🌟 功能特性

### 🌍 多语言支持
- **8种语言**: 中文、英文、日文、韩文、法文、德文、西班牙文、意大利文
- **实时切换**: 无需刷新页面
- **语言记忆**: 自动保存用户偏好

### 🔐 用户系统
- **注册/登录**: 完整的用户认证
- **个人偏好**: 学习用户口味偏好
- **历史记录**: 保存推荐历史

### 🍳 智能推荐
- **AI驱动**: 基于OpenAI的个性化推荐
- **食材识别**: 支持多种食材输入
- **营养分析**: 详细的营养成分信息
- **步骤指导**: 详细的烹饪步骤

### 🏘️ 社区功能
- **食谱分享**: 用户可分享自己的食谱
- **评分系统**: 用户可对食谱进行评分
- **搜索功能**: 按食材、菜系等搜索

## 🔧 技术栈

### 前端
- **React 19** - 用户界面框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Axios** - HTTP客户端

### 后端
- **Node.js** - 运行环境
- **Express** - Web框架
- **Sequelize** - ORM框架
- **PostgreSQL** - 数据库
- **OpenAI API** - AI服务

### 部署
- **Vercel** - 全栈部署平台
- **Serverless** - 无服务器架构

## 📦 环境变量

### 开发环境
```bash
# 后端 (.env)
USE_MOCK=true                    # 启用Mock模式
OPENAI_API_KEY=your_api_key      # OpenAI API密钥
PORT=5001                        # 服务器端口
```

### 生产环境 (Vercel)
```bash
USE_MOCK=true
NODE_ENV=production
```

## 🚀 部署

### Vercel部署 (推荐)
1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 设置环境变量
4. 自动部署完成

详细步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 支持

如有问题或建议，请：
- 创建 Issue
- 发送邮件
- 联系维护者

---

**享受烹饪的乐趣！** 🍽️
