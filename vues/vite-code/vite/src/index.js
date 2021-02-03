const Koa = require('koa')
const PluginServeStatic = require('./PluginServeStatic')
const PluginServeRewrite = require('./PluginServeRewrite')
const PluginServeResolve = require('./PluginServeResolve')
const PluginServeHtml = require('./PluginServeHtml')
const PluginServeVue = require('./PluginServeVue')

// 洋葱模型，从下往上执行
const plugins = [
  PluginServeHtml, // 注入process env
  PluginServeRewrite, // 重写路径
  PluginServeResolve, // 解析 /@module
  PluginServeVue, // 解析vue文件
  PluginServeStatic // 静态服务器
]

function createApp() {
  const app = new Koa()

  const context = {
    app,
    root: process.cwd() // 当前的工作目录
  }

  plugins.forEach(plugin => plugin(context))

  return app
}

createApp().listen(3344, () => {
  console.log('koa server run on port 3344')
})