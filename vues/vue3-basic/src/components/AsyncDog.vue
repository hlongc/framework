<template>
  <img :src="src && src.message" height="100">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AsyncDog",
  async setup() {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
      src: res.data
    };
  }
});
</script>

