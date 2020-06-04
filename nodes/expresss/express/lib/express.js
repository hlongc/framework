const path = require('path')
const fs = require('fs')
const Application = require('./application')
const Router = require('./router')

// 创建应用
function createApplication() {
  return new Application()
}
// 路由系统
createApplication.Router = Router

createApplication.static = function(dirname) {
  return (req, res, next) => {
    const absPath = path.join(dirname, req.path)
    fs.stat(absPath, (err, staeObj) => {
      if (err) return next() // 如果不存在该路径，那交给后面的处理
      if (staeObj.isFile()) { // 如果是文件，那么直接返回
        res.sendFile(absPath)
      } else { // 文件夹找下面的index.html
        const html = path.join(absPath, 'index.html')
        fs.stat(html, (e, o) => {
          if (e) return next() // 文件夹下面不存在index.html交给后面处理
          res.sendFile(html)
        })
      }
    })
  }
}

module.exports = createApplication