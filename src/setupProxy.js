const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://authtask-a8kv.onrender.com',
      changeOrigin: true,
    })
  );
};
