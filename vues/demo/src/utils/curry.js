const add = (a, b, c, d, e) => {
  return a + b + c + d + e
}

const curry = (fn, arr = []) => {
  return (...args) => {
    const len = fn.length
    if (arr.length < len) {
      arr = arr.concat(args)
      return curry(fn, arr)
    }
    return fn(...arr)
  }
}

const newAdd = curry(add)(1)(2)(3, 4, 5)
console.log(newAdd())
