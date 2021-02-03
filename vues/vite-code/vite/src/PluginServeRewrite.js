const { readBody } = require('./utils')
const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')

function rewriteImports(source) {
  // 拿到静态import
  const imports = parse(source)[0]
  // 字符串是不可变的，只有变成对象以后才能操作
  const magicString = new MagicString(source)
  if (imports.length) {
    for (let i = 0; i < imports.length; i++) {
      const { s, e } = imports[i] // 开始和结束位置
      let moduleName = source.substring(s, e)
      // 检测当前是不是以 . / 开头的模块 ,不是的话就重写路径
      // 比如 import vue from 'vue' => import vue from '/@modules/vue'
      if (/^[^\/\.]/.test(moduleName)) {
        moduleName = `/@modules/${moduleName}`
        // 重写回代码中
        magicString.overwrite(s, e, moduleName)
      }
    }
  }
  return magicString.toString()
}

function PluginServeRewrite({ app, root }) {
  app.use(async(ctx, next) => {
    await next()
    // 对js文件进行处理
    if (ctx.body && ctx.response.is('js')) {
      // 读取body内容
      const content = await readBody(ctx.body)
      // import vue from 'vue'出现在文件中，浏览器会再次发出请求去获取vue
      const result = rewriteImports(content)
      ctx.body = result
    }
  })
}

module.exports = PluginServeRewrite