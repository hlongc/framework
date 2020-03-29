<template>
  <div id="app">
    <hlc-button type="primary">主要按钮</hlc-button>
    <hlc-button type="success">成功按钮</hlc-button>
    <hlc-button type="warning">警告按钮</hlc-button>
    <hlc-button type="danger">错误按钮</hlc-button>
    <hlc-button type="info">信息按钮</hlc-button>

    <hlc-button type="primary" prefix-icon="copy">主要按钮</hlc-button>
    <hlc-button type="success" prefix-icon="smile-fill">成功按钮</hlc-button>
    <hlc-button type="warning" suffix-icon="add">警告按钮</hlc-button>
    <hlc-button type="danger" prefix-icon="close">错误按钮</hlc-button>
    <hlc-button type="info" suffix-icon="link">信息按钮</hlc-button>
    
    <hlc-icon type="copy" />
    <hlc-icon type="gift" />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
