const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (target: object, key: string | symbol): key is keyof typeof target => {
  return hasOwnProperty.call(target, key)
}

// compare whether a value has changed, accounting for NaN.
export const hasChanged = (newVal: any, oldVal: any): boolean => {
  return newVal !== oldVal && (newVal === newVal || oldVal === oldVal)
}

export const isFunction = (val: any): val is Function => typeof val === 'function'

export const isObject = (val: unknown): val is Object => {
  return typeof val === 'object' && val !== null
}

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isArray = (val: unknown): val is Array<any> => Array.isArray(val)

export const noop = () => {}