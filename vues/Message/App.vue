<template>
  <div>
    <button @click="addMessage">增加</button>
  </div>
</template>
<script>
import Message from './element-ui/Message'
import Vue from 'vue'
Vue.use(Message)

export default {
  name: 'app',
  methods: {
    addMessage() {
      this.$message.success({ message: Date.now() + '嘻嘻嘻', duration: 3000 })
    }
  }
}
</script>

