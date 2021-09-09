/**
给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
叶子节点 是指没有子节点的节点。
示例 1：
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
示例 2：
输入：root = [1,2,3], targetSum = 5
输出：[]
示例 3：

输入：root = [1,2], targetSum = 0
输出：[]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */


var pathSum = function(root, targetSum) {
  const ret = []
  const getResult = (root, target, answer) => {
      if (!root) return
      if (!root.left && !root.right) {
          if (root.val === target) {
              answer.push(root.val)
              ret.push(answer)
          }
          return
      }
      answer.push(root.val)
      getResult(root.left, target - root.val, answer.slice())
      getResult(root.right, target - root.val, answer.slice())
  }
  getResult(root, targetSum, [])
  return ret
};

const head = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11
    }
  }
}

console.log(pathSum(head, 20))