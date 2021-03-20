const express = require('express')

const app = express()

app.all('*', (req, res, next) => {
  // 如果设置为 * 的话，是无法带上cookie的
  res.setHeader('Access-Control-Allow-Credentials', true) // 跨域时允许携带cookie
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Method', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Max-Age', 1728000) // 预请求缓存20天,期间不需要发出options请求
  next()
})

app.get('/info', (req, res) => {
  const limit = +req.query.limit
  const offset = +req.query.offset
  const ret = []
  for (let i = offset; i < offset + limit; i++) {
    ret.push({ name: `name${i + 1}`, id: i + 1 })
  }
  res.json(ret)
})

app.listen(8000, () => {
  console.log('server run on port 8000')
})