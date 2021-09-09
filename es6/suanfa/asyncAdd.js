
const remoteAdd = (a, b) => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + b)
  }, 3000)
})

const sum = nums => {
  return new Promise(resolve => {
    nums.reduce((memo, cur) => {
      return memo.then(prev => {
        return remoteAdd(prev, cur)
      })
    }, Promise.resolve(0)).then(resolve)
  })
}

sum([1, 2, 3, 4, 5]).then(console.log)