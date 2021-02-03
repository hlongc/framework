<template>
  <div>
    <input type="text" :value="val" @input="handleChange" v-bind="$attrs">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'SelfInput',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  inheritAttrs: false, // 不继承属性
  setup (props, { emit }) {
    const val = ref<string>(props.modelValue)
    const handleChange = (e: KeyboardEvent) => {
      const newValue = (e.target as HTMLInputElement).value
      console.log(newValue)
      // eslint-disable-next-line vue/custom-event-name-casing
      emit('on-update:modelValue', newValue)
    }
    return {
      val,
      handleChange
    }
  }
})
</script>
