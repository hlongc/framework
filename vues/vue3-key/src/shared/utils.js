export const isObject = obj => typeof obj === 'object' && obj !== null

export const hasChanged = (val, oldVal) => val !== oldVal

export const hasOwnProperty = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export const isFunction = fn => typeof fn === 'function'