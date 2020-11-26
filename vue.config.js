module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    open: true,
    // port: '80',
    // proxy: {
    //   '/api': {
    //     target: 'http://luxy.erp.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    extract: false
  }
}