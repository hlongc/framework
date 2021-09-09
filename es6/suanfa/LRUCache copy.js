class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

// 采用双向链表+map缓存
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.size = 0
    this.map = new Map()
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }
  get(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key)
      this.moveToHead(node)
      return node.value
    } else {
      return -1
    }
  }
  set(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key)
      node.value = value
      this.moveToHead(node)
    } else {
      const node = new ListNode(key, value)
      if (this.size === this.capacity) {
        this.removeTail()
      }
      this.appenToFirst(node)
    }
  }
  removeTail() {
    const tail = this.dummyTail.prev
    this.removeNode(tail)
  }
  moveToHead(node) {
    this.removeNode(node)
    this.appenToFirst(node)
  }
  removeNode(node) {
    const prev = node.prev
    const next = node.next
    prev.next = next
    next.prev = prev
    this.map.delete(node.key)
    this.size--
  }
  appenToFirst(node) {
    const oldHead = this.dummyHead.next
    this.dummyHead.next = node
    node.prev = this.dummyHead
    node.next = oldHead
    oldHead.prev = node
    this.map.set(node.key, node)
    this.size++
  }
}

const lRUCache = new LRUCache(2);
lRUCache.set('a', 1); // 缓存是 {1=1}
lRUCache.set('a', 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get('a'));    // 返回 1
lRUCache.set('b', 1); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.set('c', 1);    // 返回 -1 (未找到)
debugger
console.log(lRUCache.get('a'));    // 返回 -1 (未找到)
