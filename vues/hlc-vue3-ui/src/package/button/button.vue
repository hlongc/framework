<template>
  <button :class="classes" :disabled="loading">
    <hu-icon v-if="icon && !prefix && !loading" :type="icon" class="icon"></hu-icon>
    <hu-icon v-if="prefix" :type="prefix" class="icon"></hu-icon>
    <hu-icon v-if="loading" type="loading" class="prefix loading"></hu-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <hu-icon v-if="suffix" :type="suffix" class="suffix"></hu-icon>
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  name: "hu-button",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(value) {
        const types = ["primary", "success", "info", "error", "warning"];
        if (!types.includes(value)) {
          throw Error(`props type only ${types.join(",")}`);
        }
        return true;
      }
    },
    icon: String,
    prefix: String,
    suffix: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() => ["hu-button", `hu-button-${props.type}`]);
    return {
      classes
    };
  }
};
</script>
<style>
</style>