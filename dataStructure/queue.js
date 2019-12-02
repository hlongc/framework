// 队列，先进先出
class Queue{
  constructor() {
    this.arr = []
  }
  enqueue(el) {
    this.arr.push(el)
    return this.arr.length
  }
  unqueue() {
    return this.arr.shift()
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.unqueue()
console.log(queue.arr)