import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap(props) {
  console.log('react bootstrap', props)
}

export async function mount() {
  render()
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}