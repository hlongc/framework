const a = [1, 2, 3]
a.join = a.shift
console.log(a == 1 && a == 2 && a == 3)

const b = {
  value: 1,
  [Symbol.toPrimitive]() {
    return this.value++
  },
  valueOf() {
    return this.value++
  },
  toString() {
    return this.value++
  }
}
console.log(b == 1 && b == 2 && b == 3)
// 对象b转换为原始值调用方法的顺序 [Symbol.toPrimitive] => valueOf => toString
console.log(b + 1)
