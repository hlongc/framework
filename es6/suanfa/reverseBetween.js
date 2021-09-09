function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
  const dummyHead = new ListNode('dummy')
  dummyHead.next = head
  let current = dummyHead
  let prev = null, next = null, start = null, step = 0
  while(current && step <= right) {
      if (step + 1 === left) {
          prev = current
          start = current.next
      }
      if (step === right) {
          next = current.next
      }
      current = current.next
      step++
  }
  let newHead = next, tmp
  while(start && left <= right) {
      tmp = start.next
      start.next = newHead
      newHead = start
      start = tmp
      left++
  }
  if (prev && prev.val !== 'dummy') {
      prev.next = newHead
  }
  console.log(head)
  return prev && prev.val !== 'dummy' ? prev : newHead
};

const link = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    },
  },
};

debugger;
console.log(reverseBetween(link, 3, 3));
