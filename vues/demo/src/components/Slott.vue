<template>
  <div ref="container">
    <slot></slot>
    <slot name="btn"></slot>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$slots)
    const button = this.$slots.default[0].elm
    console.log(this.$slots.default[1])
    const handler = () => {
      console.log('点击')
    }
    button.addEventListener('click', handler)
    this.$once('hook:beforeDestroy', () => {
      button.removeEventListener('click', handler)
    })
  }
}
</script>

