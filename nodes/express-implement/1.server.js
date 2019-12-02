const express = require('./express')

const app = express()

app.get('/', (_, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end('首页')
})

app.get('/welcome', (req, res) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end('欢迎')
})

// app.all('*', (req, res) => {
//   res.end('*')
// })

app.listen(3000)