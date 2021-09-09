// 每次循环选出最小的放到已排序的末尾位置
function selectSort(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let minIndex = i
    let j = i + 1
    while(j < len) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
      j++
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}

const list = [5, 4, 7, 9, 2, 0, 6, 3]
selectSort(list)
console.log(list)