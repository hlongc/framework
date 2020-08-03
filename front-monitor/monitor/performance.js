const processData = () => {
  const timing = performance.timing
  const data = {
    unloadPrev: timing.fetchStart - timing.navigationStart, // 上一个页面的卸载时间
    redirect: timing.redirectEnd - timing.redirectStart, // 上一个页面和当前页面同域的情况会有重定向时间，一般为0
    dnsResolve: timing.domainLookupEnd - timing.domainLookupStart, // DNS解析的时间
    tcpConnect: timing.connectEnd - timing.connectStart, // tcp连接时间
    duration: timing.responseEnd - timing.requestStart, // 请求开始到响应结束的时间
    ttfb: timing.responseStart - timing.navigationStart, // 从页面导航开始到收到首字节的时长
    domReady: timing.domInteractive - timing.domLoading, // dom加载时长
    whiteScreen: timing.domLoading - timing.navigationStart, // 白屏时间
    domResolve: timing.domComplete - timing.domLoading, // dom解析时间
    load: timing.loadEventEnd - timing.loadEventStart, // onload事件执行的时长
    total: timing.loadEventEnd - timing.navigationStart // 页面加载所有时间
  }
  return data
}

const load = cb => {
  let timer
  const check = () => {
    if (performance.timing.loadEventEnd) {
      clearTimeout(timer)
      cb()
    } else {
      timer = setTimeout(check, 100)
    }
  }
  // 要等到loadEventEnd的时候才去计算时间，否则loadEventEnd相关的计算会有问题
  window.addEventListener('load', check, false)
}

const domReady = cb => {
  let timer
  const check = () => {
    if (performance.timing.domInteractive) {
      clearTimeout(timer)
      cb()
    } else {
      timer = setTimeout(check, 100)
    }
  }
  window.addEventListener('DOMContentLoaded', check, false)
}

export default {
  init(cb) {
    domReady(() => { // 有可能页面资源太多，还没等到onload事件触发，用户就关闭浏览器了，就只能先处理dom加载完成的时间
      const data = processData()
      data.type = 'DOMContentLoaded'
      cb(data)
    })
    load(() => {
      const data = processData()
      data.type = 'loaded'
      cb(data)
    })
  }
}