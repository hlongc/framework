function reverseLink(head) {
  let newHead = null, tmp
  while(head) {
    tmp = head.next
    head.next = newHead
    newHead = head
    head = tmp
  }
  return newHead
}

const a = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {},
      },
    },
  },
};

console.log(reverseLink(a))
