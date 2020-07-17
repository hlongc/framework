import RouterView from './components/router-view'
import RouterLink from './components/router-link'
let Vue

export default function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._routerRoot = this // 保留router根节点
        this._router = this.$options.router
        // 初始化路由
        this._router.init(this)
        // 把当前匹配到的路由定义到this上面，并且是响应式的，只要一变化，页面就会重新渲染
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 子节点通过父节点拿到router根节点
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router
    }
  })

  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}
