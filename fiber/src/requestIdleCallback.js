// 模拟requestIdleCallback
window.requestIdleCallback = function (callback, options = {}) {
  // time 该参数与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。也就是每一帧开始的时间
  // 页面导航开始时间 + 页面渲染完成到现在的相对时间 ≈ 现在的时间
  // performance.timing.navigationStart + performance.now() ≈ Date.now()
  requestAnimationFrame(frameStartTime => {
    let expireTime // 当前帧的结束时间

    const channel = new MessageChannel()
    channel.port2.onmessage = function (event) {
      if (callback) {
        const current = performance.now()
        const timeRemaining = () => expireTime - current
        
        const didTimeout = expireTime > current
        if (timeRemaining() > 0 || didTimeout) {
          const deadLine = { timeRemaining, didTimeout }
          callback(deadLine)
        }
      }
    }
    // 当前回调超时时间
    expireTime = frameStartTime + (options.timeout || 0)
    // 创建一个宏任务
    channel.port1.postMessage('')
  })
}