
function getClimbingWays(n) {
  if (n <= 2) return n
  let a = 1, b = 2, tmp
  for (let i = 3; i <= n; i++) {
    tmp = a + b
    a = b
    b = tmp
  }
  console.log(tmp)
}

getClimbingWays(10)