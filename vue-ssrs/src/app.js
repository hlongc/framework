import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

// 为了保证服务端渲染的时候，每个用户访问的实例不同，必须每次返回一个新的实例
export default () => {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return { app, router }
}

