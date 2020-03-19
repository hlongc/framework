// ?: 匹配不捕获
// . 匹配任意字符
// \r\n匹配回车和换行
// + 至少匹配一个
// ? 尽可能的少匹配
const defaultReg = /\{\{((?:.|\r?\n)+?)\}\}/

const util = {
  getValue(vm, expr) {
    const keys = expr.split('.') // {{ info.name }} => [info, name]
    return keys.reduce((memo, cur) => memo[cur], vm)
  },
  compileText(node, vm) { // 编译文本 替换{{ info.name }}
    // 替换文本内容
    node.templateStr = node.templateStr || node.textContent // 记住第一次模板，在后面解析使用
    node.textContent = node.templateStr.replace(defaultReg, function() {
      // 对捕获的进行空格删除
      return util.getValue(vm, arguments[1].trim())
    })
  }
}

export function compiler(node, vm) {
  let childNodes = node.childNodes;
  [...childNodes].forEach(node => {
    if (node.nodeType === 1) { // 1表示元素
      compiler(node, vm) // 如果是元素则递归编译
    } else if (node.nodeType === 3) { // 3表示文本节点
      util.compileText(node, vm)
    }
  })
}