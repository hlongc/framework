const express = require('./express')

const app = express()

app.use((req, res, next) => {
  console.log('common')
  next()
})

app.use('/a', (req, res, next) => {
  console.log('use /a')
  next()
})

app.use('/b', (req, res, next) => {
  console.log('use /b')
  next()
})

app.get('/a', (req, res) => {
  res.end('aaaaaa')
})

app.get('/b', (req, res) => {
  res.end('bbbbbb')
})

app.listen(3333)