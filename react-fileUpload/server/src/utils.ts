import fs, { WriteStream } from 'fs-extra'
import path from 'path'

export const DEFAULT_SIZE = 1024 * 1024 * 100 // 每次写入100MB
export const TEMP_DIR = path.resolve(__dirname, 'temp');
export const PUBLIC_DIR = path.resolve(__dirname, 'public');

export async function splitChunks(filename: string, size: number = DEFAULT_SIZE) {
  const tmpDir = path.resolve(TEMP_DIR, filename)
  await fs.mkdirp(tmpDir)
  const content = await fs.readFile(path.resolve(PUBLIC_DIR, filename)) // 将文件读出为buffer
  const len = content.length
  let i = 0, current = 0
  while (current < len) {
    await fs.writeFile(
      path.resolve(tmpDir, filename + '-' +i),
      content.slice(current, current + size)
    )
    i++
    current += size
  }
}



// const pipeStream = (filePath: string, writeStream: WriteStream) => new Promise(resolve => {
//   const readStream = fs.createReadStream(filePath);
//   readStream.on('end', async () => {
//       await fs.unlink(filePath);
//       resolve();
//   });
//   readStream.pipe(writeStream);
// });
function pipeStream(filename: string, ws: WriteStream) {
  return new Promise(resolve => {
    const rs = fs.createReadStream(filename)
    rs.on('end', async () => {
      await fs.unlink(filename) // 读取完毕以后删除文件
      resolve()
    })
    rs.pipe(ws)
  })
}


// export const mergeChunks = async (filename: string, size: number = DEFAULT_SIZE) => {
//   // 设置最后合并后文件的写入路径
//   const filePath = path.resolve(PUBLIC_DIR, filename)
//   // 获取之前分片保存的目录
//   const chunksDir = path.resolve(TEMP_DIR, filename)
//   // 读出该目录下的所有文件
//   const chunkFiles = await fs.readdir(chunksDir)
//   // 升序，保证顺序争取
//   chunkFiles.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]));
//   await Promise.all(
//       chunkFiles.map((chunkFile: string, index: number) => pipeStream(
//         path.resolve(chunksDir, chunkFile),
//         fs.createWriteStream(filePath, {
//             start: index * size
//         })
//       ))
//   )
//   await fs.rmdir(chunksDir)
// }

export async function mergeChunks(filename: string) {
  const chunksDir = path.resolve(TEMP_DIR, filename) // 取出临时文件的存放路径
  const filePath = path.resolve(PUBLIC_DIR, filename) // 文件最后写入的路径
  const chunkFiles = await fs.readdir(chunksDir) // 读出该路径下的文件名称
  chunkFiles.sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])) // 进行升序排列，保证顺序争取
  await Promise.all(chunkFiles.map((chunkFile: string, index: number) => {
    return pipeStream(path.resolve(chunksDir, chunkFile), fs.createWriteStream(filePath, {
      start: index * DEFAULT_SIZE
    }))
  }))
  await fs.rmdir(chunksDir)
}
