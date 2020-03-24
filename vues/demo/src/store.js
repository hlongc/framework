import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a: {
      state: {
        x: 2
      },
      modules: {
        c: {
          state: {
            z: 3
          },
          modules: {
            l: {
              state: {
                m: 6
              }
            }
          }
        }
      }
    },
    b: {
      state: {
        y: 4
      }
    }
  },
  state: {
    salary: 10000
  },
  getters: {
    tax (state) {
      return (state.salary * 0.07).toFixed(2)
    }
  },
  mutations: {
    increase (state, money) {
      state.salary += money
    }
  },
  actions: {
    delayIncrease (context, money) {
      setTimeout(() => {
        context.commit('increase', money)
      }, 2000)
    }
  }
})
