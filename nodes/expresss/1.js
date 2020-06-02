const express = require('./express')

const app = express()

app.get('/home', (req, res) => {
  res.end('home')
})

app.get('/info', (req, res) => {
  res.end('info')
})

app.listen(3333)
