<template>
  <div :class="classes">
    {{ message }}
  </div>
</template>

<script>
import { computed } from "vue";
import Icon from "../icon/icon.vue";
export default {
  name: "Message",
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: "info",
      validator(value) {
        const types = ["success", "info", "warning", "error"];
        if (!types.includes(value)) {
          throw Error(`props type only ${types.join(",")}`);
        }
        return true;
      }
    },
    message: String,
    duration: {
      type: Number,
      default: 2000
    }
  },
  setup(props) {
    const classes = computed(() => {
      return ["hu-message", props.type];
    });
    return {
      classes
    };
  }
};
</script>
<style>
</style>