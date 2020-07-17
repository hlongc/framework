Object.create = function(prototype) {
  function F() {}
  F.prototype = prototype
  return new F()
}

Function.prototype.apply = function(context, args) {
  context = context || global || window
  if (['string', 'number', 'boolean'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.call = function(context, ...args) {
  context = context || global || window
  if (['string', 'number', 'boolean'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.bind = function(context, ...innerArgs) {
  const F = this
  function fBound(...outerArgs) {
    return F.call(this instanceof F ? this : context, ...innerArgs, ...outerArgs)
  }
  fBound.prototype = Object.create(F.prototype)
  return fBound
}

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'


const isType = (val, type) => {
  return Object.prototype.toString.call(val).slice(8, -1) === type
}

const isPromise = x => {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    return typeof x.then === 'function' && typeof x.catch === 'function'
  }
  return false
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    throw new Error('循环引用')
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let call
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, r => {
          if (call) return
          call = true
          resolvePromise(promise2, r, resolve, reject)
        }, r => {
          if (call) return
          call = true
          reject(r)
        })
      } else {
        if (call) return
        call = true
        resolve(x)
      }
    } catch (e) {
      if (call) return
      call = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbackList = []
    this.rejectCallbackList = []

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbackList.forEach(fn => fn())
      }
    }

    const resolve = data => {
      if (isPromise(data)) {
        return data.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = data
        this.resolveCallbackList.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(data) {
    return new Promise(resolve => resolve(data))
  }

  static reject(data) {
    return new Promise((_resolve, reject) => reject(data))
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) return resolve()
      let i = 0
      const result = []
      const processData = (item, index) => {
        result[index] = item
        if (++i === promises.length) return resolve(result)
      }

      promises.forEach((val, index) => {
        if (isPromise(val)) {
          val.then(x => processData(x, index), reject)
        } else {
          processData(val, index)
        }
      })
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) return resolve()
      promises.forEach(val => {
        if (isPromise(val)) {
          val.then(resolve, reject)
        } else {
          resolve(val)
        }
      })
    })
  }

  then(onfulfilled, onrejected) {
    onfulfilled = isType(onfulfilled, 'Function') ? onfulfilled : x => x
    onrejected = isType(onrejected, 'Function') ? onrejected : e => { throw e }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === PENDING) {
        this.resolveCallbackList.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.rejectCallbackList.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })

    return promise2
  }

  catch(fn) {
    return this.then(null, fn)
  }

  finally(fn) {
    return this.then(
      x => Promise.resolve(fn()).then(() => x),
      e => Promise.resolve(fn()).then(() => { throw e })
    )
  }
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
