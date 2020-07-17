// 按照mid为界线，左边的比mid小，右边的大于等于mid，然后递归
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const midIndex = Math.floor(arr.length / 2)
  const mid = arr[midIndex]
  arr.splice(midIndex, 1)
  const left = []
  const right = []
  arr.forEach(item => {
    item < mid ? left.push(item) : right.push(item)
  })
  return quickSort(left).concat(mid, quickSort(right))
}

const list = [3, 5, 4, 2, 8, 1, 9, 10, 6]
const res = quickSort(list)
console.log(res)