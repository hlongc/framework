const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js,替代uglifyjs-webpack-plugin,因为uglify不支持es6语法
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 删除之前打包的目录
// 打包分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const HappyPack = require('happypack') // 多进程打包
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    // 优先使用es语法
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=happyBabel',
        include: [resolve('../src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // css单独打包到指定文件夹
            }
          },
          'css-loader',
          'postcss-loader'
        ],
        include: resolve('../src'),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              // 解决按需加载antd less样式报错的问题
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)/,
          use: [
            {
              loader:'url-loader',
              options:{
                limit: 1024 * 10,
                // outputPath 输出路径
                // publicPath指定的是构建后在html里的路径
                // 如果在CSS文件中引入图片，而图片放在了image目录下，就需要配置图片的publicPath为/images
                name: 'images/[name].[contenthash].[ext]',
                publicPath: '/dist'
              }
            }
          ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new ModuleConcatenationPlugin(), // 开启Scope Hosting
    // 小项目就不用开启happypack了，因为开启多进程打包也是需要耗费一定时间的
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new TerserWebpackPlugin({
      cache: true, // 开启缓存
      parallel: true // 开启多核并行压缩
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 抽离到指定的文件夹
      chunkFilename: 'css/[id].css'
    }), // 因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载
    // 引入cdn地址，减少打包体积
    new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM'
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // 对同步和异步代码都生效
      cacheGroups: {
        vendors: { // 第三方模块比如lodash axios之类的
          name: 'vendors',
          test: /node_modules/,
          priority: 1, // 权限更高，优先抽离
          minSize: 0,
          minChunks: 1 // 最少复用几次才抽离出来,第三方模块只要被引用一次就被抽离出来
        },
        common: { // 自己写的工具方法之类的  似乎这个只有在多入口中引用公共模块才会生效
          name: 'common',
          priority: 0,
          reuseExistingChunk: true, //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          minSize: 0,
          minChunks: 2 // 自己写的公共方法至少被引用两次才需要抽离出来
        }
      }
    }
  }
}