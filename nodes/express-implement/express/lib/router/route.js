const Layer = require('./layer')

function Route() {
  this.stack = []
}

Route.prototype.dispatch = function(req, res, out) { // out就是外层的dispatch，用于跳出当前route
  let index = 0
  const reqMethod = req.method.toLowerCase()
  function dispatch() {
    if (index === this.stack.length) return out() // 如果route中都没匹配到，那么回到上一级的router进行下一轮匹配
    const layer = this.stack[index++]
    if (layer.method === reqMethod) {
      layer.handle_request(req, res, dispatch)
    } else {
      dispatch()
    }
  }
  dispatch()
}

Route.prototype.get = function(handlers) {
  handlers.forEach(fn => {
    const layer = new Layer('/', fn)
    layer.method = 'get'
    this.stack.push(layer)
  })
}
 
module.exports = Route