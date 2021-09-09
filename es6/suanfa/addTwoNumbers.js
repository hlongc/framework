/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
 function ListNode(val) {
  this.val = val;
  this.next = null;
 }

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function (l1, l2) {
  let sum, k = 0 // 进位
  const ret = new ListNode()
  let tmp = ret
  while(l1 || l2 || k) {
    sum = ((l1 && l1.val) || 0) + (l2 && l2.val || 0) + k
    k = sum > 9 ? 1 : 0
    tmp = tmp.next = new ListNode(sum % 10)
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  return ret.next
};

const l1 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9,
        next: {
          val: 9,
          next: {
            val: 9,
            next: {
              val: 9
            }
          }
        }
      }
    }
  }
}

const l2 = {
  val: 9,
  next: {
    val: 9,
    next: {
      val: 9,
      next: {
        val: 9
      }
    }
  }
}
debugger
console.log(addTwoNumbers(l1, l2))