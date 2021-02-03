<template>
  <svg class="hu-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${type}`"></use>
  </svg>
</template>

<script>
import "./font.js";
export default {
  name: "hu-icon",
  props: {
    type: {
      type: String,
      required: true
    }
  }
};
</script>