// 简单的测试 API
module.exports = (req, res) => {
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    mock: process.env.USE_MOCK === "true"
  });
};
