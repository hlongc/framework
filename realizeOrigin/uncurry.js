function uncurry(fn) {
  return function(context, ...args) {
    return Reflect.apply(fn, context, args)
    // return Function.prototype.apply.call(fn, context, args)
  }
}

const join = uncurry(Array.prototype.join)
const res = join([1, 2, 3], ':')
console.log(res)
