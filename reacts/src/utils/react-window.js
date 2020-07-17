import React, { useState, useRef, useEffect } from 'react'

export function FixedSizeList(props) {
  const [start, setStart] = useState(0)
  const { height, width, itemCount, itemSize } = props
  const container = useRef()
  // 监听滚动事件
  useEffect(() => {
    function monitor() {
      console.log('滚动')
      const scrollTop = container.current.scrollTop
      const start = Math.floor(scrollTop / itemSize) + 1
      setStart(start)
    }
    container.current.addEventListener('scroll', function() {
      monitor()
    })
    // container.current.addEventListener('scroll', monitor)
    return container.current.removeEventListener('scroll', monitor)
  }, [])

  const children = []
  const containerStyle = {
    height,
    width,
    position: 'relative',
    overflow: 'auto'
  }
  const itemStyle = {
    width: '100%',
    height: itemSize,
    position: 'absolute',
    left: 0,
    top: 0
  }
  const count = Math.floor(height / itemSize) + 1
  for (let i = start; i < start + count; i++) {
    children.push(props.children({ index: i, style: { ...itemStyle, top: i * itemSize } }))
  }

  return (
    <div ref={container} style={containerStyle}>
      <div style={{ height: itemCount * itemSize, width: '100%' }}>
        { children }
      </div>
    </div>
  )
}