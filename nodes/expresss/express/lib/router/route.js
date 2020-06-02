const Layer = require('./layer')
const methods = require('methods')

function Route() {
  this.stack = []
  this.methods = {} // 记录当前的这个路由元包含哪些请求方法
}
methods.forEach(method => {
  // 保存传入的处理函数
  Route.prototype[method] = function(handlers) {
    handlers.forEach(handler => {
      const layer = new Layer('/', handler)
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    })
  }
})

// 内层匹配方法
Route.prototype.dispatch = function(req, res, out) {
  const reqMethod = req.method.toLowerCase()
  let index = 0
  const next = (err) => {
    if (index >= this.stack.length) return out()
    const layer = this.stack[index++]
    if (err) return out(err)
    if (layer.method === reqMethod) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}

module.exports = Route