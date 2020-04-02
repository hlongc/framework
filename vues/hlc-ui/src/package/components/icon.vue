<template>
  <i :class="`hlc-icon iconfont icon-${type}`"></i>
</template>
<script>
import '../assets/iconfont.css'

export default {
  name: 'hlc-icon',
  props: {
    type: {
      type: String,
      required: false
    }
  }
}
</script>
<style lang="scss">
.hlc-icon{
  vertical-align: middle;
}
</style>


