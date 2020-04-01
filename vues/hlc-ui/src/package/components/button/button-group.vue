<template>
  <div class="hlc-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'hlc-button-group',
  mounted() {
    const children = this.$el.children
    for(let i = 0 ; i < children.length; i++) {
      console.assert(children[i].tagName === 'BUTTON', '子元素必须是button元素')
    }
  }
}
</script>
<style lang="scss">
@import '@/package/styles/common.scss';
.hlc-button-group {
  display: inline-flex;
  vertical-align: middle;
  .hlc-button {
    border-radius: 0;
    &:not(first-child) {
      margin-left: 1px;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>


