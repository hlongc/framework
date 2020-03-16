const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

// 读出服务端打包出来的那个文件
// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8')
// 采用json的方式，每次打包以后，服务不需要重启，而是读json文件
// 使用json 和 manifest的方式就不需要在/public/index.ssr.html手动添加<script src="client.bundle.js" defer></script>,代码会自动注入
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// 读出服务端的模板
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')

const clientManifest = require('./dist/vue-ssr-client-manifest.json')

// vue提供的服务端渲染的包,创建渲染函数
const renderer = createBundleRenderer(serverBundle, { template, clientManifest })

const app = express()

app.get('/', (req, res) => {
  const context = { url: req.url }
  // 把vm渲染到模板指定的vue-ssr-outlet处，最后返回到页面，只是返回了一个字符串，并没有加载js，所以没有vue的功能
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log('err1', err)
      return res.end('Server Internal Error')
    }
    res.send(html)
  })
})

// 顺序必须在下面，不然访问/express内部会默认返回index.html
app.use(express.static(path.resolve(__dirname, 'dist')))
// 如果访问的路径不存在，那么重定向到首页
app.get('*', (req, res) => {
  const context = { url: req.url }
  // 把vm渲染到模板指定的vue-ssr-outlet处，最后返回到页面，只是返回了一个字符串，并没有加载js，所以没有vue的功能
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log('err2', err)
      return res.end('Server Internal Error')
    }
    res.send(html)
  })
})

app.listen(3004) 