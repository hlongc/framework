import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upload from './components/upload'
// import directives from './directives'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(upload)
// 注册全局指令
// Object.keys(directives).forEach(key => {
//   app.directive(key, directives[key])
// })
app.mount('#app')
