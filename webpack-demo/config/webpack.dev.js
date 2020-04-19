const path = require('path')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), // 相当于景台服务器根文件夹
    port: '12306',
    open: true,
    compress: true
  }
}