
function Calculate(A, B, count) {
  const range = B - A
  let i = 1
  let sum = 0
  while (i <= count) {
    sum += Math.pow(2, i - 1)
    i++
  }
  console.log(`一共翻倍${sum}次`)

  const ret = range / sum
  console.log(`基数为: ${ret}`)

  let j = 1
  while (j <= count + 2) {
    console.log(`第${j}个数为: ${A + (j > 1 ? ret * Math.pow(2, j - 2) : 0)}`)
    j++
  }
}

// 220代表A，433代表B，17代表中间的个数
Calculate(220, 433, 17)