import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Auth from './components/Auth';
import Login from './routes/login';
import Dashboard from './routes/dashborad';
import Header from 'components/Header';
import Barrage from './routes/barrage';
import './App.less';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Auth />
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard/:id/:age" component={Dashboard} />
          <Route path="/barrage" component={Barrage} />
          <Redirect to="/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
