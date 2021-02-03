<template>
  <div>
    <hu-button :type="type" v-for="type in types" :key="type" @click="show(type)">{{ type }}</hu-button>
  </div>
</template>

<script>
import { ref } from "vue";
import { Message } from "../package";
export default {
  setup() {
    const types = ref(["success", "warning", "error", "info"]);
    const show = type => {
      Message[type](type);
    };
    return {
      types,
      show
    };
  }
};
</script>
<style>
</style>