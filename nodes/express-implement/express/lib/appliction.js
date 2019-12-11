const http = require('http')
const Router = require('./router')
const methods = require('methods')

function Application() {}

// 路由系统懒加载，当有请求来临时才加载路由系统，因为有可能不会接收到请求
Application.prototype.lazyRouter = function() {
  if (!this._router) {
    this._router = new Router
  }
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
    this.lazyRouter()
    this._router[method](path, handlers)
  }
})

Application.prototype.listen = function() {
  const server = http.createServer((req, res) => {
    // 如果路由内部没有匹配到对应的路径或方法，那么调用done返回
    function done() {
      res.setHeader('Content-Type', 'text/html ;charset=utf-8')
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this.lazyRouter()
    this._router.handle(req, res, done)
  })
  server.listen(...arguments)
}

module.exports = Application