<template>
  <div class="index_wrapper">
    <header></header>
      <div class="body">
        <div class="left"></div>
        <div class="main">
          <Login />
        </div>
        <div class="right"></div>
      </div>
      <footer></footer>
  </div>
</template>

<script>
import Login from './login.vue'
export default {
  components: { Login },
  mounted() {
    const user = localStorage.getItem('user')
    if (!!user) {
      this.$router.push(`/user/${user}`)
    }
  }
}
</script>

<style lang="less" scoped>
.index_wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  header,footer  {
    height: 100px;
  }
  header {
    background-color: red;
  }
  footer {
    background-color: green;
  }
  .body {
    // height: calc(100% - 200px);
    flex: 1;
    display: flex;
    .left, .right {
      width: 200px;
    }
    .left {
      background-color: pink;
    }
    .right {
      background-color: orange;
    }
    .main {
      flex: 1;
      // background-color: deepskyblue;
    }
  }
}
</style>