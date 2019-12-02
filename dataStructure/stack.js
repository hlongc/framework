// 栈 先进后出 js函数执行栈一样
class Stack{
  constructor() {
    this.arr = []
  }
  push(el) {
    this.arr.push(el)
    return this.arr.length
  }
  pop() {
    return this.arr.pop()
  }
}

const stack = new Stack
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop()
console.log(stack.arr)