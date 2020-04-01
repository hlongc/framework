<template>
  <div class="hlc-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script>
const justifyType = ['start', 'end', 'center', 'space-around', 'space-between']
export default {
  name: 'hlc-row',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      required: false,
      validator(val) {
        if (val && !justifyType.includes(val)) {
          console.error('justify')
        }
        return true
      }
    }
  },
  computed: {
    rowStyle() {
      const o = {}
      const justify = ['start', 'end'].includes(this.justify) ? 'flex-' + this.justify : this.justify
      o['justifyContent'] = justify
      if (this.gutter) {
        o['margin-left'] = -this.gutter / 2 + 'px'
        o['margin-right'] = -this.gutter / 2 + 'px'
      }
      return o
    }
  },
  mounted() {
    this.$children.forEach(child => {
      child.gutter = this.gutter
    })
  }
}
</script>
<style lang="scss">
@import '@/package/styles/common.scss';
.hlc-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
