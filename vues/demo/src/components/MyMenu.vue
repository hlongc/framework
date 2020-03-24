<template>
  <ol type="I" v-if="data.length">
    <li v-for="item in data" :key="item.id">
      <template v-if="item.children && item.children.length">
        <div>{{ item.title }}</div>
        <my-menu :data="item.children" />
      </template>
      <template v-else>
        {{ item.title }}
      </template>
    </li>
  </ol>
</template>
<script>
export default {
  name: 'my-menu',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
<style lang="less">

</style>
