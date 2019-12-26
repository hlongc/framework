const express = require('./express')

const app = express()

app.use((req, res, next) => {
  const start = Date.now()
  // 通过改写end方法，可以实现打印日志类似的功能
  const oldEnd = res.end
  res.end = (...args) => {
    const end = Date.now()
    console.log(end - start)
    oldEnd.call(res, ...args)
  }
  next()
})

app.get('/', (req, res) => {
  setTimeout(() => {
    res.end('/')
  }, 1000)
})

app.get('/user', (req, res) => {
  setTimeout(() => {
    res.end('user')
  }, 2000)
})

app.listen(3000)