const http = require('http')
const Router = require('./router')
const methods = require('methods')

function Application() {}

// 路由懒加载，使用时再初始化
Application.prototype.lazy_router = function() {
  if (!this._router) {
    this._router = new Router
  }
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