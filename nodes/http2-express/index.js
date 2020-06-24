const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const http2 = require('http2')

// 添加下面两行代码修改原型，能让express支持http2模块, 如果使用spdy模块，则不需要添加，spdy的http2实现是支持express的
express.request.__proto__ = http2.Http2ServerRequest.prototype
express.response.__proto__ = http2.Http2ServerResponse.prototype

const port = 3456
// http2默认是tsl 打开是https://localhost:3456，需要证书验证和公钥

const app = express()
app.use(express.static(__dirname))

// spdy 密钥和证书
// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
//   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
// }

// spdy.createServer(options, app).listen(port)


// http2 密钥和证书
const options = {
  key: fs.readFileSync(path.resolve(__dirname, './secret/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, './secret/cert.pem'))
}

http2.createSecureServer(options, app).listen(port)