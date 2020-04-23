export function debounce(func, wait, immediate) {
  let timer
  return function() {
    clearTimeout(timer)
    if (immediate) {
      if (!timer) func.apply(this, arguments)
    }
    timer = setTimeout(() => {
      console.log(timer)
      func.apply(this, arguments)
      timer = null
    }, wait)
  }
}

export function throttle(func, wait, option = {}) {
  let previous = 0
  let context
  let args
  let timer
  return function() {
    context = this
    args = arguments
    const now = Date.now()
    const later = () => {
      func.apply(context, args)
      previous = now
    }
    const duration = now - previous // 当前间隔上一次执行的时间
    if (duration > wait) { // 如果间隔时间大于等待时间了，就执行
      if (timer) { // 如果之前有未执行的timer，直接清除
        clearTimeout(timer)
        timer = null
      }
      later()
    } else {
      if (!timer && option.trailing) { // 如果想执行最后一次，那就延迟执行,比如wait = 1秒，在1秒执行了一次，然后在1.2秒又触发了，此时还间隔不到一秒，希望也执行这一次的话
        timer = setTimeout(() => {
          later()
        }, wait - duration)
      }
    }
  }
}