import React from 'react'
import { Link, Route } from '../react-router-dom'
import Add from './Add'
import List from './List'
import Detail from './Detail'

export default function User(props) {
  return (
    <div>
      <Link to="/user/list">列表</Link>
      <Link to="/user/add">增加</Link>
      <Route path="/user/list" component={List}></Route>
      <Route path="/user/add" component={Add}></Route>
      <Route path="/user/detail/:id" component={Detail}></Route>
    </div>
  )
}