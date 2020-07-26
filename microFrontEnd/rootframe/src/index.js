import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, start } from 'qiankun'
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerMicroApps([
  {
    name: 'reactApplication',
    entry: '//localhost:3001',
    container: '#reactContainer',
    activeRule: '/react',
    props: { name: 'hlc' }
  },
  {
    name: 'vueApplication',
    entry: '//localhost:8080',
    container: '#vueContainer',
    activeRule: '/vue'
  }
])

start()

