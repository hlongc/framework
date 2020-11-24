<template>
  <h4>{{ count }}</h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AsyncComponent",
  setup() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          count: 1995
        });
      }, 3000);
    });
  }
});
</script>

