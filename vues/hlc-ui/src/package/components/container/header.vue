<template>
  <header class="hlc-header" :style="{ height }">
    <slot></slot>
  </header>
</template>
<script>
export default {
  name: 'hlc-header',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
