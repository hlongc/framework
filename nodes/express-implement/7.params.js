const express = require('express')

const app = express()

app.param('id', (req, res, next, key, value) => {
  req.params.id += 'first'
  next()
})

app.param('id', (req, res, next, key, value) => {
  req.params.id += 'second'
  next()
})

app.param('name', (req, res, next, key, value) => {
  req.params.name += ' hah'
  next()
})

app.get('/user/:id/:name', (req, res) => {
  res.end(JSON.stringify(req.params))
})

app.listen(3000)