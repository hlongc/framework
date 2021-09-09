
function Node(val) {
  this.val = val
  this.next = null
}

function removeK(node, k) {
  const dummy = new Node()
  dummy.next = node
  let fast = slow = dummy
  while(k-- >= 0) {
    fast = fast.next
  }
  while(fast) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return node
}

const link = {
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

const r = removeK(link, 2)
console.log(r === link)