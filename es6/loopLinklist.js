
function dispatch(queue, action) {
  const update = { action, next: null }
  if (queue.pending === null) {
    
  } else {

  }
  queue.pending = update
}

const queue = { pending: null }