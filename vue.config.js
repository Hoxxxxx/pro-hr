module.exports = {
    devServer: {
      port: '80',
      open: true,
      proxy: {
        '/api': {
          target: '',
          logLevel: 'debug',
          changeOrigin: true,
          // ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }