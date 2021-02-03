const static = require('koa-static')
const path = require('path')

function PluginServerStatic({ app, root }) {
  // 当前目录作为根目录
  app.use(static(root))
  // public作为静态目录
  app.use(static(path.resolve(root, 'public')))
}

module.exports = PluginServerStatic