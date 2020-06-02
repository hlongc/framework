const express = require('./express')

const app = express()

app.use((req, res, next) => {
  console.log('common')
  next()
})

app.get('/a', (req, res, next) => {
  next('errorrrrrrrr')
}, (req, res, next) => {
  next()
})

app.get('/a', (req, res) => {
  res.end('aaaaa')
})

app.get('/b', (req, res, next) => {
  res.end('bbbbb')
})

// 错误中间件参数有四个
app.use((err, req, res, next) => {
  res.end(err)
})

app.listen(3333)