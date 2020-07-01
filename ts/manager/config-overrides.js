const { 
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackExternals,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { resolve, join } = require('./util')

const isDev = process.env.NODE_ENV === 'development'

const prodPlugins = [
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

const devPlugins = [
  new DllReferencePlugin({
    manifest: require(join(resolve('./dll'), 'react.manifest.json'))
  })
]

module.exports = {
  webpack: override(
    fixBabelImports('antd', {
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1890ff' }
      }
    }),
    // react react-dom使用cdn
    !isDev && addWebpackExternals({
      'react': 'React',
      'react-dom': 'ReactDOM'
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
    }),
    config => {
      isDev && config.plugins.push(new HtmlWebpackPlugin({
        template: `${__dirname}/public/index.html`,
        dll: isDev
      }))
      // 去掉打包生产map 文件
      if (!isDev) {
        config.devtool = false
        config.plugins = [...config.plugins, ...prodPlugins]
      }
      if (isDev) {
        config.plugins = [...config.plugins, ...devPlugins]
      }
      return config
    }
  ),
  devServer: overrideDevServer(config => {
    config.proxy = {
      '/api': {
        target: 'http://localhost:3333',
        pathRewrite: {
          '^/api': '/' // /api 转发到 /
        }
      }
    }
    config.contentBase = resolve('./dll')
    return config
  })
}