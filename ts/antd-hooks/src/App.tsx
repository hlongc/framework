import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import Hello from './routes/hello';
import World from './routes/world';
import 'antd/dist/antd.less';
import './index.less';

const Bar = () => {
  return (
    <>
      <Link to="/hello">hello</Link>
      <Link to="/world/2">world</Link>
      <Link to="/topics">topics</Link>
    </>
  );
};

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  console.log(useRouteMatch());
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();
  // console.log(useParams());
  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

function App() {
  const [count, setCount] = useState<string>('');
  const print = () => {
    console.log(count);
  };
  return (
    <div className="App">
      <Input
        value={count}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCount(e.target.value)
        }
      />
      <Button onClick={print}>console</Button>
      <Router>
        <Bar />
        <Switch>
          <Route path="/hello" component={Hello} />
          <Route path="/world/:id" component={World} />
          <Route path="/topics" component={Topics} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
