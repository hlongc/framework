const path = require('path')

module.exports = {
  resolve(p) {
    return path.resolve(__dirname, p)
  },
  join(...args) {
    return path.join(...args)
  }
}