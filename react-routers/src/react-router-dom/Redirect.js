import React, { useContext } from 'react'
import RouterContext from './RouterContext'

export default function Switch(props) {
  const context = useContext(RouterContext)
  const pathname = context.location.pathname // 拿到当前的路径
  if (!props.from || props.from === pathname) { // 如果当前没传入或者传入的from与当前匹配成功则重定向
    context.history.push(props.to)
  }
  return null // 全部匹配失败就返回null
}