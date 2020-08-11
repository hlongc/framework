const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require('./user')

const secret = 'xiha'
const app = express()

app.use(bodyParser.json())

app.post('/register', async (req, res, next) => {
  try {
    const user = req.body
    const ret = await User.create(user)
    if (ret) {
      res.json({
        code: 0,
        message: '成功',
        data: { username: ret.username, id: ret._id }
      })
    } else {
      res.json({
        code: 0,
        message: '注册失败',
        data: null
      })
    }
  } catch (e) {
    console.log(e)
    res.end({
      code: 1,
      message: '注册失败',
      data: null
    })
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const user = req.body
    const ret = await User.findOne(user)
    if (ret) {
      const token = jwt.encode({ username: ret.username, id: ret._id }, secret)
      res.json({
        code: 0,
        message: 'success',
        data: {
          token
        }
      })
    } else {
      res.json({
        code: 1,
        message: '用户名或者密码错误',
        data: null
      })
    }
  } catch (e) {
    res.json({
      code: 1,
      message: '登录异常',
      data: null
    })
  }
})

const auth = async (req, res, next) => {
  const authorization = req.headers['authorization']
  if (authorization) {
    try {
      const token = authorization.split(' ')[1]
      const user = jwt.decode(token, secret)
      req.user = user
      next()
    } catch (e) {
      res.status(401).send('Not Allowed')
    }
  } else {
    res.status(401).send('Not Allowed')
  }
}

app.get('/order', auth, (req, res, next) => {
  res.json({
    code: 0,
    message: 'success',
    data: { ...req.user }
  })
})

app.listen(3333)

