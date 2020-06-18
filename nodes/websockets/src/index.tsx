import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const socket = io('ws://localhost:3333')

interface Message {
  id: string;
  user: string;
  message: string
}

function App() {
  const [list, setList] = useState<Message[]>([])
  const prevList = useRef<Message[]>([]) // 使用ref记住上一次list的值
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    socket.on('message', (msg: string) => {
      const res: Message = JSON.parse(msg)
      prevList.current = [...prevList.current, res]
      setList(prevList.current)
    })
  }, [])

  function handleUp(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      if (!message) return
      socket.emit('message', JSON.stringify({
        id: +new Date(),
        user: name,
        message
      }))
      setMessage('')
    }
  }
  return (
    <>
      <p>
        姓名: <input value={name} onChange={e => setName(e.target.value.trim())} />
      </p>
      <p>
        <input value={message} onChange={e => setMessage(e.target.value.trim())} onKeyUp={handleUp} />
      </p>
      <ul>
        {
          list.map(item => {
            return <li key={item.id}>{item.user}: {item.message}</li>
          })
        }
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

