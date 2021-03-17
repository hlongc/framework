import React, { useEffect, useRef, useLayoutEffect } from './react'
import { render } from './react-dom';

function App() {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  const div = useRef()
  useLayoutEffect(() => {
    div.current.style.WebkitTransform = 'translate(500px)'
    div.current.style.transition = 'all 0.5s'
  }, [])
  return (
    <div ref={div} style={style}>测试一下</div>
  )
}

// function App() {
//   const [number, setNumber] = useState(0)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log('开启11')
//       setNumber(number => number + 1)
//     }, 1000)
//     return () => {
//       console.log('清除')
//       clearInterval(timer)
//     }
//   })
//   return (
//     <div>{number}</div>
//   )
// }

render(<App />, document.getElementById('root'))
