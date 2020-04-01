<template>
  <footer class="hlc-footer" :style="{ height }">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: 'hlc-footer',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
