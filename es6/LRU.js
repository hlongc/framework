class LRUCache {
  constructor(size) {
    this.size = size
    this.stack = []
    this.map = new Map()
  }
  move(from, to) {
    for (let i = from; i <= to; i++) {
      const tmpKey = this.stack[i]
      const tmpValue = this.map.get(tmpKey)
      tmpValue.index += 1 // 依次往后移动一位
      this.map.set(tmpKey, tmpValue)
    }
  }
  put(key, value) {
    if (this.map.has(key)) { // 存在更新即可，并且更新对应的索引
      const mapValue = this.map.get(key)
      mapValue.value = value
      const prevIndex = mapValue.index
      mapValue.index = 0
      // 更新当前元素之前元素的索引
      this.move(0, prevIndex - 1)
      // 把当前操作的元素放到栈顶
      this.stack.splice(prevIndex, 1)
      this.stack.unshift(key)
    } else { // 不存在就插入
      if (this.stack.length === this.size) { // 超出就删除最久未使用的
        const removeKey = this.stack.pop()
        this.map.delete(removeKey)
      }
      this.move(0, this.stack.length - 1)
      this.stack.unshift(key)
      this.map.set(key, { value, index: 0 })
    }
  }
  get(key) {
    return this.map.has(key) ? this.map.get(key).value : -1
  }
}

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得关键字 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4
