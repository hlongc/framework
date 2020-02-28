const Koa = require('./koa')
const fs = require('fs')
const path = require('path')
const bodyParser = require('./body-parser')

const app = new Koa()

app.use(bodyParser())

app.use(async (cxt, next) => {
  if (cxt.path === '/form' && cxt.method.toLowerCase() === 'get') {
    cxt.set('Content-Type', 'text/html;charset=utf-8')
    cxt.body = fs.createReadStream(path.resolve(__dirname, 'form.html'))
  } else {
    await next()
  }
})

app.use(cxt => {
  cxt.body = cxt.request.body
})

app.listen(3000)