const pathToRegexp = require('path-to-regexp')

function Layer(path, handler) {
  this.path = path
  this.handler = handler
  this.reg = pathToRegexp(path, this.keys = [], true) // 记录当前路径的正则
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
    // 需要匹配的路径如果是以当前路径开头，那就匹配成功
    if (pathname.startsWith(this.path + '/')) {
      return true
    }
  } else { // 如果是路由，则处理params参数
    const match = pathname.match(this.reg)
    if (match) { // 路径匹配成功就处理参数
      const values = match.slice(1)
      this.params = values.reduce((memo, current, index) => {
        memo[this.keys[index].name] = current
        return memo
      }, {})
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