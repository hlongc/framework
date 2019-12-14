const path = require('path')
const fs = require('fs')

function loader3(inputSource) {
  const cb = this.async() // 用于支持异步loader this.async === this.callbak 用于异步或者同步返回多个值
  // const content = fs.readFileSync(path.resolve(__dirname, 'content.txt'), 'utf8')
  fs.readFile(path.resolve(__dirname, 'content.txt'), 'utf8', (err, data) => {
    return cb(err, inputSource + data)
  })
}

module.exports = loader3