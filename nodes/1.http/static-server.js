const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const mime = require('mime')
const { createReadStream } = require('fs')
const { promisify } = require('util')
const crypto = require('crypto')
const ejs = require('ejs')

// 把回调写法转换为promise
const renderFile = promisify(ejs.renderFile)

class Server {
  constructor(config) {
    this.port = config.port
    this.dir = config.dir
  }
  /**
   * 处理请求和响应
   * @param {Object} req 请求 
   * @param {Object} res 响应
   */
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url)
    // 有可能路径是中文的，需要进行解码 
    pathname = decodeURIComponent(pathname)
    let absPath = path.join(__dirname, pathname)
    try {
      const statObj = await fs.stat(absPath)
      if (statObj.isFile()) {
        this.sendFile(req, res, absPath, statObj)
      } else {
        // 处理文件夹
        let dirs = await fs.readdir(absPath)
        dirs = dirs.map(item => {
          return {
            fullpath: path.join(pathname, item),
            name: item
          }
        })
        const html = await renderFile(path.resolve(__dirname, 'template.html'), { dirs })
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(html)
      }
    } catch (e) {
      this.sendError(e, res)
    }
  }
  async cache(req, res, absPath, statObj) {
    // 设置强制缓存,设置一分钟的缓存，一分钟之内访问让浏览器去缓存里面拿，并且状态码是200
    // 首页是无法缓存的，但是可以缓存首页中的资源
    // no-cache 在浏览器使用缓存前，会往返对比ETag，如果ETag没变，返回304，则使用缓存
    // no-store  彻底禁用缓冲，所有内容都不会被缓存到缓存或临时文件中。
    res.setHeader('Expires', new Date(new Date() + 60 * 1000).toGMTString())
    res.setHeader('Cache-Control', 'no-cache')
    // 浏览器会自动把这个上次服务器设置的时间带过来
    const ifModifiedSince = req.headers['if-modified-since']
    const ifNoneMatch = req.headers['if-none-match']

    const content = await fs.readFile(absPath)
    const eTag = crypto.createHash('md5').update(content).digest('base64')
    const ctime = statObj.ctime.toGMTString()

    res.setHeader('Last-Modified', ctime) // 设置文件最后修改的时间,这个时间只能精确到秒，一秒之内发生多次变化就不准确，而且对于cdn分发的情况文件内容相同，时间不同也会认为不一样
    res.setHeader('Etag', eTag) // Etag是根据文件计算出来的hash值，更精确
    // 对比两个时间是否相等
    return ifNoneMatch === eTag && ifModifiedSince === ctime
  }
  async sendFile(req, res, absPath, statObj)  {
    const flag = await this.cache(req, res, absPath, statObj)
    if (flag) {
      res.statusCode = 304
      res.end()
      return
    }
    res.setHeader('Content-Type', `${mime.getType(absPath)};charset=utf-8`)
    createReadStream(absPath).pipe(res)
  }

  sendError(e, res) {
    res.statusCode = 404
    res.end('Not Found')
  }

  start(...args) {
    // 如果此处不Bind this的话，this会指向http.createServer
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, () => {
      console.log(`hlc-server start on ${this.port}`)
    })
  }
}

// const server = new Server
// server.start(3000)

module.exports = Server