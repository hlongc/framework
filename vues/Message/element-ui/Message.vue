<template>
  <div class="container" v-if="messages.length">
    <div v-for="layer in messages" :key="layer.id">{{ layer.message }}</div>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      messages: []
    }
  },
  methods: {
    add(options) {
      const layer = { id: Date.now() + Math.random() + 'A', ...options }
      this.messages.push(layer)
      layer.timer = setTimeout(() => {
        this.remove(layer)
      }, options.duration)
    },
    remove(layer) {
      clearTimeout(layer.timer)
      this.messages = this.messages.filter(item => item.id !== layer.id)
    }
  }
}
</script>

