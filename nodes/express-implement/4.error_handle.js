const express = require('./express')

const app = express()

app.use(function(req, res, next) {
  const flag = Math.random() > 0.5
  flag ? next('出错了') : next()
})

app.get('/a', function(req, res) {
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  res.end('没出错')
})

app.use(function(err, req, res, next) {
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  res.end(err)
})

app.listen(3000)