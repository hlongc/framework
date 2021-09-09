function longSock(url, fn, intro = '') {
  let lockReconnect = false //避免重复连接
  let timeoutFlag = true
  let timeoutSet = null
  let reconectNum = 0
  const timeout = 30000 //超时重连间隔
  let ws
  function reconnect() {
    if (lockReconnect) return
    lockReconnect = true
    //没连接上会一直重连，设置延迟避免请求过多
    if (reconectNum < 3) {
      setTimeout(function() {
        timeoutFlag = true
        createWebSocket()
        console.info(`${intro}正在重连第${reconectNum + 1}次`)
        reconectNum++
        lockReconnect = false
      }, 5000) //这里设置重连间隔(ms)
    }
  }
  //心跳检测
  const heartCheck = {
    timeout: 5000, //毫秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function() {
      clearInterval(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      return this
    },
    start: function() {
      const self = this
      let count = 0
      this.timeoutObj = setInterval(() => {
        if (count < 3) {
          if (ws.readyState === 1) {
            ws.send('HeartBeat')
            console.info(`${intro}HeartBeat第${count + 1}次`)
          }
          count++
        } else {
          clearInterval(this.timeoutObj)
          count = 0
          if (ws.readyState === 0 && ws.readyState === 1) {
            ws.close()
          }
        }
      }, self.timeout)
    }
  }
  const createWebSocket = () => {
    console.info(`${intro}创建11`)
    timeoutSet = setTimeout(() => {
    if (timeoutFlag && reconectNum < 3) {
      console.info(`${intro}重连22`)
      reconectNum++
        createWebSocket()
      }
    }, timeout)
    ws = new WebSocket(url)

    ws.onopen = () => {
      reconectNum = 0
      timeoutFlag = false
      clearTimeout(timeoutSet)
      heartCheck.reset().start()
    }
    ws.onmessage = evt => {
      heartCheck.reset().start()
      // console.info(evt);
      if(evt.data === 'HeartBeat') return
      fn(evt, ws)
    }
    ws.onclose = e => {
      console.info(`${intro}关闭11`, e.code)
      if (e.code !== 1000) {
        timeoutFlag = false
        clearTimeout(timeoutSet)
        reconnect()
      } else {
        clearInterval(heartCheck.timeoutObj)
        clearTimeout(heartCheck.serverTimeoutObj)
      }
    }
    ws.onerror = function() {
      console.info(`${intro}错误11`)
      reconnect() //重连
    }
  }
  createWebSocket()
  return ws
}
export default longSock

if (nums.length === 1) return true
    // 有个客观事实：能到达当前点，那么一定能到达当前点之前的所有点
    let farthest = 0
    // 移动时最远只能走到倒数第二个元素，且不能超过当前最远的距离
    for (let i = 0; i < nums.length - 1 && i <= farthest; i++) {
        farthest = Math.max(farthest, i + nums[i]) // 尝试更新最远距离
        if (farthest >= nums.length - 1) { // 如果已经到达倒数第二个元素，直接返回成功
            return true
        }
    }
    // 走到这里说明没能到达终点
    return false