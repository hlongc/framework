import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import axios from 'axios'
import { cloneDeep, clone } from 'lodash-es'
import { add } from './common'

function Child(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus() {
      handleFocus()
    },
    greet() {
      console.log('hello ')
    }
  }))
  function handleRequest() {
    axios.get('/test')
  }
  function handleFocus() {
    const arr = [1, 2, 3]
    console.log(cloneDeep(arr))
    console.log(add(1, 99))
    inputRef.current.focus()
  }
  function handleBlur() {
    inputRef.current.blur()
  }
  return (
    <>
      <p>我是子元素</p>
      <button onClick={handleRequest}>发起请求</button>
      <button onClick={handleBlur}>失去焦点</button>
      <input ref={inputRef} />
    </>
  )
}

export default forwardRef(Child)