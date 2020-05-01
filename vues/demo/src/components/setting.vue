<template>
  <div>
    <p>setting</p>
    <router-link to="/setting/user" tag="a">to user-manager</router-link>
    <router-link to="/setting/message" tag="a">to msg-manager</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'setting'
}
</script>
<style>
</style>
