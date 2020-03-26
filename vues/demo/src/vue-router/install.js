export default function(Vue) {
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) { // 说明当前是根组件
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this) // 传入当前跟实例
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}
