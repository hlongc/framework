
// 求二叉树的右视图
function rightSideView(root) {
  const ret = []
  const dfs = (node, depth) => {
    if (!node) return
    if (ret[depth] === undefined) {
      ret[depth] = node.val
    }
    dfs(node.right, depth + 1)
    dfs(node.left, depth + 1)
  }
  dfs(root, 0)
  return ret
}

const node = {
  val: 1,
  left: {
    val: 2,
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    right: {
      val: 4
    }
  }
}

// console.log(rightSideView(node))
console.dir(node, { depth: null })