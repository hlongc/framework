var hIndex = function(citations) {
  citations.sort((a, b) => a - b);
  let h = 0, i = citations.length - 1; 
  while (i >= 0 && citations[i] > h) {
      h++; 
      i--;
  }
  return h;
};

debugger
console.log(hIndex([3,3,0,6,1,5,7]))

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/h-index/solution/h-zhi-shu-by-leetcode-solution-fnhl/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。