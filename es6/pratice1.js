Function.prototype.call = function(context, ...args) {
  context = context || global || window
  if (['boolean', 'string', 'number'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const ret = context[fn](...args)
  delete context[fn]
  return ret
}

Function.prototype.apply = function(context, args) {
  context = context || global || window
  if (['boolean', 'string', 'number'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const ret = context[fn](...args)
  delete context[fn]
  return ret
}

Object.create = function(Prototype) {
  function F() {}
  F.prototype = Prototype
  return new F
}

Function.prototype.bind = function(Othis, ...outerArgs) {
  const T = this
  function fBound(...innerArgs) {
    return T.call(this instanceof T ? this : Othis, ...outerArgs, ...innerArgs)
  }
  fBound.prototype = Object.create(T.prototype)
  return fBound
}

function _new(Con, ...args) {
  const obj = Object.create(Con.prototype)
  const ret = Con.apply(obj, args)
  return (typeof ret === 'object' && ret !== null) || typeof ret === 'function' ? ret : obj
}

function _instanceOf(obj, Con) {
  const prototype = Con.prototype
  let proto = obj.__proto__
  while (true) {
    if (prototype === null) return false
    if (proto === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__
  }
}

// const obj = { name: 'hlc' };
// const obj1 = { name: 'hlongc' };
// const obj2 = { name: 'hulongchao' };

// function foo(age) {
//   console.log(this.name, age);
// }

// foo.call(obj, 24);
// foo.apply(obj, [24]);
// foo
//   .bind(obj2)
//   .bind(obj1)
//   .bind(obj)(24);

// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }

// Point.prototype.print = function() {
//   console.log(this.x, this.y);
// };

// const P = Point.bind(obj, 2);
// const point = _new(P, 3);
// point.print();
// console.log(point instanceof P);
// console.log(point instanceof Point);
// console.log(_instanceOf(point, P));
// console.log(_instanceOf(point, Point));

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('循环引用')
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false // 是否已经被调用过resolve或者reject
    try {
      const then = x.then
      if (typeof then === 'function') {
        // 不用x.then执行是因为多次取值可能会造成报错
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject) // 有可能这个y值还是promise，进行递归解析
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else { // 可能只是数组或者普通对象
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else { // 为原始值
    resolve(x)
  }
}

function isPromise(x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    return typeof x.then === 'function' && typeof x.catch === 'function'
  }
  return false
}

class Promise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    const reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.rejectCallbacks.forEach(fn => fn())
      }
    }
    const resolve = value => {
      if (isPromise(value)) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.resolveCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  static race(list) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(list)) {
        if (!list.length) return resolve()
        list.forEach(item => {
          if (isPromise(item)) {
            item.then(resolve, reject)
          } else {
            resolve(item)
          }
        })
      } else {
        reject(new TypeError(`${typeof list} ${list} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }
    })
  }
  static all(list) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(list)) {
        if (!list.length) return resolve()
        const ret = []
        let i = 0
        const processData = (index, data) => {
          ret[index] = data
          if (++i === list.length) {
            resolve(ret)
          }
        }
        list.forEach((item, index) => {
          if (isPromise(item)) {
            item.then(k => processData(index, k), reject)
          } else {
            processData(index, item)
          }
        })
      } else {
        reject(new TypeError(`${typeof list} ${list} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }
    })
  }
  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }
  static reject(reason) {
    return new Promise((_resolve, reject) => reject(reason))
  }
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
    onrejected = typeof onrejected === 'function' ? onrejected : e => { throw e }
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
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectCallbacks.push(() => {
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
  finally(cb) {
    return this.then(
      y => Promise.resolve(cb()).then(() => y),
      r => Promise.resolve(cb()).then(() => { throw r }),
    )
  }
}

// Promise.resolve(123)
//   .finally(() => {
//     console.log('finally');
//   })
//   .then(x => {
//     console.log(x);
//   });

const p1 = new Promise((_resolve, reject) => {
  setTimeout(() => {
    reject(new Error('fail'))
  }, 3000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(p1)
  }, 1000)
})

const res = p2.then(console.log).catch(console.error)
console.log('res', res)

// const sleep = s => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(`sleep ${s}`);
//     }, s);
//   });
// };

// Promise.race([sleep(2000), 3, 4]).then(data => {
//   console.log(data);
// });

// Promise.all([sleep(1000), 3, 4]).then(data => {
//   console.log('data', data);
// });

// Promise.resolve(1)
//   .finally(() => {
//     console.log('finally')
//   })
//   .then(console.log)
//   .finally(() => {
//     console.log('嘻嘻')
//   })