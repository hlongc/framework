const obj = {
  a: 1,
  b: 2,
  c: [1, 2, 3]
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`获取${key}`)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log(`设置${key}为${value}`)
    console.log(receiver)
    return Reflect.set(target, key, value, receiver)
  }
})

console.log(proxy.a)
proxy.a++
proxy.c.push(4)
console.log(proxy.c)