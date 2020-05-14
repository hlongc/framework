
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


function foo(a) {
  var a = function() {
    console.log(2)
  }
  console.log(a)
}
foo(1)

