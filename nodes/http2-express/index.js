const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const http = require('http')
// const http2 = require('http2')
const port = 3456
// http2默认是tsl 打开是https://localhost:3456

const app = express()
app.use(express.static(__dirname))

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
}

spdy.createServer(options, app).listen(port)
// http.createServer(app).listen(port)
// http2.createSecureServer(options, app).listen(port)