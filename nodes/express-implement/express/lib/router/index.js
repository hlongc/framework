const url = require('url')
const path = require('path')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')

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

// 如果path为function，则表示没传入路径，则默认'/'
Router.prototype.use = function(path, handler) {
  if (typeof path === 'function') {
    handler = path
    path = '/'
  }
  const layer = new Layer(path, handler)
  layer.route = undefined // route为undefined表示当前layer为中间件，反之为路由
  this.stack.push(layer) // 中间件是放在最顶部的
}

methods.forEach(method => {
  Router.prototype[method] = function(path, handlers) {
    const route = this.route(path)
    route[method](handlers)
  }
})


Router.prototype.handle = function(req, res, out) {
  const { pathname } = url.parse(req.url) // 请求路径
  let index = 0
  const dispatch = (err) => {
    if (index === this.stack.length) return out() // 如果到最后都没匹配成功，就交给外层的应用层处理
    const layer = this.stack[index++]
    if (err) { // 如果发生错误，找到错误处理中间件来处理错误
      if (!layer.route) { // 当前为中间件，则交给layer自己处理
        layer.handle_error(err, req, res, dispatch)
      } else { // 如果为路由，则继续寻找
        dispatch(err)
      }
    } else {
      if (layer.match(pathname)) {
        if (layer.route) { // 如果route不为undefined，则表示当前layer是路由，否则为中间件
          if (layer.route.methods[req.method.toLowerCase()]) { // 判断方法是否匹配成功
            layer.handle_request(req, res, dispatch)
          }
        } else { // 中间件直接执行方法
          if (layer.handler.length !== 4) { // 跳过错误处理中间件
            layer.handle_request(req, res, dispatch)
          }
        }
      } else { // 如果匹配失败，那么让下一个layer继续匹配
        dispatch()
      }
    }
  }
  dispatch()
}

module.exports = Router