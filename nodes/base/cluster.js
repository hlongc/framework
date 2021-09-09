const cluster = require('cluster')
const os = require('os')
const express = require('express')
const path = require('path')

const app = express()

const cpus = os.cpus().length
// 多核cpu开启多进程
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, singal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  app.get('/', (_req, res) => {
    console.log('hello')
    res.end('hello wordl')
  })
  app.listen(3344, () => {
    console.log(`worker ${process.pid} started`)
  })
}