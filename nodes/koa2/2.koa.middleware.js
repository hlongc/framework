const Koa = require('./koa')

const app = new Koa()

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

app.use(async (cxt, next) => {
  console.log(1)
  await next()
  console.log(2)
  cxt.body = '测试sleep 中间件'
})

app.use(async (cxt, next) => {
  console.log(3)
  console.time('sleep')
  await sleep()
  console.timeEnd('sleep')
  cxt.body = 'hhh'
  await next()
  console.log(4)
})

app.use((cxt, next) => {
  console.log(5)
  return Promise.reject('我是错误')
})

app.on('error', e => {
  console.log(e)
})

app.listen(3000)