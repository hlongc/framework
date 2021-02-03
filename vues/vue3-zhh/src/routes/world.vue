<template>
  <div>world</div>
  <button @click="jump">我想去hello</button>
  <div v-clickOutside="print" class="test">测试自定义指令v-clickOutside</div>
  <hu-upload multiple>
    <button>😝上传11</button>
    <template #sub>
      <span>我是sub啊</span>
    </template>
  </hu-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'world',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const jump = () => {
      router.push('/hello')
    }
    const print = () => {
      console.log('点击在外面了')
    }
    return {
      jump,
      route,
      print
    }
  }
})
</script>
<style lang="less" scoped>
.test {
  padding: 10px;
  background-color: aquamarine;
}
</style>
