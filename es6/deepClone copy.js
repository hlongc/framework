const symbolName = Symbol();
const obj1 = {
  objNumber: new Number(1),
  number: 1,
  objString: new String('ss'),
  string: 'stirng',
  objRegexp: new RegExp('\\w'),
  regexp: /w+/g,
  date: new Date(),
  function: function () { },
  array: [{ a: 1 }, 2],
  [symbolName]: 111
}
obj1.d = obj1;

function deepClone(target, cache = new WeakMap) {
  if (typeof target === 'function' || typeof target === 'symbol') {
    return target
  }
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (cache.has(target)) {
    return cache.get(target)
  }
  let clone
  const Constructor = target.constructor
  switch (Constructor) {
    case Date:
    case Number:
    case String:
      clone = new Constructor(target)
    case RegExp:
      clone = new RegExp(target.source, target.flags)
      clone.lastIndex = target.lastIndex
    case Array:
      clone = Array(target.length)
    case Object:
      clone = Object.create(Reflect.getPrototypeOf(target))
  }
  cache.set(target, clone)
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      if (i in target) {
        clone[i] = deepClone(target[i], cache)
      }
    }
  } else if (Constructor === Object) {
    Reflect.ownKeys(target).reduce((memo, key) => {
      memo[key] = deepClone(target[key], cache)
      return memo
    }, clone)
  }
  return clone
}

const obj2 = deepClone(obj1)
obj1.number = 2
console.log(obj2)
console.log(obj1 === obj2)
