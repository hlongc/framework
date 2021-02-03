Array.prototype.map = function(cb) {
  let T
  if (arguments.length > 1) {
    T = arguments[1]
  }
  const O = Object(this)
  const len = O.length
  const ret = Array(len)
  let i = 0
  while (i < len) {
    const k = O[i]
    if (i in O) { // 跳过未定义的元素和已经被删除的元素
      ret[i] = cb.call(T, k, i, O)
    }
    i++
  }
  return ret
}

const arr = [1, 2, , 3]
const r = arr.map(item => 2 * item)
console.log(r)