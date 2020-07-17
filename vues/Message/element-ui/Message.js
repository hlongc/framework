import Vue from 'vue'
import MessageComponent from './Message.vue'

const getInstance = () => {
  const vm = new Vue({
    render: h => h(MessageComponent)
  }).$mount() // 挂载到内存
  document.body.appendChild(vm.$el) // 再添加到dom中
  const realIns = vm.$children[0]
  return {
    success(options) {
      return realIns.add(options, 'success')
    },
    error(options) {
      return realIns.add(options, 'error')
    },
    warning(options) {
      return realIns.add(options, 'warning')
    }
  }
}
// 防止用户多次use，采用单例模式，只产生一个实例
let _ins
const getSingle = () => {
  if (!_ins) _ins = getInstance()
  return _ins
}

const Message = {
  success(option) {
    return getSingle().success(option)
  },
  warning(option) {
    return getSingle().warning(option)
  },
  error(option) {
    return getSingle().error(option)
  }
}

let _Vue
export default {
  install(Vue) {
    if (!_Vue) {
      _Vue = Vue
      const $message = {}
      Object.keys(Message).forEach(methodName => {
        $message[methodName] = Message[methodName]
      })
      Vue.prototype.$message = $message
    }
  }
}

export {
  Message
}