const crypto = require('crypto')

const jwt = {
  decode(token, secret) {
    const [header, content, sign] = token.split('.')
    const h = JSON.parse(this.base64ToString(header))
    if (this.sign([header, content].join('.'), secret) === sign) {
      return h
    } else {
      throw new Error('解密失败')
    }
  },
  encode(payload, secret) {
    const header = this.stringToBase64(JSON.stringify(payload))
    const content = this.stringToBase64(JSON.stringify(secret))
    const sign = this.sign([header, content].join('.'), secret)
    return [header, content, sign].join('.')
  },
  stringToBase64(str) {
    return Buffer.from(str, 'utf8').toString('base64')
  },
  base64ToString(base64) {
    return Buffer.from(base64, 'base64').toString('utf8')
  },
  sign(str, secret) {
    return crypto.createHmac('sha256', secret).update(str).digest('base64')
  }
}


module.exports = jwt