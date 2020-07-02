<template>
  <div>
    <button @click="addMessage('success')">Success</button>
    <button @click="addMessage('error')">Error</button>
    <button @click="addMessage('warning')">Warning</button>
  </div>
</template>
<script>
import Message from './element-ui/Message'
import Vue from 'vue'
Vue.use(Message)

export default {
  name: 'app',
  methods: {
    addMessage(type) {
      const map = {
        'success': '成功',
        'error': '失败',
        'warning': '警告'
      }
      this.$message[type]({ message: `${map[type]}信息`, duration: 3000 })
    }
  }
}
</script>

