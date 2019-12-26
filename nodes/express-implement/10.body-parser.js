const express = require('./express')
// const bodyParser = require('body-parser')

const app = express()

const bodyParser = {}

bodyParser.urlencoded = function() {
  return (req, res, next) => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') { // 如果是表单则进行处理，否则next
      const result = []
      req.on('data', chunk => {
        result.push(chunk)
      })
      req.on('end', () => {
        req.body = require('querystring').parse(Buffer.concat(result).toString())
        next()
      })
    } else {
      next()
    }
  }
}
bodyParser.json = function() {
  return (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') { // 如果是表单则进行处理，否则next
      const result = []
      req.on('data', chunk => {
        result.push(chunk)
      })
      req.on('end', () => {
        req.body = JSON.parse(Buffer.concat(result).toString())
        next()
      })
    } else {
      next()
    }
  }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  res.send(req.body)
})

app.listen(3000)