<template>
  <div>
    <hu-carousel
      style="width: 400px;"
      height="200px"
      :delay="3000"
      :loop="true"
      :auto="true"
      :initial="0"
    >
      <hu-carousel-item style="background: red;" v-for="item in list" :key="item">{{ item }}</hu-carousel-item>
    </hu-carousel>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  // await会阻止组件渲染，此时要使用异步组件Suspense，如果在onMounted中使用异步则不存在这个问题
  async setup() {
    let list = await Promise.resolve(["1", "2", "3"]);
    list = ref(list);
    return {
      list
    };
  }
};
</script>
