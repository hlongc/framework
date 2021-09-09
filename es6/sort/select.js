// 每次循环选出最小的放到已排序的末尾位置
function selectSort(arr) {
  let minIndex
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j].count < arr[minIndex].count) {
        minIndex = j
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
}

const list = [
  { count: 3, key: 'a' },
  { count: 3, key: 'b' },
  { count: 5, key: 'c' },
  { count: 4, key: 'd' },
  { count: 4, key: 'e' },
  { count: 4, key: 'f' },
  { count: 2, key: 'g' },
]
selectSort(list)
console.log(list)