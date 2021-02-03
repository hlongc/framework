// Promise.resolve('success')
//   .then(r => {
//     console.log('then1', r)
//   })
//   .then(re => {
//     console.log('then2', re)
//   })
//   .then(ret => {
//     console.log('then3', ret)
//   })

// Promise.reject('failure')
//   .catch(r => {
//     console.log('catch1', r)
//   })
//   .catch(re => {
//     console.log('catch2', re)
//   })
//   .catch(ret => {
//     console.log('catch3', ret)
//   })

// Promise
// .resolve('1')
// .then((res) => {
//   console.log(res);
// }).finally(() => {
//   console.log('finally1');
// });

// Promise
// .resolve('2')
// .finally(() => {
//   console.log('finally2');
//   return '这里是 finally2';
// }).then((res) => {
//   console.log('finally2 后面的 then 函数', res);
// })

// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }

// async function async2() {
//   console.log('async2');
// }

// console.log('script start');

// setTimeout(() => {
//   console.log('settimeout');
// }, 0);

// async1();

// new Promise((resolve) => {
//   console.log('promise1');
//   resolve();
// }).then((res) => {
//   console.log('promise2');
// })

// console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// settimeout


// function oneToThree() {
//   const arr = [1, 2, 3]
//   arr.reduce((memo, cur) => {
//     return memo.then(() => {
//       return new Promise(resolve => {
//         setTimeout(() => {
//           console.log(cur)
//           resolve()
//         }, 1000)
//       })
//     })
//   }, Promise.resolve())
// }

async function oneToThree() {
  const arr = [1, 2, 3]
  for (const item of arr) {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log(item)
        resolve()
      }, 1000)
    })
  }
}

oneToThree()

const xhr = new XMLHttpRequest()
xhr.open('get', '/test')
xhr.onreadystatechange = function(e) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText || xhr.response)
  }
}
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send()