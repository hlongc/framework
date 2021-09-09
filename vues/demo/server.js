const express = require('express')
const app = express()

const list = [
  { username: 'hlc', userpwd: '123456' }
]

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTION') {
    res.end()
  } else {
    next()
  }
})

app.get('/user/login', (req, res) => {
  const { username, userpwd } = req.query
  const isExist = list.some(item => item.username === username && item.userpwd === userpwd)
  res.send({ success: isExist })
})

app.listen(8080)