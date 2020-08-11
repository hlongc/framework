const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27017/jwt', { useNewUrlParser: true, useUnifiedTopology: true })
// 建立模型
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
})
// 通过模型产生表
const User = mongoose.model('User', UserSchema)

module.exports = User