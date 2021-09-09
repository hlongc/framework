
function test1() {
  return new Promise((reoslve, reject) => {
    setTimeout(() => {
      reoslve('test1')
    }, 2000)
  })
}


function test2() {
  return new Promise((reoslve, reject) => {
    setTimeout(() => {
      reject('test2')
    }, 2500)
  })
}


function test3() {
  return new Promise((reoslve, reject) => {
    setTimeout(() => {
      reoslve('test3')
    }, 2500)
  })
}

Promise.race([test1(), test2(), test3()]).then(x => {
  console.log('success', x)
}).catch(r => {
  console.log('fail', r)
})