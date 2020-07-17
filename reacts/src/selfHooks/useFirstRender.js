import { useRef, useEffect } from 'react'
// 自定义hooks: 组件是否为初次渲染还是为更新
export default function useFirstRender() {
  const firstRender = useRef(true)
  useEffect(() => {
    firstRender.current = false
  }, [])
  return firstRender.current
}