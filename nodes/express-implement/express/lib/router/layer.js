function Layer(path, handler) {
  this.path = path
  this.handler = handler // 这里保存的是route.dispatch 真正处理的请求的方法
}

Layer.prototype.match = function(pathname) {
  return this.path === pathname
}

Layer.prototype.handle_request = function(req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer