/**
 给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。
示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

class ListNode {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}

function mergeKLists(list) {
  return list.reduce((memo, cur) => {
    let current = cur
    while(current) {
      const next = current.next
      delete current.next
      memo.push(current)
      current = next
    }
    return memo
  }, []).sort((a, b) => a.value - b.value).reduceRight((memo, cur) => (cur.next = memo, memo = cur, memo), null)
}

const linked1 = {
  value: 1,
  next: {
    value: 4,
    next: {
      value: 5
    }
  }
}

const linked2 = {
  value: 1,
  next: {
    value: 3,
    next: {
      value: 4
    }
  }
}

const linked3 = {
  value: 2,
  next: {
    value: 6,
  }
}

const ret = mergeKLists([linked1, linked2, linked3])
console.log(ret)