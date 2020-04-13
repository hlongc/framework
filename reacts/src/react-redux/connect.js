import React, { useState, useEffect, useContext } from 'react'
import ReactReduxContext from './ReactReduxContext'
import { bindActionCreators } from '../redux'

export default function connect(mapStateToProps = () => {}, mapDispatchToProps = {}) {
  return function(Component) {
    return function(props) {
      const { store } = useContext(ReactReduxContext)
      const [state, setState] = useState(mapStateToProps(store.getState()))
      // useState使用函数方式，会惰性加载，只会在组件渲染时执行一次,更新时不会再次执行
      const [boundActions] = useState(() => bindActionCreators(mapDispatchToProps, store.dispatch))
      useEffect(() => {
        // 执行了dispatch以后刷新视图
        return store.subscribe(() => {
          setState(mapStateToProps(store.getState()))
        })
      }, [])
      
      return <Component {...props} { ...state } { ...boundActions } />
    }
  }
}