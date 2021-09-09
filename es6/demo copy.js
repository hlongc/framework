// Function.prototype.call = function(context, ...args) {
//   context = (context === null || context === undefined) ? globalThis : context
//   if (['string', 'number', 'boolean', 'symbol'].includes(typeof context)) {
//     context = new context.constructor(context)
//   }
//   const key = Symbol()
//   context[key] = this
//   const ret = context[key](...args)
//   delete context[key]
//   return ret
// }


// Function.prototype.apply = function(context, args) {
//   context = (context === null || context === undefined) ? globalThis : context
//   if (['string', 'number', 'boolean', 'symbol'].includes(typeof context)) {
//     context = new context.constructor(context)
//   }
//   const key = Symbol()
//   context[key] = this
//   const ret = context[key](...args)
//   delete context[key]
//   return ret
// }

// function _new(Constructor, ...args) {
//   const obj = Object.create(Constructor.prototype)
//   const ret = Constructor.call(obj, ...args)
//   return ((typeof ret === 'object' && ret !== null) || typeof ret === 'function') ? ret : obj
// }

// Object.create = function(prototype) {
//   function F() {}
//   F.prototype = prototype
//   return new F
// }

// Function.prototype.bind = function(Othis, ...outerArgs) {
//   const F = this
//   function fBound(...innerArgs) {
//     return F.call(this instanceof F ? this : Othis, ...outerArgs, ...innerArgs)
//   }
//   fBound.prototype = Object.create(F.prototype)
//   return fBound
// }

// function _instanceof(inst, Con) {
//   let proto = Reflect.getPrototypeOf(inst)
//   let prototype = Con.prototype
//   while (true) {
//     if (!proto || !prototype) return false
//     if (proto === prototype) return true
//     proto = Reflect.getPrototypeOf(proto)
//   }
// }

// // const obj = { name: 'hlc' };
// // const obj1 = { name: 'hlongc' };
// // const obj2 = { name: 'hulongchao' };

// // function foo(age) {
// //   console.log(this.name, age);
// // }

// // foo.call(obj, 24);
// // foo.apply(obj, [24]);
// // foo
// //   .bind(obj2)
// //   .bind(obj1)
// //   .bind(obj)(24);

// // function Point(x, y) {
// //   this.x = x;
// //   this.y = y;
// // }

// // Point.prototype.print = function() {
// //   console.log(this.x, this.y);
// // };

// // const P = Point.bind(obj, 2);
// // const point = _new(P, 3);
// // point.print();
// // console.log(point instanceof P);
// // console.log(point instanceof Point);
// // console.log(_instanceof(point, P));
// // console.log(_instanceof(point, Point));

// const PENDING = 'PENDING'
// const FULFILLED = 'FULFILLED'
// const REJECTED = 'REJECTED'

// const resolvePromise = (promise2, x, resolve, reject) => {
//   if (promise2 === x) {
//     throw new ReferenceError('循环引用')
//   }
//   if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
//     let called
//     try {
//       const then = x.then
//       if (typeof then === 'function') {
//         then.call(
//           x,
//           y => {
//             if (called) return
//             called = true
//             resolvePromise(promise2, y, resolve, reject)
//           },
//           r => {
//             if (called) return
//             called = true
//             reject(r)
//           }
//         )
//       } else {
//         if (called) return
//         called = true
//         resolve(x)
//       }
//     } catch (e) {
//       if (called) return
//       called = true
//       reject(e)
//     }
//   } else {
//     resolve(x)
//   }
// }

// const isPromise = val => {
//   if ((typeof val === 'object' && val !== null) || typeof val === 'function') {
//     return typeof val.then === 'function' && typeof val.catch === 'function'
//   } else {
//     return false
//   }
// }

// class Promise {
//   constructor(executor) {
//     this.status = PENDING
//     this.value = undefined
//     this.reason = undefined
//     this.resolveCallbacks = []
//     this.rejectCallbacks = []

//     const reject = reason => {
//       if (this.status === PENDING) {
//         this.status = REJECTED
//         this.reason = reason
//         this.rejectCallbacks.forEach(cb => cb())
//       }
//     }

//     const resolve = value => {
//       if (isPromise(value)) {
//         return value.then(resolve, reject)
//       }
//       if (this.status === PENDING) {
//         this.status = FULFILLED
//         this.value = value
//         this.resolveCallbacks.forEach(cb => cb())
//       }
//     }

//     try {
//       executor(resolve, reject)
//     } catch (e) {
//       reject(e)
//     }
//   }
//   static all(promises) {
//     return new Promise((resolve, reject) => {
//       if (Array.isArray(promises)) {
//         const ret = [], len = promises.length
//         let j = 0
//         const processData = (index, data) => {
//           ret[index] = data
//           if (++j === len) {
//             resolve(ret)
//           }
//         }
//         for (let i = 0; i < len; i++) {
//           if (isPromise(promises[i])) {
//             promises[i].then(value => processData(i, value), reject)
//           } else {
//             processData(i, promises[i])
//           }
//         }
//       } else {
//         reject(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator))`))
//       }
//     })
//   }
//   static race(promises) {
//     return new Promise((resolve, reject) => {
//       if (Array.isArray(promises)) {
//         for (let i = 0, len = promises.length; i < len; i++) {
//           if (isPromise(promises[i])) {
//             promises[i].then(resolve, reject)
//           } else {
//             resolve(promises[i])
//           }
//         }
//       } else {
//         reject(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator))`))
//       }
//     })
//   }
//   static resolve(value) {
//     return new Promise(resolve => resolve(value))
//   }
//   static reject(reason) {
//     return new Promise((_, reject) => reject(reason))
//   }
//   then(onfulfilled, onrejected) {
//     onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : y => y
//     onrejected = typeof onrejected === 'function' ? onrejected : e => { throw e }
//     const promise2 = new Promise((resolve, reject) => {
//       if (this.status === FULFILLED) {
//         setTimeout(() => {
//           try {
//             const x = onfulfilled(this.value)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       }
//       if (this.status === REJECTED) {
//         setTimeout(() => {
//           try {
//             const x = onrejected(this.reason)
//             resolvePromise(promise2, x, resolve, reject)
//           } catch (e) {
//             reject(e)
//           }
//         })
//       }
//       if (this.status === PENDING) {
//         this.resolveCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               const x = onfulfilled(this.value)
//               resolvePromise(promise2, x, resolve, reject)
//             } catch (e) {
//               reject(e)
//             }
//           })
//         })
//         this.rejectCallbacks.push(() => {
//           setTimeout(() => {
//             try {
//               const x = onrejected(this.reason)
//               resolvePromise(promise2, x, resolve, reject)
//             } catch (e) {
//               reject(e)
//             }
//           })
//         })
//       }
//     })
//     return promise2
//   }
//   catch(cb) {
//     return this.then(null, cb)
//   }
//   finally(cb) {
//     return this.then(
//       y => Promise.resolve(cb()).then(() => y),
//       e => Promise.resolve(cb()).then(() => { throw e })
//     )
//   }
// }

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

// Promise.resolve(Promise.resolve('1111')).then(console.log)


console.log(`
script start
bar start
foo
promise executor
script end
bar end
promise then
setTimeout
`)
async function foo() {
  console.log('foo')
}
async function bar() {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor')
  resolve();
}).then(function () {
  console.log('promise then')
})
console.log('script end')