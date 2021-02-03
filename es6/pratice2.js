Function.prototype.call = function(context, ...args) {
  context = context || global || window
  if (['number', 'boolean', 'string'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const key = Symbol()
  context[key] = this
  const ret = context[key](...args)
  delete context[key]
  return ret
}

Function.prototype.apply = function(context, args) {
  context = context || global || window
  if (['number', 'boolean', 'string'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const key = Symbol()
  context[key] = this
  const ret = context[key](...args)
  delete context[key]
  return ret
}

Object.create = function(proto) {
  function F() {}
  F.prototype = proto
  return new F
}

Function.prototype.bind = function(context, ...outerArgs) {
  const T = this
  function fBound(...innerArgs) {
    return T.apply(this instanceof T ? this : context, [...outerArgs, ...innerArgs])
  }
  fBound.prototype = Object.create(T.prototype)
  return fBound
}

function _new(Clazz, ...args) {
  const obj = Object.create(Clazz.prototype)
  const ret = Clazz.apply(obj, args)
  return (typeof ret === 'object' && ret !== null) || (typeof ret === 'function') ? ret : obj
}

function _instanceOf(ins, Clazz) {
  let proto = ins.__proto__
  const prototype = Clazz.prototype
  while(true) {
    if (!proto || !prototype) return false
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

function isPromise(val) {
  if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
    return typeof val.then === 'function' && typeof val.catch === 'function'
  }
  return false
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('循环引用')
  }
  if (((typeof x === 'object' && x !== null) || typeof x === 'function')) {
    let called
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}


const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = reason
        this.rejectCallbacks.forEach(fn => fn())
      }
    }
    const resolve = val => {
      if (val instanceof Promise) {
        return val.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = val
        this.resolveCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(val) {
    return new Promise(resolve => resolve(val))
  }

  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }

  static race(list) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(list)) {
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
        const ret = []
        let i = 0
        const processData = (data, index) => {
          ret[index] = data
          if (++i === list.length) {
            resolve(ret)
          }
        }
        list.forEach((item, idx) => {
          if (isPromise(item)) {
            item.then(val => processData(val, idx), reject)
          } else {
            processData(item, idx)
          }
        })
      } else {
        reject(new TypeError(`${typeof list} ${list} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }
    })
  }

  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : y => y
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
    return this.then((_, fn))
  }

  finally(cb) {
    return this.then(
      y => Promise.resolve(cb()).then(() => y),
      r => Promise.resolve(cb()).then(() => { throw r })
    )
  }
}

Promise.resolve(123)
  .finally(() => {
    console.log('finally');
  })
  .then(x => {
    console.log(x);
  });

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
