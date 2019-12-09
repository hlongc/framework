const express = require('./express')

const app = express()

app.use(function(req, res, next) {
  req.a = 1
  console.log(req.a, '第一次')
  next()
})

app.use('/', function(req, res, next) {
  req.a++
  console.log(req.a, '第二次')
  next()
})

app.use('/a', function(req, res, next) {
  req.a++
  console.log(req.a, '第三次')
  next()
})

app.get('/a', function(req, res) {
  console.log(req.a, '第四次')
  res.end(req.a + '')
})

app.get('/', function(req, res) {
  res.end(req.a + '')
})

app.listen(3000)