// 尝试加载环境变量，如果失败则继续
try {
  require("dotenv").config();
} catch (error) {
  console.log("🔧 无法加载 .env 文件，使用环境变量");
}

const express = require("express");
const { initializeDatabase } = require("./config/database");

const app = express();
app.use(express.json());

// 添加CORS支持
app.use((req, res, next) => {
  // 允许所有来源，适配Vercel部署
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

// 初始化数据库
if (process.env.USE_MOCK === "true") {
  console.log("🔧 Mock 模式：跳过数据库初始化");
} else {
  initializeDatabase()
    .then(() => console.log("✅ PostgreSQL 数据库已初始化"))
    .catch((err) => {
      console.error("❌ 数据库初始化失败:", err);
      console.log("🔧 切换到 Mock 模式");
      process.env.USE_MOCK = "true";
    });
}

// 路由 - 在 Vercel 环境中，路径已经去掉了 /api 前缀
app.use("/auth", require("./routes/auth"));
app.use("/preference", require("./routes/preference"));
app.use("/rating", require("./routes/rating"));
app.use("/community", require("./routes/community"));
app.use("/chat", require("./routes/chat"));
app.use("/image", require("./routes/image"));
app.use("/interactive", require("./routes/interactive"));

// 添加一个测试路由来验证 API 是否工作
app.get("/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5001;

// 导出app供Vercel使用
module.exports = app;

// 只在开发环境下启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔧 当前模式: ${isMock ? "Mock 模式 (不使用数据库)" : "数据库模式 (PostgreSQL)"}`);
  });
}
