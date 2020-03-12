const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

app.get('/users', (req, res) => {
  const { limit, offset } = req.query
  const result = []
  for (let i = 0; i < limit - 0; i++) {
    result.push({ id: new Date().getTime() + Math.random(), name: 'number' + (offset - 0 + i) })
  }
  res.json(result)
})

app.listen(8000)