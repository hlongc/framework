const express = require('express')

const app = express()

app.get('/', function(req, res, next) {
  console.log(1)
  next()
}, function(req, res, next) {
  console.log(11)
  next()
}, function(req, res, next) {
  console.log(111)
  next()
}, function(req, res, next) {
  console.log(1111)
  next()
})

app.get('/a', function(req, res, next) {
  console.log(2)
  res.end('ok')
})

app.listen(3000, function() {
  console.log('app run at 3000')
})