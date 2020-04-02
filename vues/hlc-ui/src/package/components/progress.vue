<template>
  <div class="hlc-progress" :style="progressStyle">
    <div class="hlc-progress-inner" :style="innerStyle"></div>
  </div>
</template>
<script>
export default {
  name: 'hlc-progress',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    strokeWith: {
      type: Number,
      default: 6
    },
    color: {
      type: String,
      default: '#3a8ee6'
    }
  },
  computed: {
    progressStyle() {
      const o = {}
      o.height = this.strokeWith + 'px'
      return o
    },
    innerStyle() {
      const o = {}
      o.backgroundColor = this.color
      o.width = this.percent + '%'
      return o
    }
  }
}
</script>
<style lang="scss">
.hlc-progress {
  position: relative;
  background-color: #fff;
  .hlc-progress-inner {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    transition: all .4s ease;
  }
}
</style>


