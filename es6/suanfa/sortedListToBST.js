/**
给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。
本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
示例:
给定的有序链表： [-10, -3, 0, 5, 9],
一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (!head) return null;
  const data = [];
  let current = head;
  while (current) {
    data.push(current.val);
    current = current.next;
  }
  
  const buildBST = (start, end) => {
    if (start > end) return null;
    const mid = (start + end) >>> 1;
    const root = new TreeNode(data[mid]);
    root.left = buildBST(start, mid - 1);
    root.right = buildBST(mid + 1, end);
    return root;
  };
  return buildBST(0, data.length - 1);
};

// [-10, -3, 0, 5, 9]
const head = {
  val: -10,
  next: {
    val: -3,
    next: {
      val: 0,
      next: {
        val: 5,
        next: {
          val: 9
        }
      }
    }
  }
}

console.log(sortedListToBST(head))