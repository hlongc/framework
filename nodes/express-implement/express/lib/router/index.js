const url = require('url')
const path = require('path')

function Router() {
  this.stack = []
}

Router.prototype.get = function(path, handler) {
  this.stack.push({ path, handler, method: 'get' })
}

Router.prototype.handle = function(req, res, out) {
  const { pathname } = url.parse(req.url)
  const reqMethod = req.method.toLowerCase()
  for (let i = 0; i < this.stack.length; i++) {
    const { path, handler, method } = this.stack[i]
    if (path === pathname && method === reqMethod) {
      return handler(req, res)
    }
  }
  return out()
}

module.exports = Router