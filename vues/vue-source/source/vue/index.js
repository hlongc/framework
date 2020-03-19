import { initState } from './observe'
import Watcher from './observe/watcher'
import { compiler } from './util'

function Vue(options) {
  this._init(options) // 初始化vue
}

Vue.prototype._init = function(options) {
  const vm = this
  vm.$options = options // 保存用户传入的配置项

  // 初始化状态,拦截数组方法和对象的属性
  initState(vm)

  // 挂载组件
  if (vm.$options.el) {
    vm.$mount()
  }
}

function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  }
  return el
}

Vue.prototype.$mount = function() {
  const vm = this
  let el = vm.$options.el
  el = vm.$el = query(el) // 真实dom

  // 渲染和更新都通过wachter来实现
  const updateComponent = () => { // 更新和初次渲染
    vm._update()
  }
  new Watcher(vm, updateComponent) // 渲染watcher，会给Dep.target赋值
}

Vue.prototype._update = function() {
  const vm = this
  let el = vm.$el
  let firstChild
  const fragment = document.createDocumentFragment() // 创建文档碎片，等替换完成一次性插入到页面
  while (firstChild = el.firstChild) {
    fragment.appendChild(firstChild) // appendChild具有移动节点的功能
  }
  console.log('更新')
  compiler(fragment, vm) // 编译节点
  el.appendChild(fragment)
  // 依赖变化了需要重新渲染
}

export default Vue