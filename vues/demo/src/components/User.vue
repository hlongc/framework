<template>
  <div>
    <div class="user_wrapper" v-if="userinfo">
      <img :src="userinfo.picture.large" alt="">
      <p>{{ userinfo.name.first }} {{ userinfo.name.last }}</p>
      <p>{{ userinfo.email }}</p>
    </div>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <button @click="handleChange">改变</button>
    <button @click="handleAdd">增加</button>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      userinfo: null,
      list: [1, 2, 3]
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    handleChange() {
      this.list[0] = -1
    },
    handleAdd() {
      this.list.push(4)
    },
    getInfo() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', `https://randomuser.me/api/?seed=${this.$route.params.username}`, true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response.results[0])
          this.userinfo = xhr.response.results[0]
        }
      }
      xhr.responseType = 'json'
      xhr.send()
    }
  }
}
</script>

<style lang="less" scoped>
.user_wrapper {
  height: 100%;
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  text-align: center;
  p {
    line-height: 25px;
    text-align: center;
  }
}
</style>