
// let obj = {
//   a: 1
// }
// export default obj

// export function set(val) {
//   obj.a = val
// }

// export function print() {
//   console.log('test', obj)
// }

// let a = 1

// function add() {
//   return ++a
// }

// module.exports = {
//   get a() {
//     return a
//   },
//   add
// }

// const now = Date.now()
// const outdate = new Date(now + 1000 * 60).toGMTString()
// document.cookie = `test=xixi;expires=${outdate}`

// Promise.resolve(1).finally(() => {
//   console.log('嘻嘻')
//   return 2
// }).then(r => {
//   console.log(r)
// })

// exports require module __filename __dirname
// console.log(arguments)

const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module (id) {
  this.id = id
  this.exports = {}
}

Module.prototype.load = function () {
  const ext = path.extname(this.id)
  Module.extension[ext](this) // 处理对应的后缀
}

Module._cache = {}

Module.wrapper = [
  `(function(exports, require, module, __dirname, filename) {`,
  `})`
]
Module.extension = {
  '.js' (module) {
    const content = fs.readFileSync(module.id, 'utf8') // 取出文件的代码
    const fnStr = Module.wrapper[0] + content + Module.wrapper[1] // 拼接包裹函数
    const fn = vm.runInThisContext(fnStr) // 用包裹函数生成真正的函数
    const __dirname = path.dirname(module.id)
    // 改变this并执行函数
    fn.call(module.exports, module.exports, req, module, __dirname, module.id)
  },
  '.json' (module) {
    const json = fs.readFileSync(module.id, 'utf8')
    module.exports = json
  }
}
Module._resolveFileName = function (filename) {
  const absPath = path.resolve(__dirname, filename)
  const isExist = fs.existsSync(absPath) // 判断当前文件是否存在
  if (isExist) return absPath
  // 如果不存在的话，尝试添加后缀名再进行匹配 依次尝试js json
  const extensions = Object.keys(Module.extension)
  for (let i = 0; i < extensions.length; i++) {
    const newPath = absPath + extensions[i]
    if (fs.existsSync(newPath)) return newPath
  }
  // 都匹配失败就抛出错误
  throw new Error(`${filename} is no exist`)
}

function req (file) {
  const filename = Module._resolveFileName(file) // 解析路径
  const module = new Module(filename) // 创建模块
  module.load() // 加载模块
  return module.exports // 返回模块导出的值
}

const res = req('./test3')
console.log(res)
