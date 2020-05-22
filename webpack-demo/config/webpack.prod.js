const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css

const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
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
  ]
}