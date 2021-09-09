

function sleep(duration, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('resolve ' + duration)
      } else {
        reject('reject ' + duration)
      }
    }, duration)
  })
}

// Promise.all([sleep(1000), sleep(2000), sleep(500)]).then(d => {
//   console.log('Promise.all1', d)
// })

// Promise.all([sleep(1000, false), sleep(2000), sleep(500)]).then(d => {
//   console.log('Promise.all2', d)
// }).catch(e => {
//   console.log('Promise.all2', e)
// })

// Promise.race([sleep(1000), sleep(2000), sleep(500)]).then(d => {
//   console.log('Promise.race1', d)
// })

// Promise.race([sleep(1000), sleep(2000, false), sleep(500)]).then(d => {
//   console.log('Promise.race2', d)
// }).catch(e => {
//   console.log('Promise.race23', e)
// })

Promise.allSettled([sleep(1000, false), sleep(2000, false), sleep(500, false)]).then(d => {
  console.log('Promise.allSettled1', d)
}).catch(e => {
  console.log('Promise.allSettled2', e)
})
