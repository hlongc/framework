const http = require('http')
const Router = require('./router')
const methods = require('methods')
const url = require('url')
const fs = require('fs')
const mime = require('mime')

function Application() {}

// 路由懒加载，使用时再初始化
Application.prototype.lazy_router = function() {
  if (!this._router) {
    this._router = new Router
  }
  // 在真正处理请求之前，先在req res上挂载一些属性和方法
  this._router.use((req, res, next) => {
    // 在req上面增加 query查询参数 path请求路径
    const { query, path: p } = url.parse(req.url, true)
    req.query = query
    req.path = p

    // res 上面增加send方法和sendFile
    res.send = function(value) {
      if (Buffer.isBuffer(value) || typeof value === 'string') {
        res.end(value)
      } else if (typeof value === 'object') {
        res.end(JSON.stringify(value))
      }
    }

    res.sendFile = function(filename, { root } = {}) {
      const absPath = root ? path.resolve(root, filename) : filename
      res.setHeader('Content-Type', mime.lookup(absPath) + ';charset=utf8')
      fs.createReadStream(absPath).pipe(res)
    }

    next()
  })
}
// 设置各种请求方法
methods.forEach(method => {
  Application.prototype[method] = function(path, ...handlers) {
    this.lazy_router()
    this._router[method](path, handlers)
  }
})

Application.prototype.use = function() {
  this.lazy_router()
  this._router.use(...arguments)
}

Application.prototype.param = function(key, callback) {
  this.lazy_router()
  this._router.param(key, callback)
}

Application.prototype.listen = function(...args) {
  this.lazy_router()
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method.toUpperCase()} ${req.url}`)
    }
    // 交给路由处理请求
    this._router.handle(req, res, done)
  })
  server.listen(...args)
}

exports = module.exports = Application