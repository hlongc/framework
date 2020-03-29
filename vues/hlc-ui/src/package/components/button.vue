<template>
  <button class="hlc-button" :class="btnClass">
    <hlc-icon :type="prefixIcon" />
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <hlc-icon :type="suffixIcon" />
  </button>
</template>
<script>
const buttonTypes = ['success', 'primary', 'danger', 'warning', 'info']
export default {
  name: 'hlc-button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(val) {
        if (val && !buttonTypes.includes(val)) {
          console.error(`button type only includes: ${buttonTypes.join(',')}, please check type`)
        }
        return true
      }
    },
    prefixIcon: {
      type: String,
      required: false,
      default: ''
    },
    suffixIcon: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    btnClass() {
      const classes = []
      if (buttonTypes.includes(this.type)) classes.push(`hlc-button-${this.type}`)
      return classes
    }
  }
}
</script>
<style lang="scss">
@import '../styles/common.scss';
$height: 42px;
$font-size: 16px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;

.hlc-button {
  display: inline-flex;
  height: $height;
  line-height: 1;
  padding: 10px;
  box-sizing: border-box;
  color: $color;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  font-size: $font-size;
  background-color: $background;
  cursor: pointer;
  justify-content: center;
  vertical-align: middle;
  outline: none;
  user-select: none;
  &:hover {
    border-color: $border-color;
    background-color: $background;
  }
  &:focus, &:active {
    color: $active-color;
    border: 1px solid $active-color;
    background-color: $background;
    outline: none;
  }

  @each $type, $color in (primary: $primary, success: $success, warning: $warning, danger: $danger, info: $info) {
    &-#{$type} {
      background-color: #{$color};
      border: 1px solid #{$color};
      color: #fff;
      fill: #fff;
    }
  }

  @each $type, $color in (primary: $primary-hover, success: $success-hover, warning: $warning-hover, danger: $danger-hover, info: $info-hover) {
    &-#{$type}:hover {
      background-color: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

  @each $type, $color in (primary: $primary-active, success: $success-active, warning: $warning-active, danger: $danger-active, info: $info-active) {
    &-#{$type}:active, &-#{$type}:focus {
      background-color: #{$color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
  .hlc-icon {
    width: 16px;
    height: 16px;
  }
  span + svg, svg + span {
    margin-left: 5px;
  }
}
</style>


