function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const ret = [];
  const dfs = (x, y, node) => {
    if (!node) return;
    ret.push([x, y, node.val]);
    dfs(x - 1, y + 1, node.left);
    dfs(x + 1, y + 1, node.right);
  };
  dfs(0, 0, root);
  ret.sort((a, b) => {
    // x不相同，就按照x升序
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    // x相同，按照y的升序
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    // x、y都相同，则按照val的升序
    return a[2] - b[2];
  });
  // 把相同x的放到一组
  const resVal = [[ret[0][2]]];
  const resNode = [ret[0]];
  for (let i = 1; i < ret.length; i++) {
    const [x, , val] = ret[i];
    const prev = resNode[resNode.length - 1];
    if (x === prev[0]) {
      resVal[resVal.length - 1].push(val);
    } else {
      resVal.push([x]);
    }
    resNode.push(ret[i]);
  }
  return resVal;
};

debugger;
verticalTraversal(root);
