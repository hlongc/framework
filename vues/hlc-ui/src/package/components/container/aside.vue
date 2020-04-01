<template>
  <aside class="hlc-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script>
export default {
  name: 'hlc-aside',
  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
