const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const mime = require('mime')

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  let abspath = path.join(__dirname, 'public', pathname)
  // 读取这个路径的状态
  fs.stat(abspath, (err, statObj) => {
    if (err) return res.end('Not Found')
    if (statObj.isDirectory()) { // 是文件夹就读取index.html
      abspath = path.join(abspath, 'index.html')
      fs.stat(abspath, (e) => {
        if (e) return res.end('Not Found')
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        fs.createReadStream(abspath).pipe(res)
      })
    } else { // 是文件把文件读出来
      const type = mime.getType(abspath) // 如果文件不存在，那么直接下载这个文件
      if (!type) {
        res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('下载')}${path.extname(abspath)}`)
      } else {
        res.setHeader('Content-Type', type + ';charset=utf-8')
      }
      fs.createReadStream(abspath).pipe(res) // 默认会调用可写流的write和end方法
    }
  })
}).listen(3333)