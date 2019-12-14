const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = {
  mode: 'development',
  devtool: 'source-map', // 打包的时候，也保留源码，便于调试代码
  entry: resolve('./src/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve('dist')
  },
  // 模块寻找目录
  resolve: {},
  // loader寻找目录
  resolveLoader: {
    modules: [resolve('./loaders'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'banner-loader',
            options: {
              filename: resolve('./loaders/content.txt'),
              // text: '// author: hulongchao'
            }
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'loader1'
          },
          {
            loader: 'loader2',
            options: {
              msg: '//我是loader2'
            }
          },
          {
            loader: 'loader3'
          }
        ],
        include: resolve('./src'),
        exclude: /node_modules/
      },
      {
        test: /\.(jp(e)g|png)$/,
        use: [
          // {
          //   loader: 'file-loader2'
          // },
          {
            loader: 'url-loader2',
            options: {
              limit: 20 * 1024
            }
          },
          {
            loader: 'image-loader'
          }
        ]
      }
    ]
  }
}