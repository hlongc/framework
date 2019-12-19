const postcss = require('postcss')
const tokenizer = require('css-selector-tokenizer')
const utils = require('loader-utils')

const cssPlugin = postcssOptions => {
  return root => { // ast语法树根节点
    root.walkAtRules(/^import$/, rule => { // 遍历@开头的语法规则 @import类型
      rule.remove() // "'./global.css'"
      postcssOptions.importUrls.push(rule.params.slice(1, -1)) // slice截取，去除开始和结尾的两个双引号
    })
    // prefix功能 border-radius => -webkit-border-radius
    root.walkDecls('border-radius', decl => {
      const clone = decl.clone({ prop: '-webkit-' + decl.prop })
      decl.after(clone)
    })
    root.walkDecls(decl => {
      const values = tokenizer.parseValues(decl.value)
      values.nodes.forEach(nodeValue => {
        nodeValue.nodes.forEach(item => {
          if (item.type === 'url') {
            // 把./shotscreen.png 变成一个模块来引入 require('./src/shotscreen.png')
            // 图片现在导出是个模块，需要default来引入
            item.url = "`+require(" + utils.stringifyRequest(this, item.url) + ").default+`"
          }
        })
      })
      decl.value = tokenizer.stringifyValues(values) // 转化会语法树中
    })
  }
}
 
function loader(source) {
  const callback = this.async()
  const postcssOptions = { importUrls: [] }
  const pipeLine = postcss([cssPlugin(postcssOptions)])
  // postcss把css转换为抽象语法树，然后交给插件处理，最后把新的css语法树生成新的css代码
  pipeLine.process(source).then(out => {
    const css = out.css
    // 只需要走css-loader解析当前引入的css，所以使用!!走inline-loader，然后插入到最前面
    const importCss = postcssOptions.importUrls.map(url => "`+require(" + utils.stringifyRequest(this, "!!css-loader!" + url) + ")+`").join('\r\n')
    callback(null, "module.exports = `" + importCss + "\r\n" + css + "`")
  })
}

module.exports = loader