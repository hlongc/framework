const { interpolateName } = require('loader-utils')

function loader(content) {
  const filename = interpolateName(this, '[hash].[ext]', { content })
  this.emitFile(filename, content) // 调用webpack的api来复制文件
  return `
    exports.default = ${JSON.stringify(filename)}
    exports.__esModule = true
    exports[Symbol.toStringTag] = 'Module'
  `
}
loader.raw = true

module.exports = loader