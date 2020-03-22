import Vue from 'vue'

const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      firstName: 'longchao',
      lastName: 'hu',
      info: { age: 25, name: 'hlc' },
      hobby: [[1, []], '足球', '篮球', '羽毛球']
    }
  },
  watch: {
    msg: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      immediate: true
    }
  },
  computed: {
    fullName() {
      console.log('fullName')
      return this.firstName + this.lastName
    }
  }
})

setTimeout(() => {
  vm.info.name = 'hlongc'
  vm.info.name = 'hlongc1'
  vm.info.name = 'hlongc2'
  vm.info.age = 24
  vm.msg = 'world'
  vm.hobby[0].push(2)
  vm.hobby[0][1].push(3)
  setTimeout(() => {
    vm.msg = 'hello'
    vm.firstName = 'lc'
  }, 2000)
}, 3000)