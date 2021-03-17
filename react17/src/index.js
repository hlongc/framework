import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { render } from 'react-dom';

function Child(props, ref) {
  const input = useRef()
  useImperativeHandle(ref,() => ({
    focus() {
      input.current.focus()
    },
    remove() {
      console.log('remove')
    }
  }))
  return <input ref={input} />
}

const ForwardChild = forwardRef(Child)

function App() {
  const child = useRef()
  function focus() {
    child.current.focus()
    child.current.remove()
    // child.current.blur()
  }
  return (
    <div>
      <ForwardChild ref={child} />
      <button onClick={focus}>聚焦</button>
    </div>
  )
}


render(<App />, document.getElementById('root'))
