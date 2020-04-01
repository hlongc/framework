<template>
  <section class="hlc-container" :class="{ vertical }">
    <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'hlc-container',
  data() {
    return {
      vertical: false
    }
  },
  mounted() {
    this.vertical = this.$children.some(child => ['hlc-footer', 'hlc-header'].includes(child.$options.name))
  }
}
</script>
<style lang="scss">
.hlc-container {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.hlc-container.vertical {
  flex-direction: column;
}
</style>
