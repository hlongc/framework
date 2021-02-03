<template>
  <div class="hu-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";

export default {
  name: "hu-button-group",
  setup(props) {
    onMounted(() => {
      const context = getCurrentInstance(); // vue实例，相当于this
      const el = context.ctx.$el;
      const children = el.children;
      // 检测子元素是否为button
      for (let i = 0; i < children.length; i++) {
        console.assert(
          children[i].tagName === "BUTTON",
          "hu-button-group child must be hu-button"
        );
      }
    });
  }
};
</script>
