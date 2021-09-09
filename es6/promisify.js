const fs = require('fs')

const readFile = promisify(fs.readFile)

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

readFile('./name.txt', 'utf-8')
  .then(console.log)
  .catch(console.log)