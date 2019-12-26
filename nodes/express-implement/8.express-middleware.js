const express = require('./express')
// const url = require('url')
// const path = require('path')
// const mime = require('mime')
// const fs = require('fs')

const app = express()

// 会在内部调用这个中间件来实现一些属性或者方法
// app.use((req, res, next) => {
//   const { query, path: p } = url.parse(req.url, true)
//   req.query = query
//   req.path = p

//   res.send = function(value) {
//     if (Buffer.isBuffer(value) || typeof value === 'string') {
//       res.end(value)
//     } else if (typeof value === 'object') {
//       res.end(JSON.stringify(value))
//     }
//   }

//   res.sendFile = function(filename, { root } = {}) {
//     const absPath = root ? path.resolve(root, filename) : filename
//     res.setHeader('Content-Type', mime.lookup(absPath) + ';charset=utf8')
//     fs.createReadStream(absPath).pipe(res)
//   }

//   next()
// })

// express.static = function(dirname) {
//   return (req, res, next) => {
//     const absPath = path.join(dirname, req.path)
//     fs.stat(absPath, (err, staeObj) => {
//       if (err) return next() // 如果不存在该路径，那交给后面的处理
//       if (staeObj.isFile()) { // 如果是文件，那么直接返回
//         res.sendFile(absPath)
//       } else { // 文件夹找下面的index.html
//         const html = path.join(absPath, 'index.html')
//         fs.stat(html, (e, o) => {
//           if (e) return next() // 文件夹下面不存在index.html交给后面处理
//           res.sendFile(html)
//         })
//       }
//     })
//   }
// }

app.use(express.static(__dirname)) // 设置静态文件根目录

app.get('/:id/:name', (req, res) => {
  res.send({ ...req.query, ...req.params })
})

app.get('/file', (req, res) => {
  res.sendFile('8.express-middleware.js', { root: __dirname })
})

app.listen(3000)