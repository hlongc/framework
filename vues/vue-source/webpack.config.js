const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'source-map',
  resolve: { // 更改webpack查找依赖包的顺序
    modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}