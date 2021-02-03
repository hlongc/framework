<template>
  <transition name="carousel" :class="classes">
    <div class="hu-carousel-item" v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { inject, onMounted, computed } from "vue";

export default {
  name: "hu-carousel-item",
  setup() {
    const { state, changeIndex } = inject("info");
    const index = state.currentIndex; // 当前item的索引
    changeIndex();
    // 根据索引设置当前显示的item
    const visible = computed(() => {
      return state.selected === index;
    });
    const classes = computed(() => {
      return { reverse: state.reverse };
    });
    return {
      visible,
      classes
    };
  }
};
</script>
<style>
</style>