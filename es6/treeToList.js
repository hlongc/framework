function transformListToTree(list, parentId, id) {
  parentId = parentId || 'parentId'
  id = id || 'id'
  const parentIds = list.map(item => item[parentId])
  const childrenIds = list.map(item => item[id])
  // 找到根节点id
  const root = parentIds.filter(parent => !childrenIds.includes(parent))[0]
  function memo(target) {
    return list.filter(child => {
      if (child[parentId] === target) {
        child.children = memo(child[id])
        return true
      } else {
        return false
      }
    })
  }
  return memo(root)
}

function transformTreeToList(tree) {
  tree = Array.isArray(tree) ? tree : [tree]
  const list = []
  function memo(parents) {
    parents.forEach(item => {
      const children = item.children
      delete item.children
      list.push(Object.assign({}, item))
      if (children && children.length) {
        memo(children)
      }
    })
  }
  memo(tree)
  return list
}