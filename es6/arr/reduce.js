Array.prototype.reduce = function(cb, initialValue) {
  const O = Object(this)
  const length = O.length
  if (!length) {
    if (arguments.length === 1) {
      throw new Error('初始值不能为空')
    } else {
      return arguments[1]
    }
  }
  let i = 0, hasInit = arguments.length > 1, done = false
  while (i < length) {
    if (i in O) { // 跳过空元素
      if (!done) { // 还没有进行初始化
        done = true
        if (!hasInit) {
          initialValue = O[i++]
          continue
        }
      }
      initialValue = cb(initialValue, O[i], i, O)
    }
    i++
  }
  return initialValue
}

const arr = [, 1, , 3, 4,]

const ret = arr.reduce((memo, cur, index, arr) => {
  console.log(index, arr)
  return memo + cur
})

console.log(ret)