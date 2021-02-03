Array.prototype.reduce = function(cb, init) {
  const O = Object(this)
  const len = O.length
  let memo = init === undefined ? O[0] : init
  let i = init === undefined ? 1 : 0 // 如果传了初始值，则从index = 0开始遍历，如果每传从index = 1开始遍历
  while (i < len) {
    const k = O[i]
    if (i in O) {
      memo = cb(memo, k, i, O)
    }
    i++
  }
  return memo
}

const arr = [1, 2, 3]
const r = arr.reduce((memo, cur, index, array) => {
  return memo + cur
})
console.log(r)