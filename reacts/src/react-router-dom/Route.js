import React from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

export default class Route extends React.Component {
  static contextType = RouterContext
  render() {
    const { path = '/', component: Component, exact = false, render, children } = this.props
    const pathname = this.context.location.pathname // 当前url上的pathname
    let paramNames = []
    const reg = pathToRegexp(path, paramNames, { end: exact })
    paramNames = paramNames.map(item => item.name) // 获取/user/detial/:id中的id
    const matched = pathname.match(reg)
    if (matched) { // 路径匹配成功
      // url = /user/detial/100 values = [100]
      const [url, ...values] = matched
      const params = values.reduce((memo, value, index) => {
        memo[paramNames[index]] = value
        return memo
      }, {})
      const props = {
        ...this.context,
        match: {
          url,
          path,
          params,
          isExact: url === pathname
        }
      }
      /**
       * Route渲染的三种方式
       * 1、component 路径匹配时渲染
       * 2、render 路径匹配时渲染，传入props属性，渲染render函数的返回值
       * 3、children 路径是否匹配都会渲染，传入props属性，渲染render函数的返回值
       */
      if (Component) {
        return <Component {...props} />
      } else if (render) {
        return render(props)
      } else if (children) {
        return children(props)
      } else {
        return null
      }
    } else {
      if (children) {
        return children(this.context)
      } else {
        return null
      }
    }
  }
}