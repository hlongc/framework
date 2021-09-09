
class Node {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  _getNodeByIndex(index) {
    if (index < 0 || index >= this.size) throw new RangeError('索引越界')
    let target = this.head
    let i = 0
    while (i++ < index) {
      target = target.next
    }
    return target
  }
  add(index, value) {
    if (arguments.length === 1) {
      value = index
      index = this.size
    }
    if (index < 0 || index > this.size) throw new RangeError('索引越界')
    if (index === 0) {
      const oldHead = this.head
      this.head = new Node(value, oldHead)
    } else {
      // 得到上一个节点
      const prevNode = this._getNodeByIndex(index - 1)
      const next = prevNode.next
      prevNode.next = new Node(value, next)
    }
    this.size++
  }
  get(index) {
    return this._getNodeByIndex(index)
  }
  set(index, value) {
    const node = this._getNodeByIndex(index)
    node.value = value
    return node
  }
  remove(index) {
    if (index < 0 || index >= this.size) throw new RangeError('索引越界')
    if (index === 0) {
      this.head = this.head.next
    } else {
      const prev = this._getNodeByIndex(index - 1)
      const current = prev.next
      prev.next = current.next
    }
    this.size--
  }
  reverse() {
    const reverseLink = node => {
      if (node === null || node.next === null) return node
      const newHead = reverseLink(node.next)
      node.next.next = node
      node.next = null
      return newHead
    }
    this.head = reverseLink(this.head)
    return this.head
  }
  traversal(cb) {
    let current = this.head
    while (current) {
      cb(current)
      current = current.next
    }
  }
  clear() {
    this.head = null
    this.size = 0
  }
}

const link = new LinkedList()

link.add(0)
link.add(1)
link.add(2)
link.add(3)
link.add(4)
link.add(5)

let str1 = ''
let str2 = ''

link.traversal(node => {
  str1 += (node.value + '=>')  
})

console.log(str1.slice(0, -2))

link.reverse()

link.traversal(node => {
  str2 += (node.value + '=>')  
})

console.log(str2.slice(0, -2))