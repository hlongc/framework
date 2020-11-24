<template>
  <teleport to="#modal">
    <div class="modal" v-if="visible">
      <h3>
        <slot name="title">我是modal</slot>
      </h3>
      <button @click="handleClose">close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    "close-modal": null
  },
  setup(props, context) {
    const handleClose = () => {
      context.emit("close-modal");
    };
    return {
      handleClose
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 350px;
  height: 180px;
  text-align: center;
  border: 1px solid firebrick;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
