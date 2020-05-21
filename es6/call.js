// call的性能比apply更好，apply基于call来实现的
Function.prototype.apply = function(obj, args) {
  let context = obj
  if (!obj) context = global || window
  const type = typeof obj
  if (['string', 'number', 'boolean'].includes(type)) context = obj.constructor(obj)
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.call = function(obj, ...args) {
  let context = obj
  if (!obj) context = global || window
  const type = typeof obj
  if (['string', 'number', 'boolean'].includes(type)) context = obj.constructor(obj)
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
// foo.apply.apply.apply(bar)
foo.call(bar)


Promise.resolve(1).finally(() => {
  console.log('嘻嘻')
}).then(data => {
  console.log(data)
})