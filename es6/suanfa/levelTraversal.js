

function levelOrder(root) {
  if (!root) return []
  const ret = [root]
  let i = 0
  while(i < ret.length) {
    const current = ret[i]
    ret[i] = current.val
    if (current.left) {
      ret.push(current.left)
    }
    if (current.right) {
      ret.push(current.right)
    }
    i++
  }
  return ret
}

const root = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}

console.log(levelOrder(root))