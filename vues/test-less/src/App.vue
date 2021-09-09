<template>
  <div class="wrapper">
    wrapper
    <div class="container">
      container
      <div class="inner">
        inner
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
// :deep(.wrapper) {
//   color: darkmagenta;
//   :deep(.container) {
//     color: darkorange;
//     :deep(.inner) {
//       color: deeppink;
//     }
//   }
// }
</script>

<style lang="less" scoped>
/deep/.wrapper {
  color: darkmagenta;
  /deep/.container {
    color: darkorange;
    .inner {
      color: deeppink;
    }
  }
}
</style>
