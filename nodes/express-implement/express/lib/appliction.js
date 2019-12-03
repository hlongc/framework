const http = require('http')
const Router = require('./router')

function Application() {
  this._router = new Router
}

Application.prototype.get = function(path, ...handlers) { // 可能是传入多个处理函数
  this._router.get(path, handlers)
}

Application.prototype.listen = function() {
  const server = http.createServer((req, res) => {
    // 如果路由内部没有匹配到对应的路径或方法，那么调用done返回
    function done() {
      res.setHeader('Content-Type', 'text/html ;charset=utf-8')
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req, res, done)
  })
  server.listen(...arguments)
}

module.exports = Application