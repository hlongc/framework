import React from 'react'

export default class LifeCycle extends React.Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount(this)
  }
  componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount(this)
  }
  render() {
    return null
  }
}