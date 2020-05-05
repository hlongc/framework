var searchRange = function(nums, target) {
  let left = 0;
  let mid;
  let right = nums.length;
  while(left < right) {
      mid = (left + right) >>> 1;
      if (nums[mid] > target) {
          right = mid;
      } else if (nums[mid] < target) {
          left = mid + 1;
      } else if (nums[mid] == target) {
          right = mid;
      }
  }
  let leftIndex = -1, rightIndex = -1;
  if (left == nums.length) return [-1, -1];
  else leftIndex = nums[left] == target ? left : -1;

  left = 0; right = nums.length;
  while(left < right) {
      mid = (left + right) >>> 1;
      if (nums[mid] > target) {
          right = mid;
      } else if (nums[mid] < target) {
          left = mid + 1;
      } else if (nums[mid] == target) {
          left = mid + 1;
      }
  }
  if (left == 0) return [-1, -1];
  else rightIndex = nums[left - 1] == target ? left - 1: -1;
  
  return [leftIndex, rightIndex];
};

console.log(searchRange([1,2,3,5,6,8,3], 3))