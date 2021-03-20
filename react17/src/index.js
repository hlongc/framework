import React, { useState, useEffect } from 'react'
import { render } from 'react-dom';

function useRequest(url) {
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 5

  function loadMore() {
    setData(null)
    fetch(`${url}?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(r => {
        setData([...data, ...r])
        setOffset(offset + r.length)
      })
      .catch(e => {
        console.error(e)
      })
  }

  useEffect(loadMore, [])
  return [data, loadMore]
}

function  App() {
  const [data, loadMore] = useRequest('http://localhost:8000/info')
  if (data === null) {
    return <div>loading...</div>
  }
  return (
    <div>
      <ul>
        {
          data.map(item => <li key={item.id}>{item.name} {item.id}</li>)
        }
      </ul>
      <button onClick={loadMore}>加载更多</button>
    </div>
  )
}


render(<App />, document.getElementById('root'))
