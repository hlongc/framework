const url = require('url')
const response = {
  get method() {
    // this指向ctx ctx上面有req，所以可以取到
    return this.req.method
  },
  get path() {
    return url.parse(this.req.url).pathname
  }
}

module.exports = response