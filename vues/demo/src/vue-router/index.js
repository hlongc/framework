import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/HashHistory'
class VueRouter {
  constructor (options) {
    // 创建匹配器包含两个方法 addRoutes match
    this.matcher = createMatcher(options.routes)
    // 初始化真正的路由
    this.history = new HashHistory(this)
  }

  match (...args) {
    return this.matcher.match(...args)
  }

  push (to) {
    this.history.transitionTo(to, () => {
      window.location.hash = to
    })
  }

  beforeEach (fn) {
    this.history.beforeEachs.push(fn)
  }

  init (app) {
    const history = this.history
    const setupHistoryListener = () => {
      history.setupListener()
    }
    history.transitionTo(
      history.getCurrentPath(),
      setupHistoryListener
    )
    // 订阅匹配的路由变化事件,更新值，让视图刷新
    history.listen(route => {
      app._route = route
    })
  }
}

VueRouter.install = install

export default VueRouter
