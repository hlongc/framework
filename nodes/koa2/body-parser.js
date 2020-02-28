module.exports = () => {
  return async(cxt, next) => {
    await new Promise(resolve => {
      let arr = []
      cxt.req.on('data', chunk => {
        arr.push(chunk)
      })
      cxt.req.on('end', () => {
        cxt.request.body = Buffer.concat(arr).toString()
        resolve()
      })
    })
    await next()
  }
}