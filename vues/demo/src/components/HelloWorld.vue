<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Calender v-model="now" />
    <p>工资：{{ $store.state.salary }}</p>
    <p>上税：{{ $store.getters.tax }}</p>
    <p>{{ $store.state.a.x }}</p>
    <p>{{ $store.state.a.c.z }}</p>
    <button @click="add1">马上涨工资</button>
    <hr/>
    <button @click="add2">等一下涨工资</button>
    <Test />
  </div>
</template>

<script>
import Calender from './Calender.vue'
import Test from './Test.js'
export default {
  name: 'HelloWorld',
  components: { Calender, Test },
  data () {
    return {
      now: new Date('2019/07/08'),
      msg: 'Welcome to Your Vue.js App12'
    }
  },
  methods: {
    add1 () {
      this.$store.commit('increase', 3000)
    },
    add2 () {
      this.$store.dispatch('delayIncrease', 3500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
