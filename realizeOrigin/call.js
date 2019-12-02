// call有两个作用 1、改变this指向 2、执行当前函数
function fn() {
  console.log(this)
}

function fn1() {
  console.log('fn1')
}
var a = 2
const obj = { a: 1 }
function demo() {
  console.log(this.a, ...arguments)
}

Function.prototype.myCall = function(context) {
  context = context ? Object(context) : global
  context.fn = this
  const args = []
  let index = 0
  while(++index < arguments.length) {
    args.push('arguments[' + index + ']')
  }
  // 在执行eval的时这里 args 会自动调用 Array.toString() 这个方法
  const res = eval('context.fn(' + args + ')')
  delete context.fn
  return res
}
fn.myCall.myCall.myCall.myCall.myCall(fn1) // 多次call，直到最后一次call之前都是查找call方法，只有最后一次call方法是调用并且改变this再执行函数
demo.myCall(obj, 'hello', 'world')