import Vue from 'vue'
import Vuex from './vuex'
import { cloneDeep } from 'lodash'

Vue.use(Vuex)

function logger(store) {
  let oldState = cloneDeep(store.state)
  store.subscribe((mutation, newState) => {
    console.log(oldState)
    console.log(mutation)
    console.log(cloneDeep(newState))
    oldState = cloneDeep(newState)
  })
}

function persist(store) {
  if (sessionStorage.getItem('VUEX:STATE')) {
    store.replaceState(JSON.parse(sessionStorage.getItem('VUEX:STATE')))
  }
  store.subscribe((_, newState) => {
    sessionStorage.setItem('VUEX:STATE', JSON.stringify(newState))
  })
}

const store = new Vuex.Store({
  modules: {
    a: {
      namespaced: true,
      state: {
        x: 2
      },
      modules: {
        c: {
          namespaced: true,
          state: {
            z: 3
          },
          mutations: {
            increase() {
              console.log('a.c.increase')
            }
          },
          modules: {
            l: {
              namespaced: true,
              state: {
                m: 6
              },
              mutations: {
                increase() {
                  console.log('a.c.l.increase')
                }
              }
            }
          }
        }
      }
    },
    b: {
      namespaced: true,
      state: {
        y: 4
      }
    }
  },
  plugins: [logger, persist],
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

store.registerModule('f', {
  state: {
    name: 'hlc'
  },
  mutations: {
    editName(state) {
      state.name += '1'
    }
  }
})

export default store
