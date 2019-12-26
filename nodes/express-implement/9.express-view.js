const express = require('express')

const app = express()

app.set('views', 'view') // 设置模板所在目录，默认是views

app.set('view engine', 'html') // 设置默认后缀

app.engine('html', require('ejs').__express) // 遇到html文件用ejs规则来渲染

app.get('/', (req, res) => {
  res.render('hello', { name: 'hlongc' })
})

app.listen(3000)