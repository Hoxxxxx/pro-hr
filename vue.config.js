module.exports = {
    devServer: {
      open: true,
      proxy: {
        '/baseApi': {
          target: 'http://luxy.hr.com',
          logLevel: 'debug',
          changeOrigin: true,
          // ws: true,
          pathRewrite: {
            '^/baseApi': ''
          }
        }
      }
    }
  }