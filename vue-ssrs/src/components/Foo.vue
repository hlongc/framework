<template>
  <div @click="show">我是Foo</div>
</template>
<script>
export default {
  methods: {
    show() {
      console.log('hhhhhh')
    }
  }
}
</script>
<style scoped>
div {
  background-color: coral;
}
</style>


