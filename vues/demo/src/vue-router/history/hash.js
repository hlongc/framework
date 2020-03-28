import History from './base'

function ensureSlash() {
  if (window.location.hash) return
  window.location.hash = '/'
}

export default class HashHistory extends History {
  constructor(router) {
    super(router)
    this.router = router

    ensureSlash() // hash第一次默认赋值
  }
  getCurrentPath() { // 获取当前的路径
    return window.location.hash.slice(1)
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(this.getCurrentPath())
    })
  }
}
