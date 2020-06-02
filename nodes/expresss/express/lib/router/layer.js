function Layer(path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match = function(pathname) {
  if (this.path === pathname) {
    return true
  }
  if (!this.route) { // 中间件进行匹配
    if (this.path === '/') { // '/'匹配任何路径
      return true
    }
    // pathname = '/a'   this.path = '/a/b'
    if (this.path.startsWith(pathname + '/')) {
      return true
    }
  }
  return false
}

Layer.prototype.handle_error = function(err, req, res, next) {
  if (this.handler.length === 4) { // 如果当前中间件参数为4个，那么就处理错误
    this.handler(err, req, res, next)
  } else { // 否则将错误传递下去直到找到错误处理中间件
    next(err)
  }
}

Layer.prototype.handle_request = function(req, res, next) {
  return this.handler(req, res, next)
}

module.exports = Layer