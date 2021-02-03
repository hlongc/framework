<template>
  <div>
    <p v-for="item in list" :key="item.name">
      <span>
        名字：
        <slot name="name" :item="item">默认名字</slot>
      </span>
      <span>
        年龄：
        <slot name="age" :item="item">默认年龄</slot>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "demo",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>