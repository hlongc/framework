<template>
  <div @click="show">
    <p>Foo组件</p>
    <p>{{ name }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['name']),
  // 在nuxt中，这个方法只会在服务端中执行，并且返回的是一个promise,只能在路由组件中执行
  asyncData({ store }) {
    return store.dispatch('setName')
  },
  // 保证在客户端执行时也会更改状态
  mounted() {
    this.$store.dispatch('setName')
  },
  methods: {
    show() {
      console.log('hhhhhh100112')
    }
  },
  metaInfo: {
    title: 'My Foo'
  }
}
</script>
<style scoped>
div {
  background-color: coral;
}
</style>


