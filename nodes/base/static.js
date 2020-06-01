const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('mime')

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  const absPath = path.join(__dirname, pathname)
  fs.stat(absPath, (err, stat) => {
    if (err) {
      res.statusCode = 404
      res.end('Not Found!')
      return
    } else {
      if (stat.isFile()) {
        fs.readFile(absPath, (err, data) => {
          res.setHeader('Content-Type', `${mime.getType(absPath)};charset=utf-8`)
          res.end(data)
        })
      } else {
        fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
          if (err) {
            res.statusCode = 404
            res.end('Not Found!')
            return
          }
          res.setHeader('Content-Type', 'text/html;charset=utf-8')
          res.end(data)
        })
      }
    }
  })
})

server.listen(3000, () => {
  console.log('server run on port 3000')
})