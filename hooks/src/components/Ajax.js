import React, { useState, useEffect } from 'react'

function useFetch(url) {
  const [offset, setOffset] = useState(0)
  const [list, setList] = useState([])
  const limit = 5

  useEffect(() => {
    async function load() {
      setList([]) // ①
      const res = await fetch(`${url}?offset=${offset}&limit=${limit}`).then(res => res.json())
      setList([...list, ...res]) // ①处设置为空数组，但是因为setList是异步的，不能立刻拿到最新值，还是拿到之前的值，所以可以继续合并
    }
    load()
  }, [offset])

  function load() {
    setOffset(offset + limit)
  }

  return [list, load]
}

export default function List() {
  const [list, getList] = useFetch('http://localhost:8000/users')
  if (list === null || list.length === 0) return <div>loading...</div>
  return (
    <>
      <ul>
        {
          list.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
      <button onClick={getList}>加载更多</button>
    </>
  )
}