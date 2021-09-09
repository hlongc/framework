import { useRef, useState } from 'react'
// import { Prompt } from '../react-router-dom'
import { Prompt } from '../pratice/react-router-dom'

const User = props => {
  const [value, setValue] = useState('')
  const [showPrompt, setPrompt] = useState(false)
  
  function handleChange(e) {
    const value = e.target.value
    setValue(value)
    setPrompt(!!value)
  }
  return (
    <div>
      <Prompt
        when={showPrompt}
        message={location => `当前正在编辑中，确定要跳往${location.pathname}吗？`}
      />
      <p>User</p>
      <input value={value} onChange={handleChange} />
      <button onClick={() => props.history.goBack()}>返回</button>
      <button onClick={() => props.history.push('/hlongc/25')}>go to profile</button>
    </div>
  )
}

export default User