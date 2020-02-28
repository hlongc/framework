const Emmiter = require('events')
const http = require('http')
const context = require('./context')
const response = require('./response')
const request = require('./request')
const Stream = require('stream')

module.exports = class Application extends Emmiter {
  constructor() {
    super()
    this.context = Object.create(context) // 以context为原型创建新对象，对新对象修改并不会影响原型，并且能调用原型上面的方法
    this.response = Object.create(response)
    this.request = Object.create(request)
    this.middlwares = [] // 保存use的中间件处理函数
  }
  use(fn) {
    this.middlwares.push(fn)
  }
  createContext(req, res) {
    const cxt = Object.create(this.context) // 保证每一次请求的唯一性
    cxt.request = Object.create(this.request)
    cxt.response = Object.create(this.response)
    cxt.req = cxt.request.req = req
    cxt.res = cxt.response.res = res
    return cxt
  }
  compose(middlewares, cxt) {
    let idx = -1
    function dispatch(index) {
      try {
        // idx来记录被调用次数，防止在一个中间件内多次调用next
        if (index <= idx) return Promise.reject('next() call mutiple times')
        if (index ===  middlewares.length) return Promise.resolve() // 当所有中间完成以后返回一个成功的promise
        idx = index
        // 迭代执行所有中间件
        return Promise.resolve(middlewares[index](cxt, () => dispatch(index + 1)))
      } catch (e) {
        console.log('e1', e)
        return Promise.reject(e)
      }
    }
    return dispatch(0)
  }
  handleRequest(req, res) {
    const cxt = this.createContext(req, res)
    // 把所有的中间件包装成一个promise大函数，所有只要要调用next就要使用await
    this.compose(this.middlwares, cxt).then(() => {
      const body = cxt.body
      if (body instanceof Stream) {
        body.pipe(res)
      } else if (typeof body === 'object') {
        cxt.set('Content-Type', 'application/json')
        res.end(JSON.stringify(cxt.body))
      } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
        cxt.set('Content-Type', 'text/html;charset=utf-8')
        res.end(body)
      } else {
        cxt.statusCode(404)
        res.end('Not Found')
      }
    }).catch(e => {
      cxt.statusCode(500)
      res.end('server inernal error')
      this.emit('error', e)
    })
  }
  listen(...args) {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}