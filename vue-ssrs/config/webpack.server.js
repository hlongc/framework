const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base')

module.exports = merge(base, {
  target: 'node', // 打包给node用，不需要打包第三方模块，因为nodejs可以直接调用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2' // 打包出来的结果是module.exports，供服务端用
  },
  plugins: [
    // 把public/index.ssr.html拷贝到dist目录下，
    new HtmlWebpackPlugin({ 
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      // 因为服务端渲染最后调用的js还是前端打包出来的，所以不要把打包出来的server.js插入到html文件中,排除掉
      excludeChunks: ['server']
    })
  ]
})