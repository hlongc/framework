import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    state: {
      name: 'hlongc'
    },
    mutations: {
      setName(state) {
        state.name = 'hulongchao'
      }
    },
    actions: {
      setName({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            commit('setName')
            resolve()
          }, 1000)
        })
      }
    }
  })
  // 如果当前是客户端的话，存在这个服务端的state,那么取出来替换掉客户端的state,达到更新的目的
  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  // 因为服务端需要给用户访问不同的状态，所以需要改成函数，每次生成新的store
  return store
}