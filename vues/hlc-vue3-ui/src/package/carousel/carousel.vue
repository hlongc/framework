<template>
  <div
    class="hu-carousel"
    :style="style"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div class="view-port">
      <slot></slot>
      <p class="dot-wrapper">
        <span
          v-for="dot in total"
          :key="dot"
          :class="{ dot: true, active: dot - 1 === selected }"
          @click="go(dot - 1)"
        >{{ dot }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  provide,
  onMounted,
  computed,
  toRefs,
  onBeforeUnmount,
  nextTick
} from "vue";

export default {
  name: "hu-carousel",
  props: {
    height: {
      type: String,
      default: "200px"
    },
    loop: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 2000
    },
    auto: {
      type: Boolean,
      default: true
    },
    initial: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const state = reactive({
      currentIndex: 0,
      total: 0, // 全部的Item数量
      reverse: false, // 是否反向动画
      selected: props.initial // 当前正在轮播的索引值
    });

    const style = computed(() => ({
      height: props.height
    }));

    const changeIndex = () => {
      state.currentIndex++;
    };
    provide("info", { state, changeIndex });
    let timer = null;
    const methods = {
      handleMouseenter() {
        clearInterval(timer);
        timer = null;
      },
      handleMouseleave() {
        methods.run();
      },
      go(newIndex) {
        const curIndex = state.selected;
        if (newIndex === state.total) newIndex = 0;
        if (newIndex === -1) newIndex = state.total - 1;
        state.reverse = newIndex < curIndex;
        if (timer && props.loop) {
          if (newIndex === 0 && curIndex === state.total - 1) {
            state.reverse = false;
          }
          if (newIndex === state.total - 1 && curIndex === 0) {
            state.reverse = true;
          }
        }
        nextTick(() => {
          // 动画出现以后才修改位置
          state.selected = newIndex;
        });
      },
      run() {
        if (props.auto) {
          timer = setInterval(() => {
            methods.go(state.selected - 1);
          }, props.delay);
        }
      }
    };

    onMounted(() => {
      // 在子组件渲染完成以后更新total
      state.total = state.currentIndex;
      methods.run();
    });
    // 清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      style,
      ...toRefs(state),
      ...methods
    };
  }
};
</script>
<style>
</style>