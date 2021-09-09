const Koa = require('koa')
const bodyParser = require('./middleware/koa-bodyParser')
const app = new Koa()

app.use(bodyParser())

app.use(async (cxt, next) => {
  if (cxt.method === 'POST' && cxt.path === '/login') {
    cxt.body = cxt.request.body.toString()
  } else {
    await next()
  }
})

app.use(async (cxt, next) => {
  if (cxt.method === 'GET' && cxt.path === '/form') {
    cxt.body = `
      <form action="/login" method="POST">
        <input type="text" name="name" />
        <input type="password" name="password" />
        <input type="submit" />
      </form>
    `
  } else {
    await next()
  }
})

app.listen(3003, () => {
  console.log('server run port 3003')
})