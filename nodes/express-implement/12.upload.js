const express = require('./express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) { // multer默认保存文件没有后缀名，需要自己设置
    var singfileArray = file.originalname.split('.');
    var fileExtension = singfileArray[singfileArray.length - 1];
    cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
    console.log(file);
  }
})

const upload = multer({
  storage: storage
})

const app = express()
app.use(express.static(__dirname))

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.send({ code: 0, success: true })
})

app.listen(3000)