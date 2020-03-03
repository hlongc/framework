import React, { useContext } from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

export default function Switch(props) {
  const context = useContext(RouterContext)
  const pathname = context.location.pathname // 拿到当前的路径
  const children = props.children // 取出所有子元素
  for (let i = 0; i < children.length; i++) { // 遍历进行匹配
    const child = children[i]
    const { path = '/', component, exact = false } = child.props
    const reg = pathToRegexp(path, [], { end: exact }) // 根据path生产正则表达式
    if (pathname.match(reg)) { // 如果匹配成功就直接返回
      return child // 返回react元素
    }
  }
  return null // 全部匹配失败就返回null
}