import Button from './components/button.vue'
import Icon from './components/icon.vue'

export default {
  install(Vue) {
    Vue.component(Button.name, Button)
    Vue.component(Icon.name, Icon)
  }
}