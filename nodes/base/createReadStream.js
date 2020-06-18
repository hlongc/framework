const fs = require('fs')
const ReadStream = require('./package/ReadStream')

const rs = new ReadStream('./name.txt', {
// const rs = fs.createReadStream('./name.txt', {
  flags: 'r', // 表示当前只读
  encoding: null, // 读出来的格式，默认是buffer
  autoClose: true, // 读完了以后自动关闭
  // emitClose: true, // 触发close事件
  start: 0, // 从0开始读
  // end: 9, // 读到9 start<=x<=end 闭区间
  highWaterMark: 3 // 每次读3个
})

let res = []
rs.on('open', () => {
  console.log('打开文件')
})

rs.on('data', data => {
  res.push(data) // 把buffer拼接起来
  console.log(data.toString())
})

rs.on('close', () => {
  console.log(Buffer.concat(res).toString())
  console.log('关闭文件流')
})

rs.on('error', err => {
  console.log(err, '----')
})

rs.on('end', () => {
  console.log('读取完毕')
})