const express = require('./express')

const app = express()

app.get('/info/:name/:age', (req, res) => {
  res.end(JSON.stringify(req.params))
})

app.listen(3333)