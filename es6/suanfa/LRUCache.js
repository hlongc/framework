class ListNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.size = 0
    this.cache = new Map()
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1
    }
    const node = this.cache.get(key)
    this.moveToHead(node)
    return node.value
  }
  put(key, value) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)
      node.value = value
      this.moveToHead(node)
    } else {
      const node = new ListNode(key, value)
      this.size++
      if (this.size > this.capacity) {
        this.removeTail()
      }
      this.addToHead(node)
      this.cache.set(key, node)
    }
  }
  removeTail() {
    const tail = this.dummyTail.prev
    this.removeNodeFromList(tail)
    this.size--
    return tail
  }
  moveToHead(node) {
    this.removeNodeFromList(node)
    this.addToHead(node)
  }
  removeNodeFromList(node) {
    const prev = node.prev
    const next = node.next
    prev.next = next
    next.prev = prev
    this.cache.delete(node.key)
  }
  addToHead(node) {
    const oldHead = this.dummyHead.next
    this.dummyHead.next = node
    node.prev = this.dummyHead
    node.next = oldHead
    oldHead.prev = node
    this.cache.set(node.key, node)
  }
}
debugger
const lRUCache = new LRUCache(2);
lRUCache.put('a', 1); // 缓存是 {1=1}
lRUCache.put('a', 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get('a'));    // 返回 1
lRUCache.put('b', 1); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.put('c', 1);    // 返回 -1 (未找到)
console.log(lRUCache.get('a'));    // 返回 -1 (未找到)
