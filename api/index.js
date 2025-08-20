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

// 初始化数据库（如果使用数据库模式）
if (process.env.USE_MOCK !== "true") {
  try {
    const { initializeDatabase } = require("../ExpressDemo/config/database");
    initializeDatabase()
      .then(() => console.log("✅ 数据库连接成功"))
      .catch((err) => console.error("❌ 数据库连接失败:", err));
  } catch (error) {
    console.error("❌ 数据库初始化失败:", error);
  }
}

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

// 使用ExpressDemo的所有路由
try {
  // 用户认证路由
  app.use("/api/auth", require("../ExpressDemo/routes/auth"));
  
  // 用户偏好路由
  app.use("/api/preference", require("../ExpressDemo/routes/preference"));
  
  // 食谱评分路由
  app.use("/api/rating", require("../ExpressDemo/routes/rating"));
  
  // 社区食谱路由
  app.use("/api/community", require("../ExpressDemo/routes/community"));
  
  // 聊天路由
  app.use("/api/chat", require("../ExpressDemo/routes/chat"));
  
  // 图片处理路由
  app.use("/api/image", require("../ExpressDemo/routes/image"));
  
  // 交互式聊天路由
  app.use("/api/interactive", require("../ExpressDemo/routes/interactive"));
  
  console.log("✅ 所有ExpressDemo路由加载成功");
  
} catch (error) {
  console.error("❌ 路由加载失败:", error);
  
  // 如果路由加载失败，提供基本的Mock功能
  app.get('/api/fallback', (req, res) => {
    res.json({
      message: "API is running in fallback mode",
      error: error.message,
      timestamp: new Date().toISOString()
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
