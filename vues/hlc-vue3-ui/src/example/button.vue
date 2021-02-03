<template>
  <div>
    <hu-button type="primary" @click="handleClick">click</hu-button>
    <hu-button type="primary" icon="loading">primary</hu-button>
    <hu-button type="success" icon="edit">success</hu-button>
    <hu-button type="error" prefix="left">danger</hu-button>
    <hu-button type="warning" suffix="right">warning</hu-button>
    <hu-button type="info" :loading="true" @click="handleClick">loading</hu-button>
  </div>
</template>

<script>
export default {
  name: "",
  setup() {
    const handleClick = () => {
      console.log("click");
    };
    return {
      handleClick
    };
  }
};
</script>
<style>
</style>