Object.defineProperty(Object, 'assign', {
  value: function(target, args) {
    if (typeof target !== 'object' || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    const to = Object(target)
    for (let i = 1; i < arguments.length; i++) {
      const nextSource = arguments[i]
      if (nextSource === null || nextSource === undefined) {
        continue
      }
      Reflect.ownKeys(nextSource).forEach(key => {
        to[key] = nextSource[key]
      })
    }
    return to
  },
  writable: true,
  configurable: true
})


const a = { a: 1 }
const b = { b: 1 }
const c = { c: 1 }

const d = Object.assign(a, b, c)
console.log(a, d, a === d)
console.log(a === Object(a))