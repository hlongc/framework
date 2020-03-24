<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <MyMenu :data="data" />
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from '@/router'
import MyMenu from './components/MyMenu.vue'

export default {
  name: 'App',
  components: {
    MyMenu
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
  },
  mounted () {
    console.log(router)
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      width: 200px;
    }
  }
}
</style>
