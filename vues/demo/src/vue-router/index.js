import install from './install'
import createMatcher from './createMatcher'
class VueRouter {
  constructor(options) {
    // 创建匹配器 { macther, addRoutes }
    this.macther = createMatcher(options.routes)
  }
  init() {
    console.log('初始化路由')
  }
}

VueRouter.install = install

export default VueRouter
