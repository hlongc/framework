
// const co = require('co')
const fs = require('fs').promises

function * read() {
  const a = yield fs.readFile('name.txt', 'utf-8')
  const b = yield fs.readFile(a, 'utf-8')
  return b
}

function co(it) {
  return new Promise((resolve, reject) => {
    const next = data => {
      const { value, done } = it.next(data)
      if (done) {
        return resolve(value)
      }
      Promise.resolve(value).then(v => {
        next(v)
      }, reject)
    }
    next()
  })
}

co(read()).then(console.log)

console.log(process.platform)

// const it = read()
// const { value, done } = it.next()
// value.then(data => {
//   const { value, done } = it.next(data)
//   value.then(dt => {
//     console.log(dt)
//   })
// })