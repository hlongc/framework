const express = require('./express')

const app = express()

const user = express.Router()
const info = express.Router()

user.get('/add', (req, res, next) => {
  res.end('user add')
})


user.get('/remove', (req, res, next) => {
  res.end('user remove')
})

info.get('/detail', (req, res, next) => {
  res.end('info detail')
})

app.use('/user', user)
app.use('/info', info)

app.listen(3333)

