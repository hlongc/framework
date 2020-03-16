const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServerSSRPlugin = require('vue-server-renderer/server-plugin')
const externals = require('webpack-node-externals')
const base = require('./webpack.base')

module.exports = merge(base, {
  target: 'node', // 打包给node用，不需要打包第三方模块，因为nodejs可以直接调用
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2' // 打包出来的结果是module.exports，供服务端用
  },
  externals: [externals()], // 按照node来打包，不需要把外部依赖打包进去，因为node可以直接require进来第三方包
  plugins: [
    new ServerSSRPlugin(), // 服务器打包启用这个产生json文件,在重新打包以后，服务不用重启
    // 把public/index.ssr.html拷贝到dist目录下，
    new HtmlWebpackPlugin({ 
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      // 因为服务端渲染最后调用的js还是前端打包出来的，所以不要把打包出来的server.js插入到html文件中,排除掉
      excludeChunks: ['server']
    })
  ]
})