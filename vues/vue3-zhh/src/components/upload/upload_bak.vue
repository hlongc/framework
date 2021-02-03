<template>
  <div class="hu-upload">
    <div class="upload-btn" @click="handleClick">
      <slot><button>点击上传</button></slot>
    </div>
    <input type="file" ref="inputRef" style="display: none;" @change="handleChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'hu-upload',
  setup () {
    console.log('hello')
    const inputRef = ref<null | HTMLInputElement>(null)
    const handleClick = () => {
      if (inputRef.value) {
        inputRef.value.click()
      }
    }
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        console.log(target.files[0])
      }
    }
    return {
      inputRef,
      handleClick,
      handleChange
    }
  }
})
</script>

<style lang="less" scoped>

</style>>
