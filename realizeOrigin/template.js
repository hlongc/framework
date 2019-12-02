// 实现ejs基本模板语法
// let str = "${ name }今年${age}岁了"
// const data = { name: 'hulongchao', age: 24 }

// const reg = /\$\{([\s\S]+?)\}/g
// let result = null
// while (result = reg.exec(str)) {
//   str = str.replace(result[0], data[result[1].trim()])
// }
// console.log(str)
// const fn = new Function(`let str = '123'; return str`)
// console.log(fn())

const fs = require('fs')
const path = require('path')
const obj = { arr: [1, 2, 3] }
let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8')
function render(str, obj) {
  str = str.replace(/<%=([\s\S]+?)%>/g, function () {
    return '${' + arguments[1] + '}'
  })
  const head = 'let str = "";\r\nwith(obj){\r\nstr=`\r\n'
  const content = str.replace(/<%([\s\S]+?)%>/g, function () {
    return '`\r\n' + arguments[1] + '\r\nstr+=`'
  })
  const tail = '`\r\n}\r\nreturn str;'
  const input = head + content + tail
  return new Function('obj', input)(obj)
}

const result = render(html, obj)
console.log(result)