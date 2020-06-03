const express = require('./express')

const app = express()

app.param('age', (req, res, next, value, key) => {
  console.log(req.params)
  if (value == 25) {
    req.params.age = 18
    next()
  } else {
    next()
  }
})

app.param('age', (req, res, next, value, key) => {
  console.log(req.params)
  if (value == 24) {
    req.params.age = 17
    next()
  } else {
    next()
  }
})

app.param('name', (req, res, next, value, key) => {
  console.log(req.params)
  if (value == 'hlc') {
    req.params.name = 'hlongc'
    next()
  } else {
    next()
  }
})

app.param('name', (req, res, next, value, key) => {
  console.log(req.params)
  if (value == 'hulc') {
    req.params.name = 'hulongchao'
    next()
  } else {
    next()
  }
})

app.get('/info/:name/:age', (req, res) => {
  console.log(req.params, 1)
  res.end(JSON.stringify(req.params))
})

app.listen(3333)