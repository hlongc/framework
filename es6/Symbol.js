
const hello = Symbol('hello')
const world = Symbol('world')

const obj = {
  [hello]: 'hello',
  [world]: 'world',
  greet: '你好啊'
}

console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))
console.log(Reflect.ownKeys(obj))

// 元编程  Symbol暴露了11个方法
// 对象的Symbol.hasInstance属性，指向一个内部方法。使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
class Demo {
  static [Symbol.hasInstance](ins) {
    console.log('你猜猜是不是实例啊')
    return true
  }
}
const demo = new Demo
console.log(demo instanceof Demo)

const foo = {
  a: 1,
  [Symbol.toStringTag]: 'HLONGC'
}

console.log(foo + '') // [object HLONGC]