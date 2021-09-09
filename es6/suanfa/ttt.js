function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return "null";
  return `${root.val}-${serialize(root.left)}-${serialize(root.right)}`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const nodes = data.split("-");
  const helper = () => {
    const cur = nodes.shift();
    if (cur === "null") return null;
    const node = new TreeNode(+cur);
    node.left = helper();
    node.right = helper();
    return node;
  };
  return helper();
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 6
    },
    right: {
      val: 7,
      left: {
        val: 8
      }
    }
  },
  right: {
    val: 3,
    left: { val: 4 },
    right: { val: 5 },
  },
};

const t = serialize(root);
console.log(t);
console.log(deserialize(t));
