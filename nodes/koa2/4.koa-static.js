const Koa = require('./koa')
const path = require('path')
const static = require('./static')

const app = new Koa()

app.use(static(path.resolve(__dirname, 'koa')))

app.listen(3000)