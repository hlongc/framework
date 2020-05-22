const express = require('express')

const app = express()

app.get('/hobby', (req, res) => {
  res.send({
    success: true,
    data: ['足球', '篮球', '羽毛球', '乒乓球']
  })
})

app.listen(3333, () => {
  console.log('server run on port 3333')
})