const url = require('url')
const path = require('path')
const Layer = require('./layer')
const Route = require('./route')

function Router() {
  this.stack = []
}

Router.prototype.route = function(path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route)) // 让layer保存路径和route.dispatch
  layer.route = route // route属性代表当前是个路由
  this.stack.push(layer)
  return route
}

Router.prototype.get = function(path, handlers) {
  const route = this.route(path)
  route.get(handlers)
}

Router.prototype.handle = function(req, res, out) {
  const { pathname } = url.parse(req.url) // 请求路径
  let index = 0
  function dispatch() {
    if (index === this.stack.length) return out() // 如果到最后都没匹配成功，就交给外层的应用层处理
    const layer = this.stack[index++]
    if (layer.match(pathname)) { // 如果路径匹配成功，那么就让handler执行
      layer.handle_request(req, res, dispatch) // route.dispatch
    } else { // 如果匹配失败，那么让下一个layer继续匹配
      dispatch()
    }
  }
  dispatch()
}

module.exports = Router