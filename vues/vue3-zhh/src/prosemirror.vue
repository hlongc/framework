<template>
  <div class="wrapper"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

export default defineComponent({
  name: 'prosemirror',
  setup () {
    const wrapper = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      console.log('prosemirror')
      const state = EditorState.create({ schema })
      const view = new EditorView(document.body, { state })
      console.log(view)
    })
    return {
      wrapper
    }
  }
})
</script>
<style lang="less" scoped>
.wrapper {
  height: 500px;
}
</style>
