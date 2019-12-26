const http = require('http')
const Router = require('./router')
const methods = require('methods')
const url = require('url')
const path = require('path')
const mime = require('mime')
const fs = require('fs')

function Application() {
  this.config = {}
}

Application.prototype.set = function(key, value) {
  if (arguments.length === 1) { // 利用参数个数来实现函数重载
    return this.config[key]
  } else {
    this.config[key] = value
  }
}

// 路由系统懒加载，当有请求来临时才加载路由系统，因为有可能不会接收到请求
Application.prototype.lazyRouter = function() {
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

Application.prototype.use = function(path, handler) {
  this.lazyRouter()
  this._router.use(path, handler) // 交给路由系统来处理
}

Application.prototype.param = function(key, handler) {
  this.lazyRouter()
  this._router.param(key, handler) // 交给路由系统来处理
}

methods.forEach(method => {
  Application.prototype[method] = function(path, ...handlers) { // 可能是传入多个处理函数
    if (method === 'get' && arguments.length === 1) { // 如果当前为get并且参数为一个，那么就是获取之前设置的值 比如 app.get('views')
      return this.set(path)
    }
    this.lazyRouter()
    this._router[method](path, handlers)
  }
})

Application.prototype.listen = function() {
  const server = http.createServer((request, response) => {
    // 如果路由内部没有匹配到对应的路径或方法，那么调用done返回
    function done() {
      request.setHeader('Content-Type', 'text/html ;charset=utf-8')
      request.end(`Cannot ${request.method} ${request.url}`)
    }
    this.lazyRouter()
    this._router.handle(request, response, done)
  })
  server.listen(...arguments)
}

module.exports = Application