<template>
  <svg v-if="type" class="hlc-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>
<script>
import '../styles/icon.js'

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
  width: 25px;
  height:25px;
  vertical-align: middle;
}
</style>


