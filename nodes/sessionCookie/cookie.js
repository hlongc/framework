const http = require('http')
const querystring = require('querystring')
const crypto = require('crypto')
const salt = 'hlongc'

// base64中 = + / 要进行特殊处理
const sign = value => crypto.createHmac('sha256', salt).update(value).digest('base64').replace(/\=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

http.createServer((req, res) => {
  req.getCookie = function(key, options = {}) {
    let cookies = req.headers['cookie']
    cookies = querystring.parse(cookies, '; ')
    let [value, s] = cookies[key].split('.')
    if (options.sign) {
      if (sign(value) === s) { // 校验成功说明有效
        return value
      } else {
        return 'not validate'
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

  if (req.url === '/read') {
    res.end(req.getCookie('name', { sign: true }) || '空')
  } else if (req.url === '/write') {
    res.setCookie('name', 'hlc', { maxAge: 2000, httpOnly: true, sign: true })
    res.setCookie('age', '24', { maxAge: 3000 })
    res.end('write ok')
  } else {
    res.end('o')
  }
}).listen(3008)