// 每次循环选出最小的放到已排序的末尾位置
function selectSort(arr) {
  let minIndex, tmp
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    tmp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = tmp
  }
}

const list = [3, 5, 4, 2, 8, 1, 9, 10, 6]
selectSort(list)
console.log(list)