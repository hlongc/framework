// 0. 可以使用搜索引擎，但不能代考，也不能咨询其他人。请诚实守信
// 1. 请实现如下函数
// function sleep(timeout: number): Promise {
// throw new Error('Not implemented');
// }
// 2. 请修改上述函数的接口和实现，让该函数支持取消。也就是说，可以在sleep没有结束前，promise提前resolve
// 以下两题非必答
// 3. 请为2中实现的函数提供几组单元测试。示意即可，不需要使用什么单元测试框架类库
// 4. 如何证明2中实现的函数不会内存泄露



function sleep(timeout) {
  let timer
  let resolvee
  const promise = new Promise((resolve, reject) => {
    resolvee = resolve
    timer = setTimeout(() => {
      timer = null
      promise.cancelSleep()
    }, timeout)
  })
  promise.cancelSleep = function() {
    clearTimeout(timer)
    resolvee('成功')
    resolvee = null
  }
  return promise
}

console.time('sleep')
console.log(process.memoryUsage())
const r = sleep(10000)
// r.cancelSleep()
r.then(data => {
  console.timeEnd('sleep')
  console.log(data)
  console.log(process.memoryUsage())
})
console.log(process.memoryUsage())

