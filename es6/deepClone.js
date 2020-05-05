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

function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (typeof obj === 'function') return obj // 不拷贝函数，直接返回
  if (cache.has(obj)) return cache.get(obj) // 解决循环引用
  const Constructor = obj.constructor // 拿到当前对象的构造函数
  let ins
  switch(Constructor) {
    case Boolean:
    case Date:
      return new Date(+obj)
    case Number:
    case String:
    case RegExp:
      return new Constructor(obj)
    default:
      ins = new Constructor()
      cache.set(obj, ins) // 建立映射关系
  }
  if (Array.isArray(ins)) {
    obj.forEach(item => {
      ins.push(deepClone(item, cache))
    })
    return ins
  } else {
    // 解决取不到symbol的情况
    return [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].reduce((memo, key) => {
      memo[key] = deepClone(obj[key], cache)
      return memo
    }, Object.create(obj.constructor.prototype))
  }
}

const obj2 = deepClone(obj1)
obj1.number = 2
console.log(obj2)

