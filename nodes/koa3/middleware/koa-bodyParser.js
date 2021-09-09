
function bodyParser() {
  return async (cxt, next) => {
    await new Promise(resolve => {
      let ret = []
      cxt.req.on('data', chunk => {
        ret.push(chunk)
      })
      cxt.req.on('end', () => {
        cxt.request.body = ret.length ? Buffer.concat(ret) : ''
        resolve()
      })
    })
    await next()
  }
}

module.exports = bodyParser