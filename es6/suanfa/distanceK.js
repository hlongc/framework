function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  const ret = [];
  const path = []; // 保存已经寻找过的节点
  let targetNode = null; // 目标节点
  const dfs = (parent) => {
    if (!parent || targetNode) return; // 当前节点为空或者已经找到了就停止
    if (parent.val === target) {
      targetNode = parent;
    }
    if (parent.left) {
      parent.left.parent = parent;
      dfs(parent.left);
    }
    if (parent.right) {
      parent.right.parent = parent;
      dfs(parent.right);
    }
  };
  const find = (node, depth) => {
    if (!node || path.includes(node)) return; // 避免重复寻找，因为往上面找的时候可能还会下探
    path.push(node);
    if (depth === 0) {
      ret.push(node);
      return;
    }
    find(node.left, depth - 1);
    find(node.right, depth - 1);
  };
  dfs(root); // 找到目标节点，并且建立父子关系
  find(targetNode, k); // 目标节点往下寻找
  let current = targetNode;
  while (current) {
    // 目标节点往上寻找
    current = current.parent;
    find(current, --k);
  }
  return ret;
};

const tree = {
  val: 3,
  left: {
    val: 5,
    left: {
      val: 6
    },
    right: {
      val: 2,
      left: {
        val: 7
      },
      right: {
        val: 4
      }
    }
  },
  right: {
    val: 1,
    left: {
      val: 0
    },
    right: {
      val: 8
    }
  }
}
debugger
console.log(distanceK(tree, 5, 2))