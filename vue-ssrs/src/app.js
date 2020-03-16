import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

// 为了保证服务端渲染的时候，每个用户访问的实例不同，必须每次返回一个新的实例
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}

