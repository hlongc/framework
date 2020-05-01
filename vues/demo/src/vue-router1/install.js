import RouterView from './components/router-view'
import RouterLink from './components/router-link'

export default function(Vue) {
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) { // 说明当前是根组件
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this) // 传入当前跟实例
        // 将当前匹配到的路由定义到this上，当路由发生变化时，由于是响应的，所以会刷新视图
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  Vue.component('RouterView', RouterView)
  Vue.component('RouterLink', RouterLink)
}
