const { resolve } = require('./utils')
const CommentPlugin = require('../plugins/Comment')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: resolve('../dist'), // 静态服务器根路径
    host: 'localhost',
    port: 8888,
    compress: true,
    hot: true, // 热更新，无需刷新浏览器
    open: false, // 自动打开浏览器
    // 静态服务器代理,解决开发环境跨域问题
    proxy: {
      // 捕获/api 开头的请求
      '/api': {
        target: 'http://localhost:3333',
        pathRewrite: {
          '^/api': '/' // /api 转发到 /
        }
      }
    },
    // before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
    before(app) {
      app.get('/mock/info', (req, res) => {
        res.send({ success: true, data: 'mock info' })
      })
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader'
      //   ],
      //   include: resolve('../src'),
      //   exclude: /node_modules/
      // },
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        include: resolve('../src'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)/,
          use: [
            {
              loader:'url-loader',
              options:{
                limit: 1024 * 10
              }
            }
          ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
    // new CommentPlugin()
  ]
}