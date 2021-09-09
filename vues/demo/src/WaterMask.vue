<template>
  <div class="waterMask">
    <div class="item">
      <span>公司信息</span>
      <span>用户信息</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WaterMask',
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.waterMask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999999999999; // 将组件层级提到最高，以覆盖在所有页面之上
  pointer-events: none; // 让该组件鼠标事件失效，不影响用户操作其层级之下的页面
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: transparent; // 背景色透明
  .item {
    font-size: 40px;
    padding: 10px;
    color: rgba(0,0,0,0.0009); // 文字不透明度降至最低，肉眼不可见，通过图片处理工具如ps处理后才可见
  }
}
</style>