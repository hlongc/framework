
/**
 * 
 * @param {number[]} arr 
 */
function removeZero(arr) {
  let slow = 0
  for (let fast = 0; fast < arr.length; fast++) {
    if (arr[fast] !== 0) {
      [arr[fast], arr[slow]] = [arr[slow], arr[fast]]
      slow++
    }
  }
}

const list = [1, 0, 2, 0, 3, 0, 5, 6]

removeZero(list)
console.log(list)