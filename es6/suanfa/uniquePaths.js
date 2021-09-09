/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
  const dp = Array(m).fill(0).map(_ => Array(n))
  for (let i = 0; i < m; i++) dp[i][0] = 1
  for (let j = 0; j < n; j++) dp[0][j] = 1
  for (let a = 1; a < m; a++) {
      for (let b = 1; b < n; b++) {
          dp[a][b] = dp[a - 1][b] + dp[a][b - 1]
      }
  }
  return dp[m - 1][n - 1]
};

// debugger
// console.log(uniquePaths(3, 7))

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
 var uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = Array(m).fill(0).map(_ => Array(n).fill(0))
  // 遇到障碍物就不初始化为1了，因为后面没办走过去
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) dp[i][0] = 1
  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) dp[0][j] = 1
  for (let a = 1; a < m; a++) {
      for (let b = 1; b < n; b++) {
          if (obstacleGrid[a][b] === 0) { // 当前不是障碍物才继续走
              dp[a][b] = dp[a - 1][b] + dp[a][b - 1]
          }
      }
  }
  return dp[m - 1][n - 1]
};
debugger
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))