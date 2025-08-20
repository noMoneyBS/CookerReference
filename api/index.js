// Vercel Serverless API函数 - 使用ExpressDemo的所有功能
const express = require('express');

// 创建Express应用
const app = express();

// 基础中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 测试路由
app.get('/api/test', (req, res) => {
  res.json({
    message: "Vercel API is working!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mock: process.env.USE_MOCK === "true"
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: process.env.USE_MOCK === "true" ? 'mock' : 'connected'
  });
});

// 调试路由 - 检查环境变量
app.get('/api/debug', (req, res) => {
  res.json({
    USE_MOCK: process.env.USE_MOCK,
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 使用ExpressDemo的所有路由
console.log("🔧 开始加载ExpressDemo路由...");

try {
  console.log("📦 加载用户认证路由...");
  const authRouter = require("../ExpressDemo/routes/auth");
  app.use("/api/auth", authRouter);
  console.log("✅ 用户认证路由加载成功");
  
  console.log("📦 加载用户偏好路由...");
  const preferenceRouter = require("../ExpressDemo/routes/preference");
  app.use("/api/preference", preferenceRouter);
  console.log("✅ 用户偏好路由加载成功");
  
  console.log("📦 加载食谱评分路由...");
  const ratingRouter = require("../ExpressDemo/routes/rating");
  app.use("/api/rating", ratingRouter);
  console.log("✅ 食谱评分路由加载成功");
  
  console.log("📦 加载社区食谱路由...");
  const communityRouter = require("../ExpressDemo/routes/community");
  app.use("/api/community", communityRouter);
  console.log("✅ 社区食谱路由加载成功");
  
  console.log("📦 加载聊天路由...");
  const chatRouter = require("../ExpressDemo/routes/chat");
  app.use("/api/chat", chatRouter);
  console.log("✅ 聊天路由加载成功");
  
  console.log("📦 加载图片处理路由...");
  const imageRouter = require("../ExpressDemo/routes/image");
  app.use("/api/image", imageRouter);
  console.log("✅ 图片处理路由加载成功");
  
  console.log("📦 加载交互式聊天路由...");
  const interactiveRouter = require("../ExpressDemo/routes/interactive");
  app.use("/api/interactive", interactiveRouter);
  console.log("✅ 交互式聊天路由加载成功");
  
  console.log("🎉 所有ExpressDemo路由加载成功！");
  
} catch (error) {
  console.error("❌ 路由加载失败:", error);
  console.error("错误详情:", error.stack);
  
  // 如果路由加载失败，提供基本的Mock功能
  app.get('/api/fallback', (req, res) => {
    res.json({
      message: "API is running in fallback mode",
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  });
  
  // 提供基本的Mock注册功能
  app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    res.json({
      success: true,
      message: 'Registration successful (fallback mode)',
      user: {
        id: Date.now(),
        email: email,
        username: username || 'User'
      }
    });
  });
  
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    res.json({
      success: true,
      message: 'Login successful (fallback mode)',
      user: {
        id: 1,
        email: email,
        username: 'User'
      }
    });
  });
}

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Vercel Serverless函数导出
module.exports = app;
