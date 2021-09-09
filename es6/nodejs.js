console.log(process.argv)

console.log(__dirname)
console.log(__filename)
console.log(process.cwd())

const url = require('url')

console.log(url.parse('https://www.baidu.com/a/b/d?test=hlc&name=xixi', true).query)