export const isObject = (target: unknown): target is Object => {
  return typeof target === 'object' && target !== null
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (target: object, key: string | symbol): key is keyof typeof target => {
  return hasOwnProperty.call(target, key)
}

// compare whether a value has changed, accounting for NaN.
export const hasChanged = (newVal: any, oldVal: any): boolean => {
  return newVal !== oldVal && (newVal === newVal || oldVal === oldVal)
}

export const isFunction = (val: any): val is Function => typeof val === 'function'

export const noop = () => {}