import React, { useContext } from 'react'
import pathToRegexp from 'path-to-regexp'
import RouterContext from './RouterContext'

/**
 * Route渲染的三种方式
 * 1、component
 * 2、render
 */

export default function Route(props) {
  const context = useContext(RouterContext)
  const { path = '/', component: Component, exact = false, render } = props
  const pathname = context.location.pathname
  let paramsName = []
  // exact 表示是否精准匹配
  // /user/detail/:id  /user/detail/1223243
  const reg = pathToRegexp(path, paramsName, { end: exact })
  paramsName = paramsName.map(item => item.name) // ['id']
  const matched = pathname.match(reg)
  if (matched) {
    const [url, ...values] = matched // values: ['1223243']
    const params = paramsName.reduce((memo, cur, index) => {
      memo[cur] = values[index]
      return memo
    }, {})
    // 构造路由组件的三个属性
    const routeProps = {
      history: context.history,
      location: context.location,
      match: {
        path,
        url,
        params,
        isExact: path === url
      }
    }
    if (Component) {
      return <Component {...routeProps} />
    } else if (render) {
      return render(routeProps)
    } else {
      return null
    }
  }
  return null
}

// export default class Route extends React.Component {
//   static contextType = RouterContext
//   render() {
//     const { path = '/', component: Component, exact = false } = this.props
//     const pathname = this.context.location.pathname
//     let paramsName = []
//     // exact 表示是否精准匹配
//     // /user/detail/:id  /user/detail/1223243
//     const reg = pathToRegexp(path, paramsName, { end: exact })
//     paramsName = paramsName.map(item => item.name) // ['id']
//     const matched = pathname.match(reg)
//     if (matched) {
//       const [url, ...values] = matched // values: ['1223243']
//       const params = paramsName.reduce((memo, cur, index) => {
//         memo[cur] = values[index]
//         return memo
//       }, {})
//       // 构造路由组件的三个属性
//       const routeProps = {
//         history: this.context.history,
//         location: this.context.location,
//         match: {
//           path,
//           url,
//           params,
//           isExact: path === url
//         }
//       }
//       return <Component {...routeProps} />
//     }
//     return null
//   }
// }