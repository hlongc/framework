/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeInBetween = function(list1, a, b, list2) {
  let prev, next
  let cur = 0, tmp = list1
  while(cur++ <= b + 1) { // 停留在第a个元素的前面一个
      if (cur === a - 1) {
          prev = tmp
      } else if (cur === b + 1) {
          next = tmp
      }
      tmp = tmp.next
  }
  let slow = list2, fast = list2.next
  while(fast) {
      slow = slow.next
      fast = fast.next
  }
  prev.next = list2
  slow.next = next
  return list1
};

const link1 = {
  val: 0,
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 5
          } 
        } 
      } 
    }
  }
}
// [0,1,1000000,1000001,1000002,4,5]
const link2 = {
  val: 1000000,
  next: {
    val: 1000001,
    next: {
      val: 1000002
    } 
  } 
}

debugger
console.log(mergeInBetween(link1, 3, 4, link2))