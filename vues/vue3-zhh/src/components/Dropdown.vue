<template>
  <div class="dropdown" ref="target">
    <slot></slot>
    <slot v-if="visible" name="dropdown"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount } from 'vue'
type Tigger = 'click' | 'hover'

export default defineComponent({
  name: 'Dropdown',
  props: {
    trigger: {
      type: String as PropType<Tigger>,
      default: 'click'
    }
  },
  setup (props) {
    const target = ref<null | HTMLElement>(null)
    const visible = ref<boolean>(false)
    const handler = (e: MouseEvent) => {
      if (target.value) {
        if (visible.value && !target.value.contains(e.target as HTMLElement)) {
          visible.value = false
        }
        if (!visible.value && target.value.contains(e.target as HTMLElement)) {
          visible.value = true
        }
      }
    }
    onMounted(() => {
      if (props.trigger === 'click') {
        document.addEventListener('click', handler)
      }
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', handler)
    })
    return {
      target,
      visible
    }
  }
})
</script>

<style lang="less" scoped>
.dropdown {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
</style>
