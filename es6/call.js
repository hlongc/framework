// call的性能比apply更好，apply基于call来实现的
Function.prototype.apply = function(obj, args) {
  let context = obj || global || window
  const thisType = typeof obj
  if (['string', 'number', 'boolean'].includes(thisType)) {
    context = obj.constructor(obj)
  }
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.call = function(obj, ...args) {
  let context = obj || global || window
  const thisType = typeof obj
  if (['string', 'number', 'boolean'].includes(thisType)) {
    context = obj.constructor(obj)
  }
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}


function a(age) {
  console.log(this.name + ' ' + age)
}

const obj = { name: 'hlc' }
a.call(obj, 24)

function foo() { console.log('foo') }
function bar() { console.log('bar') }
foo.call.call.call(bar) // 相当于调用call.call(bar) => bar.call() => bar()

const obj1 = { name: 'obj1' }
const obj2 = { name: 'obj2' }
const obj3 = { name: 'obj3' }
const obj4 = { name: 'obj4' }
const obj5 = { name: 'obj5' }
const obj6 = { name: 'obj6' }

function test() {
  console.log(this.name)
}

test.bind(obj1).bind(obj2).bind(obj3).bind(obj4).bind(obj5).bind(obj6)()