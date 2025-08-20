// Vercel API入口文件
const express = require('express');
const { initializeDatabase } = require('../ExpressDemo/config/database');

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

// 只在非Mock模式下初始化数据库
if (!isMock) {
  initializeDatabase()
    .then(() => console.log("✅ PostgreSQL 数据库已初始化"))
    .catch((err) => console.error("❌ 数据库初始化失败:", err));
} else {
  console.log("🔧 使用 Mock 模式，跳过数据库初始化");
}

// 路由
app.use("/auth", require("../ExpressDemo/routes/auth"));
app.use("/preference", require("../ExpressDemo/routes/preference"));
app.use("/rating", require("../ExpressDemo/routes/rating"));
app.use("/community", require("../ExpressDemo/routes/community"));
app.use("/chat", require("../ExpressDemo/routes/chat"));
app.use("/image", require("../ExpressDemo/routes/image"));
app.use("/interactive", require("../ExpressDemo/routes/interactive"));

// 导出为Vercel Serverless函数
module.exports = app;
