const path = require('path')
const merge = require('webpack-merge') // 对象合并
const prod = require('./webpack.prod')
const dev = require('./webpack.dev')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成html并引入打包以后的js


module.exports = (env) => {
  const isDevelopment = env.development

  const baseConfig = {
    entry: {
      main: path.resolve(__dirname, '../src/main.js'),
      b: path.resolve(__dirname, '../src/b.js'),
    }, // 可以使用绝对路径，默认 src/index.js
    output: {
      filename: '[name].js', // 默认main.js，这里的name指变量,entry中的key
      path: path.resolve(__dirname, '../dist') // 必须是绝对路径
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // html文件模板
        filename: 'index.html', // 输出文件名称
        hash: true, // 加hash值，防止缓存
        minify: !isDevelopment ? { // 压缩
          removeAttributeQuotes: true, // 移除双引号
          removeComments: true // 移除注释
        } : false,
        chunksSortMode: 'manual', // 手动排序引入顺序
        chunks: ['b', 'main'] // 指定html中引入js的顺序
      })
    ],
    module: {
      rules: [ // loader执行顺序从右往左，从下到上
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
  return isDevelopment ? merge(baseConfig, dev) : merge(baseConfig, prod)
}