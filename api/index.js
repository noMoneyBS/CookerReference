// Vercel API入口文件
const express = require('express');

const app = express();
app.use(express.json());

// 添加CORS支持
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

// 判断当前模式
const isMock = process.env.USE_MOCK === "true";
console.log("🔧 当前模式:", isMock ? "Mock" : "Database");

// 测试路由
app.get('/test', (req, res) => {
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    mock: isMock
  });
});

// 路由 - 使用 try-catch 包装
try {
  app.use("/auth", require("../ExpressDemo/routes/auth"));
  app.use("/preference", require("../ExpressDemo/routes/preference"));
  app.use("/rating", require("../ExpressDemo/routes/rating"));
  app.use("/community", require("../ExpressDemo/routes/community"));
  app.use("/chat", require("../ExpressDemo/routes/chat"));
  app.use("/image", require("../ExpressDemo/routes/image"));
  app.use("/interactive", require("../ExpressDemo/routes/interactive"));
  console.log("✅ 所有路由加载成功");
} catch (error) {
  console.error("❌ 路由加载失败:", error);
}

// 添加错误处理中间件
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 导出为Vercel Serverless函数
module.exports = app;
