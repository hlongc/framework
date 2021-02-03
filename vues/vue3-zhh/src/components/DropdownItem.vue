<template>
  <li class="dropdown-item">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem'
})
</script>
<style lang="less" scoped>
.dropdown-item {
  line-height: 34px;
  height: 34px;
  color: #333;
  font-size: 14px;
}
</style>
