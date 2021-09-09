/**
 * @param {character[][]} matrix
 * @return {number}
 */
 var maximalSquare = function(matrix) {
	const dp = Array(matrix.length)
	let maxLength = 0
	for (let i = 0; i < matrix.length; i++) {
			dp[i] = Array(matrix[i].length).fill(0)
			for (let j = 0; j < matrix[i].length; j++) {
					if (matrix[i][j] === '1') {
							// 在第一行、第一列最大面积只可能为1
							if (i === 0 || j === 0) {
									dp[i][j] = 1
							} else {
									// 考虑上一行、前一列、左对角线所能提供的最小值+1也就是当前这个i,j位置作为正方形右下角时能产生最大面积的边长
									dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
							}
					}
					maxLength = Math.max(dp[i][j], maxLength)
			}
	}
	return maxLength ** 2
};