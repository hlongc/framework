const express = require('../express')

const route = express.Router()

route.get('/addxxx', (req, res) => {
  res.end('admin add')
})

route.get('/remove', (req, res) => {
  res.end('admin remove')
})

module.exports = route