const http = require('http')
const querystring = require('querystring')
const crypto = require('crypto')
const uuid = require('uuid')
const salt = 'hlongc'
const serverName = 'hulongchao-service'
const session = {}
// base64中 = + / 要进行特殊处理
const sign = value => crypto.createHmac('sha256', salt).update(value).digest('base64').replace(/\=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

http.createServer((req, res) => {
  req.getCookie = function(key, options = {}) {
    let cookies = req.headers['cookie']
    if (!cookies) return ''
    cookies = querystring.parse(cookies, '; ')
    if (!cookies[key]) return ''
    let [value, s] = cookies[key].split('.')
    if (options.sign) {
      if (sign(value) === s) { // 校验成功说明有效
        return value
      } else {
        return ''
      }
    }
    return value
  }
  const arr = []
  res.setCookie = function(key, value, options) {
    const opts = []
    let cookie = `${key}=${value}`
    if (options.maxAge) {
      opts.push(`max-age=${options.maxAge}`)
    }
    if (options.domain) {
      opts.push(`domain=${options.domain}`)
    }
    if (options.httpOnly) {
      opts.push(`httpOnly=${options.httpOnly}`)
    }
    if (options.sign) {
      cookie += '.' + sign(value)
    }
    arr.push(`${cookie}; ${opts.join('; ')}`)
    res.setHeader('Set-Cookie', arr)
  }

  if (req.url === '/visit') {
    let cardID = req.getCookie(serverName, { sign: true })
    if (cardID && session[cardID]) {
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(`第${++session[cardID].count}次访问`)
    } else {
      let card = uuid.v4()
      res.setCookie(serverName, card, { sign: true })
      session[card] = {
        count: 1
      }
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end('第一次访问')
    }
  } else {
    res.end('o')
  }
}).listen(3008)