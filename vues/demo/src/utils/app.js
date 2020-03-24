import Promise from './promise_true'
// const fs = require('fs')

// require.context 这个是webpack的api
// const requireFiles = require.context('../files', false, /\w+\.txt$/)
// console.log(requireFiles)
// requireFiles.keys().forEach(fileName => {
//   console.log(fileName)
// })

// fs.readFile(__dirname + '/name.txt', 'utf8', (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

const demo = () => {
  return new Promise((resolve, reject) => {
    resolve('我是成功')
  })
}

// const p2 = demo().then(resolve => {
//   return p2
// })
// p2.catch(e => {
//   console.log(e)
// })

demo().then(res => {
  console.log(res)
  return 111
}).then(res => {
  console.log(res)
  return Promise.reject(new Error('异常'))
}).then(null, err => {
  console.log(err)
})
