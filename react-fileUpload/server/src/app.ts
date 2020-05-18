import express, { Request, Response, NextFunction } from 'express'
import logger from 'morgan' // 日志打印
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import httpError from 'http-errors'
import cors from 'cors' // 支持跨域
import path from 'path'
import fs from 'fs-extra'
import { mergeChunks, TEMP_DIR, PUBLIC_DIR } from './utils'
// import multiparty from 'multiparty' // 文件上传

const app = express()

app.use(logger('dev')) // 打印日志
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // 支持跨域
app.use(express.static(PUBLIC_DIR)) // 设置静态文件根路径

app.post('/upload/:filename/:chunkname/:start', async function(req: Request, res: Response, _next: NextFunction) {
  const { filename, chunkname, start } = req.params
  const starts = isNaN(Number(start)) ? 0 : Number(start)
  const tmpDir = path.resolve(TEMP_DIR, filename)
  if (!fs.pathExistsSync(tmpDir)) {
    fs.mkdirsSync(tmpDir)
  }
  const chunkpath = path.resolve(tmpDir, chunkname)
  // 采用追加的模式进行写入，因为后续有断点续传
  const ws = fs.createWriteStream(chunkpath, {
    start: starts,
    flags: 'a'
  })
  req.on('end', () => {
    ws.close() // 关闭可写流
    res.json({
      success: true,
      chunkname
    })
  })
  // 有可能前端暂停，此时就报错了
  req.on('error', () => {
    ws.close()
  })
  req.on('close', () => {
    ws.close()
  })
  req.pipe(ws)
})

app.get('/merge/:filename', async function(req: Request, res: Response) {
  const { filename } = req.params
  await mergeChunks(filename)
  res.json({
    success: true,
    filename
  })
})

app.get('/validate/:filename', async function(req: Request, res: Response) {
  const { filename } = req.params
  const targetPath = path.resolve(PUBLIC_DIR, filename)
  const isExist = await fs.pathExists(targetPath)
  // 如果已经上传过了，那就不用再上传了，实现秒传
  if (isExist) {
    return res.json({
      success: true,
      needUpload: false
    })
  }
  const tmpDir = path.resolve(TEMP_DIR, filename)
  const isExistTemp = await fs.pathExists(tmpDir)
  // 说明之前没上传过
  if (!isExistTemp) {
    return res.json({
      success: true,
      neepUpload: true,
      complete: []
    })
  }
  // 如果之前已经上传过部分分片，那么返回上传的进度
  const files = await fs.readdir(tmpDir)
  // 获取每个分片的上传进度和状态,让前端按照上次的进度继续上传
  const complete = await Promise.all(files.map(file => {
    return new Promise(async (resolve) => {
      const stat = await fs.stat(path.resolve(tmpDir, file))
      resolve({
        size: stat.size,
        chunkname: file
      })
    })
  }))
  return res.json({
    success: true,
    neepUpload: true,
    complete
  })
})

// app.post('/upload', async function(req: Request, res: Response, next: NextFunction) {
//   let form = new multiparty.Form()
//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return next(err)
//     }
//     const filename = fields.filename[0]
//     const sourcePath = files.chunk[0].path
//     // 移动文件位置
//     await fs.move(sourcePath, path.resolve(__dirname, 'public', filename) , { overwrite: true })
//     res.send({
//       success: true
//     })
//   })
// })

app.use(function(_req, _res, next: NextFunction) {
  next(httpError(404))
})

app.use(function (err: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || INTERNAL_SERVER_ERROR)
  res.send({
    success: false,
    error: err
  })
})

export default app
