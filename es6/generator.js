const fs = require('fs').promises

function *read () {
  const name = yield fs.readFile('name.txt', 'utf8')
  const age = yield fs.readFile(name, 'utf8')
  return age
}

function co(it) {
  return new Promise((reoslve, reject) => {
    function next(data) {
      const { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(next, reject)
      } else {
        reoslve(value)
      }
    }
    next()
  })
}

co(read()).then(console.log)

// const it = read()
// const { value } = it.next()
// value.then(d => {
//   const { value } = it.next(d)
//   value.then(r => {
//     const { value } = it.next(r)
//     console.log(value)
//   })
// })