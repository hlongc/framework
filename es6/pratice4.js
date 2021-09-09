Function.prototype.call = function(context, ...args) {
  context = context || globalThis
  if (['number', 'boolean', 'string', 'symbol'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const ret = context[fn](...args)
  delete context[fn]
  return ret
}

Function.prototype.apply = function(context, args) {
  context = context || globalThis
  if (['number', 'boolean', 'string', 'symbol'].includes(typeof context)) {
    context = new context.constructor(context)
  }
  const fn = Symbol()
  context[fn] = this
  const ret = context[fn](...args)
  delete context[fn]
  return ret
}

Object.create = function(prototype) {
  function F() {}
  F.prototype = prototype
  return new F()
}

Function.prototype.bind = function(context, ...outerArgs) {
  const F = this
  function fBound(...innerArgs) {
    return F.call(this instanceof F ? this : context, ...outerArgs, ...innerArgs)
  }
  fBound.prototype = Object.create(F.prototype)
  return fBound
}

function _new(F, ...args) {
  const obj = {}
  const ret = F.call(obj, ...args)
  return ((typeof ret === 'object' && ret !== null) || typeof ret === 'function') ? ret : obj
}

function _instanceOf(ins, Clazz) {
  let proto = Object.getPrototypeOf(ins)
  const prototype = Clazz.prototype
  while (true) {
    if (proto === null || prototype === null) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

// const obj = { name: 'call' };
// const obj1 = { name: 'apply' };
// const obj2 = { name: 'bind' };

// function foo(age) {
//   console.log(this.name, age);
// }

// foo.call(obj, 24); // call, 24
// foo.apply(obj1, [24]); // apply 24
// foo.bind(obj2).bind(obj1).bind(obj)(24); // bind, 24

// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }

// Point.prototype.print = function() {
//   console.log(this.x, this.y);
// };

// const P = Point.bind(obj, 2);
// const point = new P(3);
// point.print();
// console.log(point instanceof P);
// console.log(point instanceof Point);
// console.log(_instanceOf(point, P));
// console.log(_instanceOf(point, Point));




function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error('循环引用')
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
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

function isPromise(val) {
  if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
    return typeof val.then === 'function' && typeof val.catch === 'function'
  }
  return false
}

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.reason = undefined
    this.value = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn())
      }
    }

    const resolve = value => {
      if (isPromise(value)) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolveCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }
  static reject(reason) {
    return new Promise((_resolve, reject) => reject(reason))
  }
  static all(pendings) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(pendings)) {
        const ret = []
        let i = 0
        const processData = (index, data) => {
          ret[index] = data
          if (++i === pendings.length) {
            resolve(ret)
          }
        }
        pendings.forEach((item, index) => {
          if (isPromise(item)) {
            item.then(val => processData(index, val), reject)
          } else {
            processData(index, item)
          }
        })
      } else {
        reject(new TypeError(`${pendings} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }
    })
  }
  static race(pendings) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(pendings)) {
        pendings.forEach(item => {
          if (isPromise(item)) {
            item.then(resolve, reject)
          } else {
            resolve(item)
          }
        })
      } else {
        reject(new TypeError(`${pendings} is not iterable (cannot read property Symbol(Symbol.iterator))`))
      }
    })
  }

  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : r => r
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

  catch(reject) {
    return this.then(null, reject)
  }

  finally(cb) {
    return this.then(
      y => Promise.resolve(cb()).then(() => y),
      e => Promise.resolve(cb()).then(() => { throw e })
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

const sleep = s => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`sleep ${s}`);
    }, s);
  });
};

Promise.race([sleep(2000), 3, 4]).then(data => {
  console.log(data);
}).catch(console.log);

Promise.all([sleep(1000), 3, 4]).then(data => {
  console.log(data);
});