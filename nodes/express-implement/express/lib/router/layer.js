function Layer(path, handler) {
  this.path = path
  this.handler = handler // 这里保存的是route.dispatch 真正处理的请求的方法
}

Layer.prototype.match = function(pathname) {
  if (this.path === pathname) return true
  if (!this.route) { // 如果当前是中间件的话，则匹配当前路径是否以this.path开头
    if (this.path === '/') return true // /匹配任何路径
    return (pathname).startsWith(this.path + '/') // 防止 /a/b 被/a/bb匹配成功，所以加个/
  }
  return false // 既不是中间件并且路径匹配失败返回false
}

Layer.prototype.handle_error = function(err, req, res, next) {
  if (this.handler.length === 4) { // 中间件参数为4个才是错误处理中间件
    this.handler(err, req, res, next)
  } else { // 如果不是错误处理中间件则继续寻找
    next(err)
  }
}

Layer.prototype.handle_request = function(req, res, next) {
  this.handler(req, res, next)
}

module.exports = Layer