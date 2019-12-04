const path = require('path')
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 8080,
    open: true,
    overlay: true
  }
}