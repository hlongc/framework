const Koa = require('koa')
const fs = require('fs').promises
const path = require('path')
const static = require('./static')
const uuid = require('uuid')

const app = new Koa()

app.use(static(path.resolve(__dirname)))

Buffer.prototype.split = function(sep) {
  const arr = []
  let len = Buffer.from(sep).length
  let offset = 0
  let current
  while ((current = this.indexOf(sep, offset)) !== -1) {
    arr.push(this.slice(offset, current))
    offset = current + len
  }
  arr.push(this.slice(offset))
  return arr
}

app.use(async (cxt, next) => {
  if (cxt.path === '/form' && cxt.method.toLowerCase() === 'post') {
    await new Promise(resolve => {
      const r = []
      cxt.req.on('data', function(chunk) {
        r.push(chunk)
      })
      cxt.req.on('end', function() {
        const fileds = {}
        const allData = Buffer.concat(r)
        // 拿到分隔符
        const boundary = '--' + cxt.get('Content-Type').split('=')[1]
        const arr = allData.split(boundary).slice(1, -1)
        arr.forEach(async line => {
          let [head, body] = line.split('\r\n\r\n')
          head1 = head.toString()
          const key = head1.match(/name="(.+)"/)[1]
          if (!head1.includes('filename')) { // 如果头部信息不包括filename，说明当前只是普通字段
            fileds[key] = body.toString().slice(0, -2)
          } else {
            const filepath = path.resolve(__dirname, 'upload', uuid.v4())
            fileds[key] = filepath
            const content = line.slice(head.length + 4, -2)
            await fs.writeFile(filepath, content)
          }
        })
        cxt.body = fileds
        resolve()
      })
    })
  } else {
    await next()
  }
})

app.use(cxt => {
  cxt.body = cxt.request.body
})

app.listen(3000)