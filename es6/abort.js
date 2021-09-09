const wrapper = p1 => {
  let abort
  const p2 = new Promise((resolve, reject) => {
    abort = reject
  })
  const p = Promise.race([p1, p2])
  p.abort = abort
  return p
}

const p = new Promise(resolve => {
  setTimeout(() => {
    resolve('我来了')
  }, 5000)
})

const w = wrapper(p)

w.then((v) => {
  console.log('resolve', v)
}).catch(e => {
  console.log('catch', e)
})

setTimeout(() => {
  w.abort('不要了')
}, 2000)



