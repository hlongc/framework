// 二叉树，先创建顶点，然后把其他元素按照左小右大的原则依次放入
class Node{
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
class BinaryTree{
  constructor() {
    this.root = null
  }
  insertNode(currentNode, newNode) {
    if (newNode.val > currentNode.val) { // 如果新插入的节点的值比当前节点的值大，那么就放在当前节点的右侧，否则放在左侧
      if (currentNode.right) { // 如果已经存在右节点，那么递归比较
        this.insertNode(currentNode.right, newNode)
      } else {
        currentNode.right = newNode
      }
    } else {
      if (currentNode.left) {
        this.insertNode(currentNode.left, newNode)
      } else {
        currentNode.left = newNode
      }
    }
  }
  push(el) {
    const node = new Node(el)
    if (!this.root) { // 第一次不存在root节点就存入
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }
}

// 100
// 200
// 80
// 90
// 67
// 89
const binaryTree = new BinaryTree
binaryTree.push(100)
binaryTree.push(200)
binaryTree.push(80)
binaryTree.push(90)
binaryTree.push(67)
binaryTree.push(89)
console.log(binaryTree)