const Home = props => {
  console.log('Home', props)
  return (
    <div>
      <p>Home</p>
      <button onClick={() => props.history.goForward()}>前进</button>
      <button onClick={() => props.history.push('/user', { name: 'user' })}>去user</button>
    </div>
  )
}

export default Home