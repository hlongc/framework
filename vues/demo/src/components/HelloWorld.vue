<template>
  <div class="hello">
    <router-link to="/example">to example</router-link>
    <p>{{ count }}</p>
    <button @click="addCount">count+</button>
    <h1>{{ msg }}</h1>
    <Calender v-model="now" />
    <p>工资：{{ salary }}</p>
    <p>上税：{{ tax }}</p>
    <p>{{ x }}</p>
    <p>{{ z }}</p>
    <button @click="add1">马上涨工资</button>
    <hr/>
    <button @click="add2">等一下涨工资</button>
    <p>新注册的模块</p>
    <p>{{ name }}</p>
    <button @click="updateName">修改名字</button>
    <Test />
  </div>
</template>

<script>
import Calender from './Calender.vue'
import Test from './Test.js'

import { mapState, mapGetters, mapMutations, mapActions } from '../vuex.js'

export default {
  name: 'HelloWorld',
  components: { Calender, Test },
  // 可进行重命名
  computed: {
    ...mapState({ salary: 'salary', x: 'a.x', z: 'a.c.z', name: 'f.name' }),
    ...mapGetters(['tax']),
    newCount() {
      return this.count * 10
    }
  },
  data () {
    return {
      now: new Date('2019/07/08'),
      msg: 'Welcome to Your Vue.js App12',
      count: 15
    }
  },
  methods: {
    ...mapMutations({ increase: 'increase', acIncrease: 'a/c/increase', aclIncrease: 'a/c/l/increase', editName: 'editName' }),
    ...mapActions(['delayIncrease']),
    add1 () {
      this.increase(3000)
      this.acIncrease()
      this.aclIncrease()
    },
    add2 () {
      this.delayIncrease(3500)
    },
    updateName() {
      this.editName()
    },
    addCount() {
      this.count += 1
      setTimeout(() => {
        console.log(this.newCount)
      })
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
