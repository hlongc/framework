const express = require('express')
const bodyParser = require('body-parser')
 
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
  //设为指定的域支持跨域
  res.header('Access-Control-Allow-Origin', "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  // res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header('Access-Control-Allow-Credentials', true)
  res.header("X-Powered-By", ' 3.2.1')
  next()
})
 
app.get('/info', (req, res) => {
  res.send(req.query)
})

app.post('/postinfo', (req, res) => {
  res.send({ height: 170, weight: 130, ...req.body })
})

app.get('/timeout', (req, res) => {
  let { time } = req.query
  time = Number(time)
  setTimeout(() => {
    res.send(req.body)
  }, time)
})

app.get('/statusCode', (req, res) => {
  let { code } = req.query
  code = code - 0
  res.statusCode = code
  res.send(req.body)
})

app.listen(3333, () => {
  console.log('express run on 3000 port')
})