// 文本节点
export const HOST_TEXT = Symbol.for('HOST_TEXT')
// 根fiber
export const HOST_ROOT = Symbol.for('HOST_ROOT')
// 原生html元素 p div span
export const HOST_COMPONENT = Symbol.for('HOST_COMPONENT')
// 类组件
export const CLASS_COMPONENT = Symbol.for('CLASS_COMPONENT')
// 函数组件
export const FUNCTION_COMPONENT = Symbol.for('FUNCTION_COMPONENT')


// 操作类型

// 新增
export const PLACEMENT = Symbol.for('PLACEMENT')
// 更新
export const UPDATE = Symbol.for('UPDATE')
// 删除
export const DELETION = Symbol.for('DELETION')