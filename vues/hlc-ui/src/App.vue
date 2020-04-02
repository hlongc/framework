<template>
  <div id="app">

    <div class="upload-container">
      <hlc-upload
        name="avator"
        :file-list="fileList"
        action="http://localhost:3000/upload"
        accept="image/png,image/jpg"
        :limit="3"
        mutiple
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :beforeUpload="beforeUpload"
      >
        <hlc-button type="primary" prefix-icon="shangchuan">文件上传</hlc-button>
        <p slot="tip">仅限.jpg,.jpeg,.png格式,最多五张,且每张大小不超过500kb</p>
      </hlc-upload>
    </div>
    <!-- <hlc-container>
      <hlc-header height="240px">
        <p>
          <hlc-input type="text" v-model="username"/>
          {{ username }}
          <hlc-input type="text" v-model="username" disabled />
          <hlc-input type="text" v-model="username" clearable />
        </p>
        <p>
          <hlc-input type="password" v-model="password"/>
          {{ password }}
          <hlc-input type="password" v-model="password" show-password />
        </p>
        <p>
          <hlc-input type="text" v-model="username" prefix-icon="smile-fill"/>
          <hlc-input type="text" v-model="username" suffix-icon="add"/>
        </p>
      </hlc-header>
      <hlc-main>
        <hlc-button type="primary">主要按钮</hlc-button>
        <hlc-button type="success">成功按钮</hlc-button>
        <hlc-button type="warning">警告按钮</hlc-button>
        <hlc-button type="danger">错误按钮</hlc-button>
        <hlc-button type="info">信息按钮</hlc-button>
      </hlc-main>
    </hlc-container>

    <hlc-container>
      <hlc-header>Header</hlc-header>
      <hlc-main>
        <hlc-button type="primary" prefix-icon="copy" @click="test">主要按钮</hlc-button>
        <hlc-button type="success" prefix-icon="smile-fill">成功按钮</hlc-button>
        <hlc-button type="warning" suffix-icon="add">警告按钮</hlc-button>
        <hlc-button type="danger" prefix-icon="close">错误按钮</hlc-button>
        <hlc-button type="info" suffix-icon="link">信息按钮</hlc-button>
      </hlc-main>
      <hlc-footer>Footer</hlc-footer>
    </hlc-container>

    <hlc-container>
      <hlc-aside width="200px">Aside</hlc-aside>
      <hlc-main>
        <hlc-button-group>
          <hlc-button type="primary" prefix-icon="close">错误按钮</hlc-button>
          <hlc-button type="info" suffix-icon="link">信息按钮</hlc-button>
          <hlc-button type="danger" suffix-icon="link">信息按钮</hlc-button>
        </hlc-button-group>
      </hlc-main>
    </hlc-container>

    <hlc-container>
      <hlc-header>Header</hlc-header>
      <hlc-container>
        <hlc-aside width="200px">Aside</hlc-aside>
        <hlc-main>
          <hlc-icon type="copy"/>
          <hlc-icon type="gift"/>
        </hlc-main>
      </hlc-container>
    </hlc-container>

    <hlc-container>
      <hlc-header>Header</hlc-header>
      <hlc-container>
        <hlc-aside width="200px">Aside</hlc-aside>
        <hlc-container>
          <hlc-main>Main</hlc-main>
          <hlc-footer>Footer</hlc-footer>
        </hlc-container>
      </hlc-container>
    </hlc-container>

    <hlc-container>
      <hlc-aside width="200px">Aside</hlc-aside>
      <hlc-container>
        <hlc-header>Header</hlc-header>
        <hlc-main>Main</hlc-main>
      </hlc-container>
    </hlc-container>

    <hlc-container>
      <hlc-aside width="200px">Aside</hlc-aside>
      <hlc-container>
        <hlc-header>Header</hlc-header>
        <hlc-main>Main</hlc-main>
        <hlc-footer>Footer</hlc-footer>
      </hlc-container>
    </hlc-container>

    <div class="empty"></div>
    <hlc-row>
      <hlc-col :span="12">
        <div class="bg-green">嘻嘻</div>
      </hlc-col>
      <hlc-col :span="8" :offset="4">
        <div class="bg-pink">哈哈</div>
      </hlc-col>
    </hlc-row>

    <div class="empty"></div>
    <hlc-row justify="space-around">
      <hlc-col :span="8">
        <div class="bg-green">嘻嘻</div>
      </hlc-col>
      <hlc-col :span="8">
        <div class="bg-pink">哈哈</div>
      </hlc-col>
    </hlc-row>

    <div class="empty"></div>
    <hlc-row :gutter="20">
      <hlc-col :span="6">
        <div class="bg-green">嘻嘻</div>
      </hlc-col>
      <hlc-col :span="6">
        <div class="bg-pink">哈哈</div>
      </hlc-col>
      <hlc-col :span="6">
        <div class="bg-pink">呵呵</div>
      </hlc-col>
      <hlc-col :span="6">
        <div class="bg-pink">嘿嘿</div>
      </hlc-col>
    </hlc-row>

    <div class="empty"></div>
    <hlc-row :gutter="10">
      <hlc-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple"></div>
      </hlc-col>
      <hlc-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light"></div>
      </hlc-col>
      <hlc-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple"></div>
      </hlc-col>
      <hlc-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </hlc-col>
    </hlc-row> -->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      username: "",
      password: "",
      fileList: []
    };
  },
  methods: {
    test($event) {
      console.log("点击", $event);
    },
    handleExceed(files, fileList) {
      console.log(files, fileList)
    },
    handleSuccess() {

    },
    handleError() {

    },
    handleProgress() {

    },
    handleChange(file) {
      console.log(file)
    },
    beforeUpload(file) {
      if (file.size / 1024 > 500) {
        console.log(`文件: ${file.name} 超出500kb,上传失败`)
        return false
      }
      const types = ['.jpg', '.jpeg', '.png']
      if (!types.some(type => file.name.endsWith(type))) {
        console.log(`文件: ${file.name} 格式不正确,只能上传${types.join(',')}`)
        return false
      }
      return true
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.upload-container {
  width: 500px;
}
.empty {
  height: 20px;
}
.bg-green {
  border-radius: 4px;
  background-color: greenyellow;
}
.bg-pink {
  border-radius: 4px;
  background-color: pink;
}
.hlc-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.hlc-header,
.hlc-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.hlc-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.hlc-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .hlc-container {
  margin-bottom: 40px;
}

.hlc-container:nth-child(5) .hlc-aside,
.hlc-container:nth-child(6) .hlc-aside {
  line-height: 260px;
}

.hlc-container:nth-child(7) .hlc-aside {
  line-height: 320px;
}
</style>
