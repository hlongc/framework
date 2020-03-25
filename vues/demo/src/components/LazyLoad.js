import lazy from './lazy'
let Vue

export default {
  install(_Vue, options) {
    if (!Vue) Vue = _Vue
    const LazyClazz = lazy(Vue, options)
    const lazyIns = new LazyClazz()
    Vue.directive('lazy', {
      inserted: lazyIns.add.bind(lazyIns)
    })
  }
}
