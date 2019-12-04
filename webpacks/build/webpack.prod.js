const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包之前删除文件夹,默认清空当前打包目录
module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
}