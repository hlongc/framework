<template>
  <div>
    <button @click="changeTitle">change title</button>
    <Demo :title="title" />
  </div>
</template>

<script>
import Demo from './Demo.vue'
import { ref } from 'vue'
export default {
  components: {
    Demo
  },
  setup() {
    const title = ref('title')
    function changeTitle() {
      title.value += 1
    }
    return {
      title,
      changeTitle
    }
  }
}
</script>
