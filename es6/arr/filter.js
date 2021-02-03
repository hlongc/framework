Array.prototype.filter = function(cb) {
  const O = Object(this)
  const len = O.length
  let T
  if (arguments.length > 1) {
    T = arguments[1]
  }
  let i = 0
  const ret = []
  while (i < len) {
    const k = O[i]
    if (i in O) {
      if (cb.call(T, k, i, O)) {
        ret.push(k)
      }
    }
    i++
  }
  return ret
}

const arr = [1, 2, 3, 4, 5, , 6, , 7]
const r = arr.filter(item => item % 2 === 0)
console.log(r)