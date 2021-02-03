Array.prototype.every = function(cb) {
  const O = Object(this)
  const len = O.length
  let T
  if (arguments.length > 1) {
    T = arguments[1]
  }
  let i = 0
  while (i < len) {
    const k = O[i]
    if (i in O) {
      const r = cb.call(T, k, i, O)
      if (!r) return false
    }
    i++
  }
  return true
}

const arr = [1, 2, , 3, 4]
const r = arr.some(item => item > 0)
console.log(r)