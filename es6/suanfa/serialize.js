// https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/

/**
请实现两个函数，分别用来序列化和反序列化二叉树。

你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

提示：输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
示例：
输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

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
  const dfs = (node) => {
    if (!node) return "X";
    const left = dfs(node.left);
    const right = dfs(node.right);
    // 采用先序遍历，更好确认根节点
    return node.val + "," + left + "," + right;
  };
  return dfs(root);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  data = data.split(',')
  const dfs = list => {
    const value = list.shift() // 弹出根节点，然后递归创建子节点
    if (value === 'X') {
      return null
    }
    const root = new TreeNode(value)
    root.left = dfs(list)
    root.right = dfs(list)
    return root
  }
  return dfs(data)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const root = {
  val: 1,
  left: {
    val: 2,
  },
  right: {
    val: 3,
    left: {
      val: 4,
    },
    right: {
      val: 5,
    },
  },
};

console.log(deserialize(serialize(root)));
