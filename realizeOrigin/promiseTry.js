Promise.try = function (fn) {
  try {
    let res = fn()
    return (async() => res)()
  } catch (err) {
    throw err
  }
}
function fn() {
  throw new Error('出错')
}
console.log(456)
Promise.try(fn).catch(err => {
  console.log(err)
})
console.log(123)

const cpus = require('os').cpus().length
console.log(cpus)
console.log(process.platform)
console.log(process.env)