import React, { useState, memo, useMemo, useCallback } from './react'
import { render } from './react-dom';

function Child({ data, addNum }) {
  console.log('Child render')
  return (
    <div>
      <p>Child num: {data.num}</p>
      <button onClick={addNum}>+num</button>
    </div>
  )
}

const MemoChild = memo(Child)

function Parent() {
  console.log('Parent render')
  const [count, setCount] = useState(5)
  const [num, setNum] = useState(10)
  const data = useMemo(() => ({ num }), [num])
  const addNum = useCallback(() => setNum(num + 1), [num])
  return (
    <div>
      <p>Parent count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count+</button>
      <MemoChild data={data} addNum={addNum} />
    </div>
  )
}

render(<Parent />, document.getElementById('root'))