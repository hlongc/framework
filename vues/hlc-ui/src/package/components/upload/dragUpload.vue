<template>
  <div class="hlc-upload-drag"
    :class="{ hover }"
    @drop.prevent="hanldDrop"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
  >
    <p><hlc-icon type="shangchuan"></hlc-icon></p>
    <p>将文件拖拽到此处进行上传</p>
  </div>
</template>
<script>
export default {
  name: 'hlc-upload-drag',
  data() {
    return {
      hover: false
    }
  },
  props: {
    accept: String
  },
  methods: {
    hanldDrop(e) {
      this.$emit('uploadFile', e.dataTransfer.files)
      if (!this.accept) {
        
      } else {
        console.log(e)
      }
    },
    dragOver() {
      this.hover = true
    },
    dragLeave() {
      this.hover = false
    }
  }
}
</script>
<style lang="scss">
.hlc-upload-drag {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  border-radius: 10px;
  margin: 20px 0;
  transition: all .4s ease;
  background-color: #fff;
  &.hover, &:hover {
    border-color: #409EFF;
  }
  p {
    text-align: center;
    .hlc-icon {
      font-size: 35px;
    }
  }
}
</style>


