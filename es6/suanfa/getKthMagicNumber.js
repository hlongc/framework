/**
有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21。

示例 1:

输入: k = 5

输出: 9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/get-kth-magic-number-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} k
 * @return {number}
 */
 var getKthMagicNumber = function(k) {
  // 三路归并
  // 考虑以下三个子数组：
  // s3 = arr[0]*3, arr[1]*3, arr[2]*3,.....
  // s5 = arr[0]*5, arr[2]*5, arr[3]*5.....
  // s7 = arr[0]*7, arr[2]*7, arr[3]*7.....
  // 于是变成了合并三个升序数组并去重的问题, 每次都取出三个数组中最小的那个加入
  // 维护三个指针，每轮循环被选中的哪一个指针需要前进一步
  // 初始化一个数组，长度为k，return arr[k-1]即可
  let ret = Array(k).fill(0)
  ret[0] = 1
  let s3 = 0, s5 = 0, s7 = 0
  for (let i = 1; i < k; i++) {
      ret[i] = Math.min(ret[s3] * 3, ret[s5] * 5, ret[s7] * 7)
      if (ret[i] % 3 === 0) s3++
      if (ret[i] % 5 === 0) s5++
      if (ret[i] % 7 === 0) s7++
  }
  return ret[k - 1]
};

debugger
console.log(getKthMagicNumber(6))