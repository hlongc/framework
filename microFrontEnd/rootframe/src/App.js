import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">home</Link>
        <Link to="/react">React</Link>
        <Link to="/vue">Vue</Link>
        <Route path="/" exact render={() => <h2>hello Home</h2>}></Route>
        <div id="vueContainer"></div>
        <div id="reactContainer"></div>
      </div>
    </BrowserRouter>
  )
}

export default App
