const path = require('path')
const fs = require('fs').promises
module.exports = dirname => {
  return async(cxt, next) => {
    const pathname = cxt.path
    const absPath = path.join(dirname, pathname)
    try {
      const statObj = await fs.stat(absPath)
      if (statObj.isFile()) { // 如果是文件直接返回文件
        cxt.body = await fs.readFile(absPath, 'utf8')
      } else { // 如果是目录，那再尝试读取该目录下的index.html
        const htmlPath = path.join(absPath, 'index.html')
        const htmlStat = await fs.stat(htmlPath)
        if (htmlStat.isFile()) {
          cxt.body = await fs.readFile(htmlPath, 'utf8')
        } else {
          await next()
        }
      }
    } catch (e) {
      await next()
    }
  }
}