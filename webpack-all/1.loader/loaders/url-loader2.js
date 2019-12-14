const { getOptions } = require('loader-utils')
const mime = require('mime')

function loader(content) {
  let { limit = 8 * 1024 } = getOptions(this)
  limit = Number(limit)
  if (!limit || content.length < limit) { // 如果没传入limit或者当前文件大小小于传入的值，那就变成base64
    const ext = this.resourcePath.split('/').pop().split('.')[1];
    const mimetype = mime.types[ext];
    const base64 = `data:${mimetype};base64,${content.toString('base64')}`
    return `
      exports.default = ${JSON.stringify(base64)}
      exports.__esModule = true
      exports[Symbol.toStringTag] = 'Module'
    `
  } else { // 大于limit就使用file-loader来处理
    const fileLoader = require('./file-loader2')
    return fileLoader.call(this, content)
  }
}

loader.raw = true
module.exports = loader