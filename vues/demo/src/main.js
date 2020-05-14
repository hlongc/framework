// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import LazyLoad from './components/LazyLoad'
import loading from '@/assets/logo.png'
import './utils/app'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(LazyLoad, { loading })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// import obj, { print, set } from './test'

// console.log(obj)
// // obj.a = 8
// set(5)
// console.log(obj)

// obj.a = 999


// print()

// let v = require('./test')

// console.log(v.a)

// v.add()

// console.log(v.a)
