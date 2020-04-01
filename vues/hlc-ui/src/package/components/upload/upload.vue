<template>
  <div class="hlc-upload">
    <div @click="callWindow" class="hlc-upload-btn">
      <slot></slot>
    </div>
    <input class="hlc-upload-realInput" ref="realInput" type="file" :name="name" :multiple="mutiple" :accept="accept" @change="handleChange">
    <slot name="tip"></slot>
    {{ files.length }}
  </div>
</template>
<script>
import ajax from './ajax'

export default {
  name: 'hlc-upload',
  props: {
    name: {
      type: String,
      default: ''
    },
    accept: {
      type: '',
      default: '*'
    },
    fileList: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      default: 5
    },
    mutiple: {
      type:  Boolean,
      default: false
    },
    onExceed: {
      type: Function,
      default: () => {}
    },
    onProgress: {
      type: Function,
      default: () => {}
    },
    onSuccess: {
      type: Function,
      default: () => {}
    },
    onError: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    httpRequest: {
      type: Function,
      default: ajax
    },
    beforeUpload: Function
  },
  data() {
    return {
      index: 0,
      requestMap: {}, // 保存请求信息
      files: []
    }
  },
  watch: {
    fileList: {
      handler(news) {
        this.files = news.map(item => {
          return { ...item, uid: Math.random() + this.index++, status: 'success' }
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    callWindow() {
      // 先把之前的value重置
      this.$refs.realInput.value = ''
      // 弹出文件选择框
      this.$refs.realInput.click()
    },
    handleStart(file) {
      file.uid = Math.random() + this.index++
      // 格式化文件信息
      const selfFile = {
        name: file.name,
        size: file.size,
        status: 'ready',
        uid: file.uid,
        percentage: 0,
        file
      }
      this.files.push(selfFile)
      this.onChange(selfFile)
    },
    postFile(file) {
      const uid = file.uid
      const options = {
        file,
        name: this.name,
        action: this.action,
        onError(e) {

        },
        onProgress(e) {

        },
        onSuccess(e) {

        }
      }
      const req = this.httpRequest(options)
      this.requestMap[uid] = req
      if (req && req.then) { // 如果当前是promise,那么调用回调
        req.then(options.onSuccess, options.onError)
      }
    },
    upload(file) {
      // 文件上传之前先看用户有没有beforeUpload函数，有并且返回true那就继续上传，false就不上传
      if (this.beforeUpload && !this.beforeUpload(file)) {
        this.files = this.files.filter(cur => cur.uid !== file.uid)
        return
      }
      console.log('继续上传')
      this.postFile(file)
    },
    uploadFile(files) {
      if (files.length + this.files.length > this.limit) {
        return this.onExceed(files, this.fileList)
      }
      [...files].forEach(file => {
        this.handleStart(file)
        this.upload(file)
      })
    },
    handleChange(e) {
      const files = e.target.files
      this.uploadFile(files)
    }
  }
}
</script>
<style lang="scss">
.hlc-upload {
  .hlc-upload-btn {
    display: inline-block;
  }
  .hlc-upload-realInput {
    display: none;
  }
}
</style>


