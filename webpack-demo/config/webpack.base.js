const HtmlWebpackPlugin = require('html-webpack-plugin')
const Merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除之前打包的目录
const { resolve } = require('./utils')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')

module.exports = env => {
  const isDev = env.development

  const base = {
    entry: {
      main: resolve('../src/index.js'),
      b: resolve('../src/other.js')
    },
    output: {
      path: resolve('../dist'),
      // hash 每次打包的hash值
      // chunkHash 当前chunk改变hash就会变化
      // contentHash 内容变化才会变化
      filename: 'js/[name].[hash].bundle.js',
      publicPath: ''
    },
    // 指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.less', '.css'],
      alias: {
        '@': resolve('../src')
      }
    },
    devtool: isDev ? 'module-source-map' : false, // 开发环境启动source-map，方便源码调试
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
      }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   use: ['test-loader', 'demo-loader'],
        //   include: [resolve('../src')],
        //   exclude: /node_modules/
        // },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          include: [resolve('../src')],
          exclude: /node_modules/
        }
      ]
    }
  }
  return isDev ? Merge(base, dev) : Merge(base, prod)
}
