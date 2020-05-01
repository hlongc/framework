import install from './install'
import createMatcher from './createMatcher'
import HashHistory from './history/hash'

class VueRouter {
  constructor(options) {
    // 创建匹配器 { macther, addRoutes }，在第一次调用addRoutes时还会进行扁平化操作
    this.macther = createMatcher(options.routes || [])
    // 初始化路由系统
    this.history = new HashHistory(this)
    // beforeEach回调
    this.beforeEachList = []
  }

  match(path) {
    return this.macther.match(path)
  }

  init(app) {
    // 初始化时获取匹配到的路由，进行渲染
    // 后续对hash进行监听，发生变化时重新渲染
    const history = this.history
    const addListener = () => {
      history.setupListener()
    }
    history.transitionTo(
      history.getCurrentPath(),
      addListener
    )
    // 订阅事件，路由发生改变时修改它，从而刷新视图
    history.listen(route => {
      app._route = route
    })
  }

  beforeEach(cb) {
    this.beforeEachList.push(cb)
  }

  push(path) {
    if (typeof path === 'string') {
      this.history.transitionTo(path, () => {
        window.location.hash = path
      })
    }
  }
}

VueRouter.install = install

export default VueRouter
