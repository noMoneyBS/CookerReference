// API 入口点 - 调用 server 目录中的应用
const app = require('../server/app/index');

// 导出 Vercel 函数处理器
module.exports = (req, res) => {
  return app(req, res);
};
