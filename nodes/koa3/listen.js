const Koa = require('./koa')
const fs = require('fs')

const koa = new Koa()

// koa.use(cxt => {
//   // cxt.body = fs.createReadStream('./listen.js')
//   // console.log(cxt.req.query)
//   // console.log(cxt.request.req.query)

//   // console.log(cxt.request.query)
//   // console.log(cxt.query)
// })

koa.use(async (_cxt, next) => {
  console.log(1)
  await next()
  await next()
  console.log(2)
})

koa.use(async (_cxt, next) => {
  console.log(3)
  await new Promise(resolve => {
    next()
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  console.log(4)
})

koa.use(async (cxt, next) => {
  console.log(5)
  await next()
  cxt.body = 'hello world'
  console.log(6)
})

koa.on('error', e => {
  console.log(e + '错误')
})

koa.listen(3003, () => {
  console.log('server run port 3000')
})