const Koa = require('koa')
const Server = require('koa-static')
const path = require('path')

const app = new Koa

app.use(Server(path.resolve(__dirname, 'public')))

app.listen(3000)