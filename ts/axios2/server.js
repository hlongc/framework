const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('*', (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Method': 'GET,POST,OPTIONS,PUT,DELETE',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type,name',
  })
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/get/query', (req, res) => {
  res.send(req.query)
})

app.post('/post', (req, res) => {
  const { timeout = 0 } = req.query
  setTimeout(() => {
    res.send(req.body)
  }, timeout)
})

app.post('/status', (req, res) => {
  const { status = 500 } = req.query
  res.sendStatus(status)
})

app.listen(3344)