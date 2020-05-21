// !(function(prototype) {
//   Object.create = function(prototype) {
//     function F() {}
//     F.prototype = prototype
//     return new F()
//   }
//   prototype.bind = function(oThis, ...outerArgs) {
//     const Func = this // 缓存函数
//     function fBound(...innerArgs) {
//       // 如果是用new来调用这个方法，说明是构造函数，否则是普通函数，构造函数的话，传入的oThis失效
//       return Func.call(this instanceof Func ? this : oThis, ...outerArgs, ...innerArgs)
//     }
//     fBound.prototype = Object.create(Func.prototype) // 改变原型链，指向之前的构造函数
//     return fBound
//   }
// })(Function.prototype)


Object.create = function(prototype) {
  function F() {}
  F.prototype = prototype
  return new F()
}

Function.prototype.bind = function(Othis, ...outerArgs) {
  const F = this
  function fBound(...innerArgs) {
    return F.apply(this instanceof F ? this : Othis, [...outerArgs, ...innerArgs])
  }
  fBound.prototype = Object.create(F.prototype)
  return fBound
}

function foo() {
  console.log('foo')
}
function bar() {
  console.log('bar')
}

const obj = { name: 'xxx' }

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.print = function() {
  console.log(this.x + ',' + this.y)
}

const Ypoint = Point.bind(obj, 1)
const point = new Ypoint(2)
console.log(point)
point.print()
console.log(point instanceof Point)
console.log(point instanceof Ypoint)

