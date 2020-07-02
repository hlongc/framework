<template>
  <div class="container" v-if="messages.length">
    <div class="message" v-for="layer in messages" :key="layer.id">
      <span v-if="layer.type === 'success'" :class="{ tag: true, success: layer.type === 'success' }">√</span>
      <span v-else-if="layer.type === 'error'" :class="{ tag: true, error: layer.type === 'error' }">&times;</span>
      <span v-else-if="layer.type === 'warning'" :class="{ tag: true, warning: layer.type === 'warning' }">!</span>
      <span>
        {{ layer.message }}
      </span>
    </div>
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
    add(options, type) {
      const layer = { id: Date.now() + Math.random() + 'A', ...options, type }
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
<style>
.container {
  position: absolute;
  z-index: 2000;
  left: 50%;
  top: 50px;
}
.message {
  padding: 5px 10px;
  margin-bottom: 10px;
  box-shadow: #000 0px 0px 2px;
  border-radius: 5px;
}
.tag {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.tag.success {
  background-color: green;
}
.tag.error {
  background-color: red;
  color: #fff;
}
.tag.warning {
  background-color: yellow;
}
</style>



