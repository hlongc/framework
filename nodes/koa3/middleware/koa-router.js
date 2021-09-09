const path = require('path')

class Layer {
  constructor(callback, method, pathname) {
    this.callback = callback
    this.method = method
    this.pathname = pathname
  }
  // 方法和路径与当前layer进行匹配
  match(method, path) {
    return this.method === method && (this.pathname === path || this.pathname === path + '/') }
}

class Router {
  constructor() {
    this.layers = []
    this.pre = ''
  }
  prefix(prefix) {
    this.pre = prefix
  }
  get(pathname, callback) {
    this.layers.push(new Layer(callback, 'GET', path.join(this.pre, pathname)))
  }
  compose(layer, cxt, next) {
    const dispatch = i => {
      if (i === layer.length) return next()
      return Promise.resolve(layer[i].callback(cxt, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
  routes() {
    return async (cxt, next) => {
      const matchLayer = this.layers.filter(layer => layer.match(cxt.method, cxt.path))
      this.compose(matchLayer, cxt, next)
    }
  }
}

module.exports = Router