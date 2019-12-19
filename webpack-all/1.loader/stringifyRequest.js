const path = require('path')

function stringifyRequest(url) {
  const absPath = path.resolve(url)
  console.log(absPath)
  const absDir = path.resolve(__dirname)
  console.log(absDir)
  return './' + path.relative(absDir, absPath)
}

// const p = stringifyRequest('./src/index.js')
// console.log(p)
// const p1 = stringifyRequest('./src/style.css')
// console.log(p1)
const p2 = stringifyRequest('mime') // 寻找模块相对于项目的根路径
console.log(p2)