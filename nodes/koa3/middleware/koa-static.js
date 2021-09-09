const fs = require('fs').promises
const path = require('path')
const mime = require('mime')


function static(root) {
  return async (cxt, next) => {
    try {
      let filePath = path.join(root, cxt.path)
      const statObj = await fs.stat(filePath)
      if (statObj.isDirectory()) {
        filePath = path.join(filePath, 'index.html')
      }
      cxt.set('Content-Type', mime.getType(filePath) + ';charset=utf-8')
      cxt.body = await fs.readFile(filePath)
    } catch (e) {
      await next()
    }
  }
}

module.exports = static