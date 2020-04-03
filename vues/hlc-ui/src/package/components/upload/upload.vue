<template>
  <div class="hlc-upload">
    <template v-if="drag">
      <drag :accept="accept" @uploadFile="uploadFile" />
    </template>
    <template v-else>
      <div @click="callWindow" class="hlc-upload-btn">
        <slot></slot>
      </div>
      <input class="hlc-upload-realInput" ref="realInput" type="file" :name="name" :multiple="mutiple" :accept="accept" @change="handleChange">
    </template>
    <slot name="tip"></slot>
    <ul class="hlc-upload-filelist">
      <li v-for="file in files" :key="file.uid" class="file-item">
        <hlc-icon type="lajixiang"></hlc-icon>
        {{ file.name }}
        <span v-if="file.status === 'success'" class="right-icon">
          <hlc-icon class="zhengque" type="zhengque-"></hlc-icon>
          <hlc-icon class="close" title="删除" @click.native="removeFile(file)" type="close"></hlc-icon>
        </span>
        <div v-else class="progress-container">
          <hlc-progress :strokeWith="3" :percent="file.percentage" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import ajax from './ajax'
import drag from './dragUpload.vue'

export default {
  name: 'hlc-upload',
  components: { drag },
  props: {
    name: {
      type: String,
      default: ''
    },
    accept: {
      type: '',
      default: '*'
    },
    drag: {
      type: Boolean,
      default: false
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
    beforeRemove: Function,
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
      const self = this
      const options = {
        file,
        name: this.name,
        action: this.action,
        onError: e => {
          this.handleError(e, file)
        },
        onProgress: e => {
          this.handleProgress(e, file)
        },
        onSuccess: e => {
          this.handleSuccess(e, file)
        }
      }
      const req = this.httpRequest(options)
      this.requestMap[uid] = req
      if (req && req.then) { // 如果当前是promise,那么调用回调
        req.then(options.onSuccess, options.onError)
      }
    },
    getFile(file) {
      return this.files.find(f => f.uid === file.uid)
    },
    handleError(e, rowFile) {
      const curFile = this.getFile(rowFile)
      curFile.status = 'fail'
      this.onChange(rowFile)
      this.onError(e)
    },
    handleSuccess(e, rowFile) {
      const curFile = this.getFile(rowFile)
      curFile.status = 'success'
      this.onChange(rowFile)
      this.onSuccess(e, rowFile)
    },
    handleProgress(e, rowFile) {
      // 找到构造的文件信息
      const curFile = this.getFile(rowFile)
      curFile.status = 'uploading'
      curFile.percentage = e.percent || 0
      this.onProgress(e)
    },
    upload(file) {
      // 文件上传之前先看用户有没有beforeUpload函数，有并且返回true那就继续上传，false就不上传
      if (this.beforeUpload && !this.beforeUpload(file)) {
        this.files = this.files.filter(cur => cur.uid !== file.uid)
        return
      }
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
    },
    // 删除文件
    removeFile(file) {
      // 如果用户传入了beforeRemove，并且返回值为false，那么不删除
      if (this.beforeRemove && !this.beforeRemove(file)) return
      this.files = this.files.filter(f => f.uid !== file.uid)
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
  .hlc-upload-filelist {
    .file-item {
      list-style: none;
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      &:hover {
        background-color: #f5f7fa;
      }
      .right-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 16px;
        cursor: pointer;
        &:hover .close {
          display: inline-block;
        }
        &:hover .zhengque {
          display: none;
        }
        .zhengque {
          color: #67c23a;
        }
        .close {
          display: none;
        }
      }
      .progress-container {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
      }
    }
  }
}
</style>


