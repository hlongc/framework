<template>
  <main class="hlc-main">
    <slot></slot>
  </main>
</template>
<script>
export default {
  name: 'hlc-main'
}
</script>
<style lang="scss">
.hlc-main {
  flex: 1;
  padding: 20px;
}
</style>
