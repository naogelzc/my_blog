const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: "http://naogeback.rinue.top/",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
    })
  );
};
