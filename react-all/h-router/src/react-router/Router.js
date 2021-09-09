import React from 'react'
import RouterContext from './RouterContext'

export default class Router extends React.Component {
  static computeRootMatch = (path) => {
    return { url: '/', path, isExact: path === '/', params: {} }
  }
  constructor(props) {
    super(props)
    const history = this.props.history
    this.state = { location: history.location }
    // 监听hash变化，更新location，重新渲染子元素
    this.unlisten = history.listen(location => {
      this.setState({ location })
    })
  }
  componentWillUnmount() {
    this.unlisten()
  }
  render() {
    const value = {
      history: this.props.history,
      location: this.state.location,
      match: Router.computeRootMatch(this.state.location.pathname)
    }
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}