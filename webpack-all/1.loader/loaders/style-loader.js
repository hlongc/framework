const utils = require('loader-utils')
const postcss = require('postcss')
const tokenizer = require('css-selector-tokenizer')

module.exports = () => {}
// !! 表示只用当前的loader去加载，不去走webpack配置的loader,避免死循环
// utils.stringifyRequest 把当前路径转换为相对于项目的绝对的路径 也就是webpack的模块ID
module.exports.pitch = function(remainingPath) {
  return (
    `
      var style = document.createElement('style');
      style.innerHTML = require(${utils.stringifyRequest(this, '!!' + remainingPath)});
      document.head.appendChild(style);
    `
  )
}