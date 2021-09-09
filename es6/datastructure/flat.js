
const list = [
  { name: '123', id: 3, pid: 0 },
  { name: '456', id: 1, pid: 2 },
  { name: '789', id: 2, pid: 0 },
  { name: '666', id: 0, pid: -1 },
  { name: '555', id: 4, pid: 2 },
  { name: '333', id: 5, pid: 1 },
  { name: '999', id: 8, pid: 0 },
]

function listToTree(arr) {
  const childrenIds = arr.map(item => item.id) // 找到所有孩子的id
  let root
  arr.forEach(item => {
    if (!childrenIds.includes(item.pid)) {
      root = item
    }
  })
  let current = 1
  const dfs = parent => {
    if (current === arr.length) return // 所有元素都被用过一次，说明遍历结束
    parent.children = []
    arr.forEach(child => {
      if (child.pid === parent.id) {
        current++
        dfs(child)
        parent.children.push(child)
      }
    })
  }
  dfs(root)
  return root
}

console.log(listToTree(list))