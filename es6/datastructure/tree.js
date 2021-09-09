
class Node {
  constructor(value, parent) {
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }
}

class BST {
  constructor(compare) {
    this.root = null
    this.size = 0
    this.compare = typeof compare === 'function' ? compare : this.compare
  }
  compare(newNode, oldNode) {
    return newNode.value - oldNode.value
  }
  add(value) {
    if (!this.root) {
      this.root = new Node(value, null)
      this.size++
      return
    }
    let compare, parent, current = this.root
    const node = new Node(value, null)
    // 小的放左边，大的放右边
    while (current) {
      parent = current
      compare = this.compare(node, current)
      if (compare > 0) {
        current = current.right
      } else if (compare < 0) {
        current = current.left
      } else {
        current.value = value
        return
      } 
    }
    node.parent = parent
    if (compare > 0) {
      parent.right = node
    } else {
      parent.left = node
    }
    this.size++
  }
  // 前序遍历 根 => 左子树 => 右子树
  preorderTraversal(visitor) {
    if (!visitor) return
    const traversal = node => {
      visitor.visit(node)
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 中序遍历 左子树 => 根 => 右子树
  inorderTraversal(visitor) {
    if (!visitor) return
    const traversal = node => {
      if (node === null) return
      traversal(node.left)
      visitor.visit(node)
      traversal(node.right)
    }
    traversal(this.root)
  }
  // 后序遍历 左子树 => 右子树 => 根
  postorderTraversal(visitor) {
    if (!visitor) return
    const traversal = node => {
      if (node === null) return
      traversal(node.left)
      traversal(node.right)
      visitor.visit(node)
    }
    traversal(this.root)
  }
  // 层级遍历 从上往下，从左往右
  levelOrderTraversal(visitor) {
    const stack = [this.root]
    let index = 0, current
    
    while(current = stack[index++]) {
      visitor.visit(current)
      if (current.left) {
        stack.push(current.left)
      }
      if (current.right) {
        stack.push(current.right)
      }
    }
  }
  // 反转二叉树
  reverse() {
    const reverse = node => {
      if (node === null) {
        return;
      }
      [node.left, node.right] = [node.right, node.left];
      reverse(node.left)
      reverse(node.right)
    }
    reverse(this.root)
    return this.root
  }
}

const bst = new BST()

bst.add(10)
bst.add(8)
bst.add(19)
bst.add(6)
bst.add(22)
bst.add(15)
bst.add(20)

let str1 = ''
let str2 = ''

bst.inorderTraversal({
  visit(node) {
    str1 += (node.value + '=>')
  }
})
console.log(str1.slice(0 ,-2))

bst.reverse()

bst.inorderTraversal({
  visit(node) {
    str2 += (node.value + '=>')
  }
})
console.log(str2.slice(0 ,-2))