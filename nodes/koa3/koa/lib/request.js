const url = require('url')

const request = {
  get url() {
    return this.req['url']
  },
  get query() {
    return url.parse(this.req['url']).query
  },
  get path() {
    return url.parse(this.req['url']).pathname
  }
}

module.exports = request