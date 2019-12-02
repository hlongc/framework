const obj = {
  name: 'hlc',
  age: { a: 10 }
}

function trigger(key) {
  console.log('视图更新', key)
}

function observer(obj) {
  if (typeof obj !== 'object') return
  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

function defineReactive(obj, key, value) {
  observer(value) // 递归监测
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return value
    },
    set(newValue) {
      if (typeof newValue === 'object') { // 如果新的值是对象的话，继续监测
        observer(newValue)
      }
      trigger(key)
      value = newValue
    }
  })
}

observer(obj)
obj.age = { b: 100 }
obj.age.b = 120