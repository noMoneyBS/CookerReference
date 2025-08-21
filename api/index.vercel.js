// API 入口点 - 调用 server 目录中的应用
const path = require('path');

// 设置环境变量路径
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

try {
  const app = require(path.join(__dirname, '../server/app/index'));
  
  // 导出 Vercel 函数处理器
  module.exports = (req, res) => {
    try {
      return app(req, res);
    } catch (error) {
      console.error('API 处理错误:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  };
} catch (error) {
  console.error('应用加载错误:', error);
  module.exports = (req, res) => {
    res.status(500).json({ error: 'Application failed to load', details: error.message });
  };
}
