import Vue from 'vue'
import App from './App.vue'
import HlcUI from './package'

Vue.config.productionTip = false
Vue.use(HlcUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
