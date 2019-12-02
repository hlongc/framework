// 单向链表 一个链表中节点包括两个信息 一个链表头部和尾部，头部是数据，尾部是next元素的指针
class Node{
  constructor(el) {
    this.element = el
    this.next = null
  }
}

class Link{
  constructor() {
    this.head = null
    this.length = 0
  }
  append(el) {
    const node = new Node(el)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
  }
  insert(index, el) {
    if (index >= 0 && index < this.length) {
      const newNode = new Node(el)
      let idx = 0
      let node = this.head
      while(++idx <= index) {
        node = node.next
      }
      const oldNext = node.next
      node.next = newNode
      newNode.next = oldNext
      this.length++
    } else {
      throw new Error('超出链表长度')
    }
  }
}
// 100 300 200 89 98
const link = new Link
link.append(100)
link.append(300)
link.append(200)
link.append(89)
link.append(98)
console.log(link)
link.insert(5, 'hello')
console.log(link)