<template>
  <div class="login_wrapper">
    <ul>
      <li v-for="item in list" :key="item.value">{{ item.label }}-{{ item.value }}</li>
    </ul>
    <ul>
      <li v-for="item in arr" :key="item">{{ item }}</li>
    </ul>
    <button @click="edit">修改</button>
    <!-- <p>薪资：{{ salary }}</p>
    <button @click="add">涨薪</button>
    <p>
      <label for="name">姓名：</label>
      <input id="name" type="text" v-model="username"/>
    </p>
    <p>
      <label for="pwd">密码：</label>
      <input id="pwd" type="password" v-model="userpwd"/>
    </p>
    <p v-if="message">{{message}}</p>
    <p>
      <button @click="handleLogin">登录</button>
      <button @click="reset">清空</button>
    </p> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      userpwd: '',
      message: '',
      list: [
        { label: '足球', value: '1' },
        { label: '篮球', value: '2' },
        { label: '排球', value: '3' }
      ],
      arr: [1, 2, 3]
    }
  },
  computed: mapState(['salary']),
  methods: {
    ...mapMutations(['increase']),
    edit() {
      this.arr[0] = 4
      this.list[0].label = '台球'
    },
    add() {
      this.increase(2000)
    },
    handleLogin() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', `http://localhost:8080/user/login?username=${this.username}&userpwd=${this.userpwd}`, true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const ret = xhr.response
          this.message = ret.success ? '登录成功' : '账号或者密码错误'
          if (ret.success) {
            localStorage.setItem('user', this.username)
            this.$router.push(`/user/${this.username}`)
          }
        }
      }
      xhr.responseType = 'json'
      xhr.send()
    },
    reset() {
      this.username = ''
      this.userpwd = ''
    }
  }
}
</script>

<style>

</style>