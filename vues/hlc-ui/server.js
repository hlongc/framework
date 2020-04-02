const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
 
const app = express()

app.all('*', function(req, res, next) {
  //设为指定的域支持跨域
  res.header('Access-Control-Allow-Origin', "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header('Access-Control-Allow-Credentials', true)
  res.header("X-Powered-By", ' 3.2.1')
  next()
})
 
app.post('/upload', upload.single('avator'), function (req, res) {
  const { originalname, size, destination, filename, path } = req.file
  res.send({ success: true, data: { originalname, size, destination, filename, path } })
})

app.listen(3000, () => {
  console.log('express run on 3000 port')
})