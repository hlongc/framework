const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './')))

app.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true) // 跨域时允许携带cookie
  // 如果设置为 * 的话，是无法带上cookie的
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
    type: 'jsonp',
    data: 'xixi'
  }
  // 调用客户端的callback方法并执行
  res.setHeader('Content-Type', 'application/json')
  res.send(`${callback}(${JSON.stringify(result)})`)
})

app.get('/test/cors', (req, res) => {
  console.log(req.cookies)
  res.send({
    success: true,
    type: 'cors',
    cookie: req.cookies,
    data: req.query
  })
})

app.listen(3333, () => {
  console.log('service run on port 3333')
})