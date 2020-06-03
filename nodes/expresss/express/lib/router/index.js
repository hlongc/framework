const url = require('url')
const methods = require('methods')
const Route = require('./route')
const Layer = require('./layer')

// 既可以当做类使用，也可以当做函数使用，返回的实例功能相同
function Router() {
  const router = function(req, res, next) {
    router.handle(req, res, next)
  }
  router.stack = []
  router.paramCallbacks = {}
  // 挂载原型方法
  router.__proto__ = Object.create(proto)
  return router
}

const proto = {}

proto.route = function(path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route // 当前layer记住自己属于哪个route
  this.stack.push(layer)
  return route
}
// 中间件逻辑
proto.use = function(path, handler) {
  if (typeof path === 'function') {
    handler = path
    path = '/'
  }
  const layer = new Layer(path, handler)
  // 中间件的layer没有route属性
  this.stack.push(layer)
}

// 路由参数处理 发布订阅-订阅
proto.param = function(key, callback) {
  if (!this.paramCallbacks[key]) {
    this.paramCallbacks[key] = [callback]
  } else {
    this.paramCallbacks[key].push(callback)
  }
}

// 执行路由逻辑之前先处理参数回调 发布订阅-发布
proto.handle_callbacks = function(layer, req, res, done) {
  let keys = layer.keys
  if (!keys) { // 如果当前没有路由参数那就直接执行路由函数
    return done()
  }
  keys = keys.map(item => item.name)
  let index = 0
  const next = () => {
    if (index >= keys.length) return done()
    const key = keys[index++] // 按顺序执行参数的回调 /info/:name/:age 先执行name的回调，再执行age
    const callbacks = this.paramCallbacks[key]
    if (callbacks && callbacks.length) {
      let idx = 0
      const dispatch = () => {
        if (idx >= callbacks.length) return next()
        const callback = callbacks[idx++] // 取出name所有回调中的一个执行
        callback(req, res, dispatch, layer.params[key], key)
      }
      dispatch()
    } else {
      next()
    }
  }
  next()
}

methods.forEach(method => {
  proto[method] = function (path, handlers) {
    // 如果传入的不是数组，那么转换成数组
    if (!Array.isArray(handlers)) {
      handlers = Array.from(arguments).slice(1)
    }
    const route = this.route(path)
    route[method](handlers) // 把用户传入的处理函数给route保存
  }
})

// 外层匹配路径
proto.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url, true)
  const reqMethod = req.method.toLowerCase()
  let index = 0
  let removePrefix = '' // 移除的路由前缀
  const next = (err) => {
    if (index >= this.stack.length) return out()
    const layer = this.stack[index++]
    if (removePrefix) { // 进行下一场匹配之前把前缀拼接回去
      req.url = removePrefix + req.url
      removePrefix = ''
    }
    if (err) { // 如果有错误，要交给错误中间件来处理
      if (!layer.router) { // 当前是中间件就尝试进行处理
        layer.handle_error(err, req, res, next)
      } else { // 不是中间件就继续往下面传递
        next(err)
      }
    } else {
      if (layer.match(pathname)) { // 中间件和路由都要匹配路径
        if (!layer.route) { // 不存在route属性就是中间件
          if (layer.handler.length !== 4) { // 参数为4个的是错误中间件
            if (layer.path !== '/') { // 路径不为'/'才进行删除
              removePrefix = layer.path // 保存父路由前缀
              req.url = req.url.slice(removePrefix.length) // 裁剪以后进行子路由匹配
            }
            layer.handle_request(req, res, next)
          } else {
            next()
          }
        } else { // 路由还要匹配方法
          if (layer.route.methods[reqMethod]) {
            req.params = layer.params || {}
            // 执行完参数回调再执行真正的路由逻辑
            this.handle_callbacks(layer, req, res, () => {
              layer.handle_request(req, res, next)
            })
          } else {
            next()
          }
        }
      } else {
        next()
      }
    }
  }
  next()
}

module.exports = Router