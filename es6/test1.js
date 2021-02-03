
// 写一个function，返回值为[[0,1],[3,4]]，这个数组中所有两项之和为6的下标数组

function find() {
  const arr = [1, 5, 7, 2, 4]
  const target = 6
  const result = []
  const map = new Map()
  arr.forEach((item, index) => { map.set(item, index) })
  arr.forEach((item, index) => {
    const ret = target - item
    if (map.get(ret) !== undefined) {
      result.push([index, map.get(ret)])
      map.delete(item)
      map.delete(ret)
    }
  })
  return result
}
find()


// const result = []
// let tmp = []
// for (let i = 1; i < arr.length; i++) {
//   if (arr[i] <= 6) {
//     tmp.push(arr[i])
//   }
// }

// const arr = [
//   { key: 1 },
//   { key: 2 },
//   { key: 3 },
//   { key: 1 },
//   { key: 3 },
//   { key: 2 },
//   { key: 2 },
//   { key: 3 },
//   { key: 1 }
// ]

// function format(arr) {
//   const tmp = arr.reduce((memo, cur) => {
//     if (memo[cur.key]) {
//       memo[cur.key].push(cur)
//     } else {
//       memo[cur.key] = [cur]
//     }
//     return memo
//   }, {})
//   const res = []
//   for (const key in tmp) {
//     res.push(tmp[key])
//   }
//   return res
// }

// console.log(format(arr))

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
// }

// console.log('script start');

// setTimeout(function() {
//   console.log('setTimeout');
// }, 0)

// async1();

// new Promise(function(resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function() {
//   console.log('promise2');
// });
// console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// function Foo() {
//   getName = function () { console.log(1); };
//   return this;
// }
// Foo.getName = function () { console.log(2); };
// Foo.prototype.getName = function () { console.log(3); };
// var getName = function () { console.log(4); };
// function getName() { console.log(5); }

// //请写出以下输出结果：
// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 1
// getName(); // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3


// function foo(a) {
//   var a = function() {
//     console.log(2)
//   }
//   console.log(a)
// }
// foo(1)

// const promise = new Promise(resolve => {
//   const err = new Error('我是错误啊')
//   throw err
// })

// promise.then(data => {
//   console.log('data', data)
// }).catch(e => {
//   console.log('error', e)
// })

/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a,b,callback) {
  setTimeout(function(){
   callback(null, a+b)
  },1000)
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
async function sum(...rest) {
  // 请在此处完善代码
  // let result = rest.shift()
  // for (const cur of rest) {
  //   result = await new Promise(resolve => {
  //     asyncAdd(result, cur, (_, r) => {
  //       resolve(r)
  //     })
  //   })
  // }
  // return result
  if (rest.length <= 1) {
    return rest[0] || 0
  }
  const promises = []
  for (let i = 0; i < rest.length; i += 2) {
    promises.push(
      new Promise(resolve => {
        if (rest[i + 1] === undefined) {
          resolve(rest[i])
        } else {
          asyncAdd(rest[i], rest[i + 1], (_, r) => {
            resolve(r)
          })
        }
      })
    )
  }
  const result = await Promise.all(promises)
  return await sum(...result)
}

let start = Date.now()
sum(1, 2, 3, 4, 5, 6).then(res => {
  // 请保证在调用sum方法之后，返回结果21
  console.log(res)
  console.log(`程序执行共耗时: ${Date.now() - start}`)
})
