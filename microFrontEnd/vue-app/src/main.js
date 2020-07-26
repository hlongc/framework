import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
let ins = null
function render() {
  ins = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
} else { // 动态注入publicPath
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

export async function bootstrap() {
  console.log('vue bootstrap')
}

export async function mount(props) {
  console.log(props)
  render()
}

export async function unmount() {
  ins.$destroy()
}

