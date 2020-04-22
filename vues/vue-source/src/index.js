import Vue from 'vue'

const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      count: 1
    }
  },
  render(h) {
    return h('div', { id: 'container' }, 
      h('span', { style: { color: 'red' } }, `我是span${this.count}`),
      this.msg
    )
  }
})

setTimeout(() => {
  vm.msg = 'world'
  vm.count++
}, 8000)

// const vm = new Vue({
//   el: '#app',
//   data() {
//     return {
//       msg: 'hello',
//       firstName: 'longchao',
//       lastName: 'hu',
//       info: { age: 25, name: 'hlc' },
//       hobby: [[1, []], '足球', '篮球', '羽毛球']
//     }
//   },
//   watch: {
//     msg: {
//       handler(newVal, oldVal) {
//         console.log(newVal, oldVal)
//       },
//       immediate: true
//     }
//   },
//   computed: {
//     fullName() {
//       console.log('fullName')
//       return this.firstName + this.lastName
//     }
//   }
// })

// setTimeout(() => {
//   vm.info.name = 'hlongc'
//   vm.info.name = 'hlongc1'
//   vm.info.name = 'hlongc2'
//   vm.info.age = 24
//   vm.msg = 'world'
//   vm.hobby[0].push(2)
//   vm.hobby[0][1].push(3)
//   setTimeout(() => {
//     vm.msg = 'hello'
//     vm.firstName = 'lc'
//   }, 2000)
// }, 3000)





// <div id="container"><span style="color: red;">我是span</span>我是文本节点</div>

// import { h, render, patch } from '../source/vue/vdom'

// const container = document.getElementById('app')

// const oldNode = h('ul', { id: 'container', key: '1', style: { backgroundColor: 'green' } },
//   h('li', { style: { backgroundColor: 'red' }, key: 'a' }, 'a'),
//   h('li', { style: { backgroundColor: 'orange' }, key: 'b' }, 'b'),
//   h('li', { style: { backgroundColor: 'yellow' }, key: 'c' }, 'c'),
//   h('li', { style: { backgroundColor: 'green' }, key: 'd' }, 'd')
// )

// render(oldNode, container)

// const newNode = h('ul', { id: 'wrapper', key: '1', style: { backgroundColor: 'blue' } },
//   h('li', { style: { backgroundColor: 'green' }, key: 'e' }, 'e'),
//   h('li', { style: { backgroundColor: 'red' }, key: 'a' }, 'a'),
//   h('li', { style: { backgroundColor: 'orange' }, key: 'f' }, 'f'),
//   h('li', { style: { backgroundColor: 'pink' }, key: 'c' }, 'c'),
//   h('li', { style: { backgroundColor: 'yellow' }, key: 'n' }, 'n')
// )

// setTimeout(() => {
//   patch(oldNode, newNode)
// }, 5000)
