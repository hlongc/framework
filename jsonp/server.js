const express = require('express')

const app = express()

app.all('*', (req, res, next) => {
  // 如果设置为 * 的话，是无法带上cookie的
  res.setHeader('Access-Control-Allow-Credentials', true) // 跨域时允许携带cookie
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Method', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', 1728000) // 预请求缓存20天,期间不需要发出options请求
  next()
})

app.get('/test/jsonp', (req, res) => {
  const callback = req.query.callback
  const result = {
    success: true,
    data: 'xixi'
  }
  // 调用客户端的callback方法并执行
  res.send(`${callback}(${JSON.stringify(result)})`)
})

app.get('/test/cors', (req, res) => {
  res.cookie('hello', 'world12')
  res.send({
    success: true,
    data: req.query
  })
})

app.listen(3333, () => {
  console.log('service run on port 3333')
})