const http = require('http')
const Stream = require('stream')
const EventEmitter = require('events')
const context = require('./context')
const response = require('./response')
const request = require('./request')


class Application extends EventEmitter {
  constructor() {
    super()
    // 每个应用上下文之间的隔离
    this.context = Object.create(context)
    this.response = Object.create(response)
    this.request = Object.create(request)
    this.middlewares = []
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }
  createContext(req, res) {
    // 每次请求之间的隔离
    const context = Object.create(this.context)
    const response = Object.create(this.response)
    const request = Object.create(this.request)

    // req res是原生的
    // request response是扩展的，比如有query等属性
    context.request = request
    context.request.req = context.req = req

    context.response = response
    context.response.res = context.res = res

    return context
  }
  compose(ctx) {
    let index = -1 // index用于判断在同一个中间件中是否存在重复调用next方法
    // 正常调用时 i = index + 1,非正常调用 index >= i
    const dispatch = (i) => {
      if (i <= index) return Promise.reject('next() 重复调用')
      // 此时说明中间件全部执行完毕
      if (i === this.middlewares.length) return Promise.resolve()
      const middleware = this.middlewares[i]
      if (typeof middleware !== 'function') {
        return Promise.reject(`${middleware} is a invalidate middleware function`)
      }
      index = i
      // 递归调用下一个中间件，和express实现一样            这个才是真正的next函数
      return Promise.resolve(middleware(ctx,  () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
  handleRequest = (req, res) => {
    const cxt = this.createContext(req, res)
    // 所有中间件执行完成以后才返回
    this.compose(cxt).then(() => {
      const _body = cxt.body
      res.statusCode = 404
      if (_body !== void 0) {
        res.statusCode = 200
        if (typeof _body === 'string' || Buffer.isBuffer(_body)) {
          res.end(_body)
        } else if (typeof _body === 'number') {
          res.end(_body + '')
        } else if (_body instanceof Stream) {
          // 设置下面的响应头直接下载
          // res.setHeader('Content-Type', 'application/octet-stream')
          // res.setHeader('Content-Disposition', 'attachment;filename=download')
          _body.pipe(res)
        } else if (typeof _body === 'object' && _body !== null) {
          res.end(JSON.stringify(_body))
        }
      } else {
        res.end('Not Found')
      }
    }).catch(e => {
      // res.statusCode = 500
      // res.end('Server Internal Error')
      this.emit('error', e)
    })
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest)
    server.listen(...args)
  }
}

module.exports = Application