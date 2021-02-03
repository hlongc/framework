const fs = require('fs').promises
const { resolveVue } = require('./utils')
const moduleReg = /^\/@modules\//

// 解析 /@modules 开头的文件
function PluginServeResolve({ app, root }) {
  app.use(async (ctx, next) => {
    if (!moduleReg.test(ctx.path)) {
      return next()
    }
    const modules = resolveVue(root)
    // 去掉 /@modules  /@modules/vue => vue
    const moduleName = ctx.path.replace(moduleReg, '')
    // 读出对应模块的内容，比如需要reactivity这个模块，那么直接读出来返回
    const content = await fs.readFile(modules[moduleName], 'utf-8')
    ctx.type = 'js'
    ctx.body = content
  })
}

module.exports = PluginServeResolve