/**
根据一棵树的前序遍历与中序遍历构造二叉树。
注意:
你可以假设树中没有重复的元素。
例如，给出
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// const buildTree = (preorder, inorder) => {
//   if (inorder.length == 0) return null;
//   const root = new TreeNode(preorder[0]);
//   const mid = inorder.indexOf(preorder[0]); // 说明左子树一共有多少个
//   root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
//   root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
//   return root;
// };


const buildTree = (preorder, inorder) => {
  const map = new Map() // 建立值和索引的关系，避免每次都用indexOf来取值
  for(let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i)
  }
  const helper = (p_start, p_end, i_start, i_end) => {
    if (p_start > p_end) return null
    const rootValue = preorder[p_start]
    const root = new TreeNode(rootValue)
    const mid = map.get(rootValue) // 也代表左子树的个数
    const left_count = mid - i_start
    root.left = helper(p_start + 1, p_start + left_count, i_start, mid)
    root.right = helper(p_start + left_count + 1, p_end, mid + 1, i_end)
    return root
  }
  return helper(0, preorder.length - 1, 0, inorder.length - 1)
};

// let mid = map.get(rootVal);         // 根节点在inorder的位置
// let leftNum = mid - i_start;        // 左子树的节点数
// root.left = helper(p_start + 1, p_start + leftNum, i_start, mid - 1);
// root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);


// 根 | 左 | 右            左 | 根 | 右
console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
