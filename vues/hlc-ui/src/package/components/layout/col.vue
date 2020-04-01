<template>
  <div class="hlc-col" :class="colClasses" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'hlc-col',
  data() {
    return { gutter: 0 }
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: null
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    colClasses() {
      const classes = []
      classes.push(`hlc-col-${this.span}`)
      if (this.offset) classes.push(`hlc-col-offset-${this.offset}`)
      const types = ['xs', 'sm', 'md', 'lg', 'xl']
      types.forEach(type => {
        if (typeof type === 'object') {
          const { span, offset } = this[type]
          span && classes.push(`hlc-col-${type}-${span}`)
          offset && classes.push(`hlc-col-${type}-offset-${offset}`)
        } else {
          this[type] && classes.push(`hlc-col-${type}-${this[type]}`)
        }
      })
      return classes
    },
    colStyle() {
      const style = {}
      if (this.gutter) {
        style['padding-left'] = this.gutter / 2 + 'px'
        style['padding-right'] = this.gutter / 2 + 'px'
      }
      return style
    }
  }
}
</script>
<style lang="scss">
@import '@/package/styles/common.scss';
@for $i from 1 through 24 {
  .hlc-col-#{$i} {
    width: $i / $spans * 100%;
  }
  .hlc-col-offset-#{$i} {
    margin-left: $i / $spans * 100%;
  }
}
// 循环给xs sm md lg xl 五种屏幕宽度添加样式
@each $key, $value in (xs: xs, sm: sm, md: md, lg: lg, xl: xl) {
  @include medias($value) {
    @for $i from 1 through 24 {
      .hlc-col-#{$value}-#{$i} {
        width: $i / $spans * 100%;
      }
      .hlc-col-#{$value}-offset-#{$i} {
        width: $i / $spans * 100%;
      }
    }
  }
}
</style>
