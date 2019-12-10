const express = require('../express')

const route = express.Router()

route.get('/add', (req, res) => {
  res.end('user add')
})

route.get('/remove', (req, res) => {
  res.end('user remove')
})

module.exports = route