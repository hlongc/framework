/**
1、首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象
2、把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象
3、如果构造函数返回一个非基本类型的值，则返回这个值，否则返回上面创建的对象 
 */
// function _new(fn, ...arg) {
//   const obj = Object.create(fn.prototype);
//   const ret = fn.apply(obj, arg);
//   return ret instanceof Object ? ret : obj;
// }

// function __new(Cons, ...args) {
//   const obj = Object.create(Cons.prototype)
//   const ret = Cons.apply(obj, args)
//   return Object.prototype.toString.call(ret) === '[Object Object]' ? ret : obj
// }


// function Animal(name, color) {
//   this.name = name
//   this.color = color
// }

// Animal.prototype.greet = function() {
//   console.log(`我就是我，颜色不一样的烟火: ${this.color}`)
// }

// function _new(Cons, ...args) {
//   const obj = Object.create(Cons.prototype)
//   const ret = Cons.apply(obj, args)
//   return typeof ret === 'object' && ret !== null ? ret : obj
// }

// const animal = _new (Animal, 'dog', 'red')
// animal.greet()




// 请根据代码推测控制台依次输出什么？

function main() {
  var startTime = Date.now()
  
  setInterval(() => {
    console.log(1, Date.now() - startTime)
  }, 900)
  
  while(Date.now() - startTime < 1000) {

  }
  
  setTimeout(() => {
    console.log(2, Date.now() - startTime)
  }, 0)
  
  console.log(3, Date.now() - startTime)
}
// 3, 1000
// 1, 1001
// 2, 1002
// 1, 1900
main()
