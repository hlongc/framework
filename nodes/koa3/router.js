const Koa = require('koa')
const Router = require('./middleware/koa-router')
// const Router = require('koa-router')

const router = new Router()

router.prefix('/user')
router.get('/', (cxt, next) => {
  cxt.body = 'user'
})
router.get('/info', async (cxt, next) => {
  cxt.body = 'info1'
  await next()
})
router.get('/info', async (cxt, next) => {
  cxt.body += 'info2'
})
router.get('/add', async (cxt, next) => {
  cxt.body = 'add'
})

const app = new Koa()
app.use(router.routes())

app.listen(3003, () => {
  console.log('server run port 3003')
})