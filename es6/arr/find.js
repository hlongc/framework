Array.prototype.find = function(cb, othis) {
  const O = Object(this)
  for (let i = 0; i < O.length; i++) {
    const ret = cb.call(othis, O[i], i, O)
    if (!!ret) {
      return O[i]
    }
  }
}

const arr = [1, , , 3, 4, , 5]
arr.find(item => {
  console.log(item)
  return item > 3
})