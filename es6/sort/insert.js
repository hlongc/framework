const twoSort = (arr) => {
  const length = arr.length;

  for (let i = 1; i < length; i++) {
    const currentNumber = arr[i];

    let j = i - 1;

    // 前面都是已经排好序的
    while (j >= 0 && currentNumber < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    // 跳出循环时要么j < 0，就说明当前的值比前面的值都小，就应该放在第0个
    // 要么当前的值不是最小的，那么在正确的位置停下
    arr[j + 1] = currentNumber;
  }

  return arr;
};

console.log(twoSort([7, 3, 2, 4, 6, 5, 1])); // [ 1, 2, 3, 4, 5, 6, 7 ]

