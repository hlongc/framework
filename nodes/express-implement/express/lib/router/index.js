const url = require('url')
const path = require('path')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')

const proto = {}

function Router() {
  const router = (req, res, next) => {
    router.handle(req, res, next)
  }
  router.stack = []
  router.paramCallback = {} // { id: [fn, fn], name: [fn] }
  router.__proto__ = proto // 通过原型链来查找方法
  return router
}


proto.route = function(path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route)) // 让layer保存路径和route.dispatch
  layer.route = route // route属性代表当前是个路由
  this.stack.push(layer)
  return route
}

// 如果path为function，则表示没传入路径，则默认'/'
proto.use = function(path, handler) {
  if (typeof path === 'function') {
    handler = path
    path = '/'
  }
  const layer = new Layer(path, handler)
  layer.route = undefined // route为undefined表示当前layer为中间件，反之为路由
  this.stack.push(layer) // 中间件是放在最顶部的
}

proto.param = function(key, handler) {
  if (this.paramCallback[key]) { // 如果当前存在id所对应的数组，那么直接push
    this.paramCallback[key].push(handler)
  } else {
    this.paramCallback[key] = [handler] // 否则创建
  }
}

proto.processParam = function(layer, req, res, done) {
  if (!layer.keys && layer.keys.length === 0) { // 如果keys不存在或者长度为0，则直接跳出
    return done()
  }
  const params = layer.keys.map(item => item.name) // 取出当前参数对应的监听函数数组
  const execCallbacks = (key, out) => {
    let index = 0
    const callbacks = this.paramCallback[key] // { id: [fn, fn], name: [fn] },取出id对应的[fn, fn]
    function next() {
      if (index === callbacks.length) return out()
      callbacks[index++](req, res, next, req.params[key], key)
    }
    next()
  }
  let idx = 0
  const process = () => {
    if (idx === params.length) return done() // 如果全部执行完毕，那么让done去执行真正处理请求的函数
    execCallbacks(params[idx++], process) // 依次处理每个param的监听函数
  }
  process()
}

methods.forEach(method => {
  proto[method] = function(path, handlers) {
    const route = this.route(path)
    route[method](handlers)
  }
})


proto.handle = function(req, res, out) {
  const { pathname } = url.parse(req.url) // 请求路径
  let index = 0
  let removePath = ''
  const dispatch = (err) => {
    if (index === this.stack.length) return out() // 如果到最后都没匹配成功，就交给外层的应用层处理
    const layer = this.stack[index++]
    if (removePath) { // 如果不为空，说明之前匹配二级路由时删除过，现在补全
      req.url = removePath + req.url
      removePath = ''
    }
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
            req.params = layer.params
            this.processParam(layer, req, res, () => { // 在真正处理请求之前先走param监听函数
              layer.handle_request(req, res, dispatch)
            })
          }
        } else { // 中间件直接执行方法
          if (layer.handler.length !== 4) { // 跳过错误处理中间件
            if (layer.path !== '/') { // 如果就是 '/' 那就不用删除，否则匹配失败
              removePath = layer.path // 删除之前先记录，在下一层layer匹配时复原回去，否则后面匹配失败
              req.url = req.url.slice(removePath.length) // 二级路由匹配时，需要删除上一级的路径，否则匹配失败 /user/add => /add
            }
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