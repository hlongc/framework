<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import router from '@/router'
import MyMenu from './components/MyMenu.vue'
import WaterMask from './WaterMask.vue'
import DDD from './DDD.vue'
import Login from './login.vue'

export default {
  name: 'App',
  components: {
    MyMenu,
    WaterMask,
    DDD,
    Login
  },
  data() {
    return {
      data: [
        { title: '第一个', id: '1', children: [
          { title: '第一个11', id: '11' },
          { title: '第一个12', id: '12' },
          { title: '第一个13', id: '13', children: [
            { title: '第一个131', id: '131' }
          ] },
        ]},
        { title: '第二个', id: '2', children: [
          { title: '第二个21', id: '21' },
          { title: '第二个22', id: '22' }
        ]}
      ]
    }
  }
 }
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
