const utils = require('loader-utils')
const validateOptions = require('schema-utils')
const fs = require('fs')

function loader(inputSource) {
  const options = utils.getOptions(this) // this: loaderContext
  const cb = this.async()
  this.cacheable && this.cacheable(true)
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options) // 验证传入的参数是否合法，如果不合法那就报错，合法就继续往下面执行
  const { text, filename } = options
  if (text) {
    return text + inputSource
  } else {
    fs.readFile(filename, 'utf8', (err, data) => {
      cb(err, data + inputSource)
    })
  }
}

module.exports = loader