const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;

export const TEXT = Symbol.for('TEXT') // 文本节点类型

export const ELEMENT = Symbol.for('ELEMENT') // 元素类型 div span p

export const FUNCTION_COMPONENT = Symbol.for('FUNCTION_COMPONENT') // 函数组件

export const CLASS_COMPONENT = Symbol.for('CLASS_COMPONENT') // 类组件

export const MOVE = 'MOVE'

export const REMOVE = 'REMOVE'

export const INSERT = 'INSERT'