const express = require('./express')

const app = express()

app.get('/home', (req, res, next) => {
  console.log(1)
  next()
}, (req, res, next) => {
  console.log(11)
  next()
}, (req, res, next) => {
  console.log(11)
  next()
})

app.get('/home', (req, res, next) => {
  console.log(2)
  res.end('home')
})

app.post('/home', (req, res) => {
  res.end('post home')
})

app.listen(3333)
