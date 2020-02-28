const Koa = require('./koa')
const fs = require('fs')

const app = new Koa

app.use((cxt) => {
  // cxt.body = 'xixi'
  // cxt.body = 'hah'
  // cxt.response.body = { name: 'hlc' }
  // cxt.body = fs.createReadStream('./index.js')
})

app.listen(3000)