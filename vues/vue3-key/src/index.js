import { reactive, effect, computed, ref } from './reactivity'

const state = reactive({
  name: 'hlc',
  age: 25,
  arr: [1, 2, 3]
})

const prevAge = computed(() => {
  console.log('lazy effect')
  return state.age - 1
})

effect(() => {
  console.log(prevAge.value)
})

setTimeout(() => {
  state.age = 24
  state.age = 24
  state.age = 24
  state.age = 24
}, 5000)

// effect(() => {
//   console.log(state.name)
// })

// effect(() => {
//   console.log(state.name, 123)
// })

// effect(() => {
//   console.log(JSON.stringify(state.arr))
// })

// setTimeout(() => {
//   state.name = 'hulongchao'
//   state.arr.push(4)
// }, 5000)