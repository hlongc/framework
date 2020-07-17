import History from './base'

function ensureSlash () {
  if (window.location.hash) return
  window.location.hash = '/'
}

class HashHistory extends History {
  constructor (router) {
    super(router)
    this.router = router
    // 第一次默认跳转hash
    ensureSlash()
  }

  getCurrentPath () {
    return window.location.hash.slice(1)
  }
}

export default HashHistory
