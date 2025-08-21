// Import your server main file
const app = require('./src/index');

// Export a serverless function handler
module.exports = (req, res) => {
  return app(req, res);
};
