const Koa = require('koa')
const path = require('path')
const static = require('./middleware/koa-static')

const app = new Koa()
app.use(static(path.resolve(__dirname, 'koa')))
app.use(static(path.resolve(__dirname, 'public')))

app.listen(3003, () => {
  console.log('server run port 3003')
})