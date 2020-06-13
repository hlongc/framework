<template>
  <div ref="container">
    <p v-show="showDemo" class="hide">测试css中display:none时，v-show是否能生效</p>
    <button @click="showDemo = !showDemo">toggle</button>
    <p>setting</p>
    <Demo v-model="inputValue" @changeName="value => inputValue = value" />
    <router-link to="/setting/user" tag="a">to user-manager</router-link>
    <router-link to="/setting/message" tag="a">to msg-manager</router-link>
    <a href="http://localhost:8081/#/setting/user" target="_blank">打开新页面</a>
    <button @click="handleClick">打开</button>
    <router-view />
  </div>
</template>

<script>
import qs from 'query-string'
import Demo from './Demo.vue'

export default {
  name: 'setting',
  components: { Demo },
  data() {
    return {
      showDemo: true,
      inputValue: ''
    }
  },
  mounted() {
    // this.$options._base === Vue 等于Vue构造函数
    console.log(this.$options._base)
    sessionStorage.setItem('name', 'hlongc')
    document.cookie = 'age=24'
    const targets = [
      'https://www.baidu.com',
      'https://www.toutiao.com',
      'https://www.douyin.com',
    ]
    function printOrder(urls) {
      return new Promise(resolve => {
        const res = []
        let i = 0
        const setValue = (value, index) => {
          res[index] = value
          ++i
          if (i === urls.length) {
            resolve(res)
          }
        }
        urls.forEach((url, index) => {
          const xhr = new XMLHttpRequest
          xhr.open('get', url, true)
          xhr.onload = function () {
            setValue(xhr.response || xhr.responseText, index)
          }
          xhr.onerror = function(err) {
            setValue(err, index)
          }
          xhr.send()
        })
      })
    }
    printOrder(targets).then(res => {
      console.log(res)
    })
    console.log(qs.parse('d=1&b=2&c=北京'))
    const u = new URLSearchParams('d=1&b=2&c=北京')
    console.log(u.get('d'), u.get('b'), u.get('c'))
    u.set('d', '666')
    console.log(u, u.get('d'))
  },
  methods: {
    handleClick() {
      window.open('http://localhost:8081/#/setting/user')
    }
  }
}
</script>
<style>
.hide {
  display: none;
}
</style>
