<template>
  <ul class="dropdown-menu">
    <slot></slot>
  </ul>
</template>
<style lang="less" scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  display: block;
  list-style: none;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
}
</style>
