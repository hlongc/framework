/**
n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法

1 <= n <= 9
皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
 */

// const solveNQueens = (n) => {
//   const board = new Array(n);
//   for (let i = 0; i < n; i++) {
//     board[i] = new Array(n).fill(".");
//   }

//   const cols = new Set(); // 列集，记录出现过皇后的列
//   const diag1 = new Set(); // 正对角线集
//   const diag2 = new Set(); // 反对角线集
//   const res = [];

//   const helper = (row) => {
//     if (row == n) {
//       const stringsBoard = board.slice();
//       for (let i = 0; i < n; i++) {
//         stringsBoard[i] = stringsBoard[i].join("");
//       }
//       res.push(stringsBoard);
//       return;
//     }
//     for (let col = 0; col < n; col++) {
//       // 如果当前点的所在的列，所在的对角线都没有皇后，即可选择，否则，跳过
//       if (!cols.has(col) && !diag1.has(row + col) && !diag2.has(row - col)) {
//         board[row][col] = "Q"; // 放置皇后
//         cols.add(col); // 记录放了皇后的列
//         diag1.add(row + col); // 记录放了皇后的正对角线
//         diag2.add(row - col); // 记录放了皇后的负对角线
//         helper(row + 1);
//         board[row][col] = "."; // 撤销该点的皇后
//         cols.delete(col); // 对应的记录也删一下
//         diag1.delete(row + col);
//         diag2.delete(row - col);
//       }
//     }
//   };
//   helper(0);
//   return res;
// };



function solveNQueens(n) {
  const rect = []
  for (let i = 0; i < n; i++) {
    rect[i] = Array(n).fill('.')
  }
  const ret = []
  const column = new Set() // 记录列
  const dig1 = new Set() // 记录正对角线
  const dig2 = new Set() // 记录负对角线

  const helper = row => {
    if (row === n) {
      const clone = rect.slice()
      for (let i = 0, len = clone.length; i < len; i++) {
        clone[i] = clone[i].join('')
      }
      ret.push(clone)
      return
    }
    for (let col = 0; col < n; col++) {
      if (!column.has(col) && !dig1.has(row + col) && !dig2.has(row - col)) {
        rect[row][col] = 'Q'
        column.add(col)
        dig1.add(row + col)
        dig2.add(row - col)
        helper(row + 1)
        // 用完之后回溯回去
        rect[row][col] = '.'
        column.delete(col)
        dig1.delete(row + col)
        dig2.delete(row - col)
      }
    }
  }
  helper(0)
  return ret
}

console.log(solveNQueens(4))
