const HtmlWebpackPlugin = require('html-webpack-plugin')
const Merge = require('webpack-merge')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const path = require('path')

const resolve = (realtivePath) => path.resolve(__dirname, realtivePath)

module.exports = env => {
  const isDev = env.development

  const base = {
    entry: {
      main: resolve('../src/index.js'),
      b: resolve('../src/other.js')
    },
    output: {
      path: resolve('../dist'),
      filename: '[name].bundle.js'
    },
    resolveLoader: {
      modules: [resolve('../loaders'), 'node_modules']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('../public/index.html'),
        pathname: 'index.html',
        hash: true,
        minify: isDev ? false : {
          removeComments: true, // 移除注释
          removeAttributeQuotes: true // 移除html元素属性的双引号
        },
        chunksSortMode: 'manual', // 对引入的chunk进行手动排序
        chunks: ['b', 'main'] // 先引入b.bundle.js 再引入 main.bundle.js
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['test-loader', 'demo-loader'],
          include: [resolve('../src')],
          exclude: /node_modules/
        }
      ]
    }
  }
  return isDev ? Merge(base, dev) : Merge(base, prod)
}
