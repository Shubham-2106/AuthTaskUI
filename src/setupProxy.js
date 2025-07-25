const API_URL = process.env.REACT_APP_API_URL || '';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    `${API_URL}`,
    createProxyMiddleware({
      target: 'https://authtask-a8kv.onrender.com',
      changeOrigin: true,
    })
  );
};
