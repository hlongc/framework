const http = require('http')
const url = require('url')
const path = require('path')

function createApplication() {
  const router = [
    { path: '*', method: '*', handler(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    } }
  ]

  return {
    get(path, handler) {
      router.push({
        path, handler, method: 'get'
      })
    },
    listen() {
      const server = http.createServer((req, res) => {
        const { pathname } = url.parse(req.url) // 获取请求路径
        const reqMethod = req.method.toLocaleLowerCase() // 获取请求方法
        for (let i = 1; i < router.length; i++) {
          const { path, method, handler } = router[i]
          if (path === pathname && method === reqMethod) { // 进行匹配
            return handler(req, res) // 找到则执行
          }
        }
        return router[0].handler(req, res) // 如果都没找到，那么执行默认的 
      })
      server.listen(...arguments)
    }
  }
}

module.exports = createApplication