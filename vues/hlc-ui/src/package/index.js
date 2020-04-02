import Button from './components/button/button.vue'
import Icon from './components/icon.vue'
import ButtonGroup from './components/button/button-group.vue'
import Row from './components/layout/row.vue'
import Col from './components/layout/col.vue'

import Container from './components/container/container.vue'
import Aside from './components/container/aside.vue'
import Footer from './components/container/footer.vue'
import Header from './components/container/header.vue'
import Main from './components/container/main.vue'

import Input from './components/input.vue'
import Upload from './components/upload/upload.vue'
import Progress from './components/progress.vue'

export default {
  install(Vue) {
    Vue.component(Button.name, Button)
    Vue.component(ButtonGroup.name, ButtonGroup)
    Vue.component(Icon.name, Icon)
    Vue.component(Row.name, Row)
    Vue.component(Col.name, Col)
    Vue.component(Container.name, Container)
    Vue.component(Aside.name, Aside)
    Vue.component(Footer.name, Footer)
    Vue.component(Header.name, Header)
    Vue.component(Main.name, Main)
    Vue.component(Input.name, Input)
    Vue.component(Upload.name, Upload)
    Vue.component(Progress.name, Progress)
  }
}