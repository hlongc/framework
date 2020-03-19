import Vue from 'vue'

const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      info: { age: 25, name: 'hlc' },
      hobby: [{ a: 1 }, '足球', '篮球', '羽毛球']
    }
  },
  watch: {

  },
  computed: {

  }
})

setTimeout(() => {
  vm.info.name = 'hlongc'
  vm.info.name = 'hlongc1'
  vm.info.name = 'hlongc2'
  vm.info.age = 24
  vm.msg = 'world'
}, 3000)