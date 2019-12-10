const express = require('./express')
const user = require('./routes/user')
const admin = require('./routes/admin')

const app = express()

app.use('/user', user)
app.use('/user', admin)

app.listen(3000)