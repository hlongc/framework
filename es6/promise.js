const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>self'))
  }
  // 判断是否是promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called // 如果调用了成功就不能调用失败，调用了失败就不能调用成功
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          // 有可能解析出来的y还是一个promise,所以递归解析
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else { // 可能为数组 [1,2,3]
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else { // 普通值直接resolve
    resolve(x)
  }
}
const isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}
class Promise {
  constructor (executor) {
    this.value = undefined
    this.reason = undefined
    this.state = PENDING
    this.resolveCallbakList = []
    this.rejectCallbackList = []
    let resolve = (value) => {
      // 如果resolve了一个新的promise,那需要等待新的promise执行完毕
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.state === PENDING) {
        this.value = value
        this.state = FULFILLED
        this.resolveCallbakList.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason
        this.state = REJECTED
        this.rejectCallbackList.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  static resolve (data) {
    return new Promise(resolve => {
      resolve(data)
    })
  }
  static reject (data) {
    return new Promise((resolve, reject) => {
      reject(data)
    })
  }
  static all (promises) {
    return new Promise((resolve, reject) => {
      let arr = []
      let i = 0
      const processData = (index, data) => {
        arr[index] = data
        if (++i === promises.length) {
          resolve(arr)
        }
      }

      promises.forEach((item, index) => {
        if (isPromise(item)) {
          item.then(data => processData(index, data), reject)
        } else {
          processData(index, item)
        }
      })
    })
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) resolve()
      promises.forEach(p => {
        if (isPromise(p)) {
          p.then(resolve, reject)
        } else {
          resolve(p)
        }
      })
    })
  }
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    // 为了实现链式调用，每次都返回一个新的promise
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 有可能在executor中写出setTimeout(() => { resolve('xx') }, 1000)的代码
      // 此时状态还是pending,那么就将两个函数存起来，等到resolve或者reject的时候再调用
      if (this.state === PENDING) {
        this.resolveCallbakList.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.rejectCallbackList.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  catch (errCallback) {
    return this.then(null, errCallback)
  }
  finally(callback) {
    return this.then(
      r => Promise.resolve(callback()).then(() => r),
      e => Promise.resolve(callback()).then(() => { throw e }),
    )
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

Promise.resolve(1).finally(() => {
  console.log('finally')
}).then(r => {
  console.log(r)
})

Promise.race([1, 2, Promise.resolve('嘻嘻')]).then(res => {
  console.log(res)
})


// export default Promise

