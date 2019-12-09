const Layer = require('./layer')
const methods = require('methods')

function Route() {
  this.stack = []
  this.methods = {} // 记录当前route保存了哪些方法
}

Route.prototype.dispatch = function(req, res, out) { // out就是外层的dispatch，用于跳出当前route
  let index = 0
  const reqMethod = req.method.toLowerCase()
  const dispatch = () => {
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

methods.forEach(method => {
  Route.prototype[method] = function(handlers) {
    handlers.forEach(fn => {
      const layer = new Layer('/', fn)
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    })
  }
})
 
module.exports = Route