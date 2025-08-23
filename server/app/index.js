// 尝试加载环境变量，如果失败则继续
try {
  require("dotenv").config();
} catch (error) {
  console.log("🔧 无法加载 .env 文件，使用环境变量");
}

const express = require("express");
const { initializeDatabase } = require("./config/database");

// 配置
const PORT = process.env.PORT || 5001;
const isMock = process.env.USE_MOCK === "true";

// 创建Express应用
const app = express();

// 中间件
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

// 路由
app.use("/auth", require("./routes/auth"));
app.use("/preference", require("./routes/preference"));
app.use("/rating", require("./routes/rating"));
app.use("/community", require("./routes/community"));
app.use("/chat", require("./routes/chat"));
app.use("/image", require("./routes/image"));
app.use("/interactive", require("./routes/interactive"));

// 健康检查路由
app.get("/test", (req, res) => {
  res.json({ 
    message: "API is working!", 
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    mock: isMock
  });
});

// 根路由
app.get("/", (req, res) => {
  res.json({ 
    message: "Cooker API Server", 
    status: "running",
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// 初始化应用
const initializeApp = async () => {
  console.log("🚀 启动 Cooker API 服务器...");
  console.log(`📋 配置信息:`);
  console.log(`   - 端口: ${PORT}`);
  console.log(`   - 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   - Mock模式: ${isMock}`);

  // 数据库初始化
  if (isMock) {
    console.log("🔧 Mock 模式：跳过数据库初始化");
  } else {
    try {
      await initializeDatabase();
      console.log("✅ PostgreSQL 数据库已初始化");
    } catch (err) {
      console.error("❌ 数据库初始化失败:", err);
      console.log("🔧 切换到 Mock 模式");
      process.env.USE_MOCK = "true";
    }
  }
  
  // 启动服务器
  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ 服务器启动成功!`);
      console.log(`🌐 绑定地址: 0.0.0.0:${PORT}`);
      console.log(`🔧 当前模式: ${isMock ? "Mock 模式" : "数据库模式"}`);
      console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔍 健康检查: http://0.0.0.0:${PORT}/test`);
      resolve(server);
    });

    server.on('error', (error) => {
      console.error("❌ 服务器启动失败:", error);
      reject(error);
    });
  });
};

// 启动应用
if (require.main === module) {
  // 直接运行此文件时启动服务器
  initializeApp().catch(err => {
    console.error("❌ 应用启动失败:", err);
    process.exit(1);
  });
}

// 导出app供其他模块使用
module.exports = app;
