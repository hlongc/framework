const express = require('express')
const VueServerRender = require('vue-server-renderer')
const Vue = require('vue')
const fs = require('fs')

const vm = new Vue({
  template: `<div>hello world</div>`
})
// 读出模板
const template = fs.readFileSync('./index.html', 'utf8')

// vue提供的服务端渲染的包,创建渲染函数
const render = VueServerRender.createRenderer({ template })

const app = express()

app.use('/', (req, res) => {
  // 把vm渲染到模板指定的vue-ssr-outlet处，最后返回到页面
  render.renderToString(vm, (err, html) => {
    res.send(html)
  })
})

app.listen(3000)