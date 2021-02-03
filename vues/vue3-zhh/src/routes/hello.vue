<template>
  <div>hellow</div>
  <button @click="add">++++</button>
  <div>count: {{ count }}</div>
  <button @click="edit">修改名字</button>
  <div>nickname: {{ nickname }}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import type { StoreProps } from '@/store'
import { mutations, actions } from '@/store/types'

export default defineComponent({
  name: 'hello',
  setup () {
    const store = useStore<StoreProps>()

    const count = computed(() => store.state.count)
    const add = () => {
      store.dispatch(actions.ASYNC_CHANGE_COUNT, count.value + 1)
    }

    const nickname = computed(() => store.state.nickname)
    const edit = () => {
      store.commit(mutations.CHANGE_NICKNAME, nickname.value + '嘻')
    }
    return {
      count,
      add,
      edit,
      nickname
    }
  }
})
</script>
