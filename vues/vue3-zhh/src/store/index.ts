import { createStore } from 'vuex'
import { mutations, actions } from './types'

export interface StoreProps {
  count: number;
  nickname: string;
}

const store = createStore<StoreProps>({
  state: {
    count: 0,
    nickname: ''
  },
  mutations: {
    [mutations.CHANGE_COUNT] (state: StoreProps, payload: number) {
      state.count = payload
    },
    [mutations.CHANGE_NICKNAME] (state: StoreProps, payload: string) {
      state.nickname = payload
    }
  },
  actions: {
    async [actions.ASYNC_CHANGE_COUNT] ({ commit }, payload: number) {
      setTimeout(() => {
        commit(mutations.CHANGE_COUNT, payload)
      }, 2000)
    }
  }
})

export default store
