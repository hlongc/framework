<template>
  <div ref="container">
    <p>薪资: <input v-model="salary" /></p>
    <p>税收: {{ tax }}</p>
    <button @click="add">add</button>
    <hr />
    <p>姓名: {{ name }}</p>
    <p>年龄: {{ age }}</p>
    <ul v-if="hobby.length">
      <li v-for="item in hobby" :key="item">{{ item }}</li>
    </ul>
    <button @click="changeName">改名</button>
    <button @click="addHobby">增加爱好</button>
  </div>
</template>

<script>
import { ref, reactive, computed, toRefs, watchEffect, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue'
export default {
  // 创建组件实例，然后初始化 props ，紧接着就调用setup 函数。从生命周期钩子的视角来看，它会在 beforeCreate 钩子之前被调用
  setup() {
    console.log('setup')
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log(container.value)
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    const container = ref()
    // ref 只能对单个的值进行响应式监控，值被定义在value上面，还是使用的Object.defineProperty
    const salary = ref(0)

    watchEffect(() => {
      if (salary.value > 10000) {
        console.log('🤩 工资好高')
      }
    })
    // computed 可以设置set 和 get
    const tax = computed(() => {
      if (salary.value < 5000) return 0
      if (salary.value < 10000) return 300
      if (salary.value < 15000) return 800
      return 1000
    })
    // reactive 使用的是Proxy和ref不同
    const info = reactive({ name: '胡隆超', age: 25 })
    function add() {
      salary.value += 500
    }
    function changeName() {
      info.name = '胡龙超'
    }

    const hobby = reactive(['看电影', '吃饭'])
    function addHobby() {
      hobby[2] = '写代码'
    }
    return {
      salary,
      add,
      tax,
      ...toRefs(info),
      changeName,
      hobby,
      addHobby,
      container
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  }
}
</script>
