const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const mime = require('mime')
const { createReadStream, createWriteStream } = require('fs')

class Server {
  constructor(config) {
    console.log(config)
    this.port = config.port
    this.dir = config.dir
  }
  /**
   * 处理请求和响应
   * @param {Object} req 请求 
   * @param {Object} res 响应
   */
  async handleRequest(req, res) {
    const { pathname } = url.parse(req.url)
    let asbpath = path.join(__dirname, pathname)
    try {
      const statObj = await fs.stat(asbpath)
      if (statObj.isFile()) {
        this.sendFile(req, res, asbpath, statObj)
      } else {
        // 处理文件夹
      }
    } catch (e) {
      this.sendError(e, res)
    }
  }

  sendFile(req, res, asbpath, statObj)  {
    res.setHeader('Content-Type', `${mime.getType(asbpath)};charset=utf-8`)
    createReadStream(asbpath).pipe(res)
  }

  sendError(e, res) {
    res.statusCode = 404
    res.end('Not Found')
  }

  start(...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, () => {
      console.log(`hlc-server start on ${this.port}`)
    })
  }
}

const server = new Server
server.start(3000)

module.exports = Server