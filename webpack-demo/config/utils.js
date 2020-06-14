const path = require('path')

const resolve = (realtivePath) => path.resolve(__dirname, realtivePath)
const join = (...args) => path.join(...args)

module.exports = {
  resolve,
  join
}