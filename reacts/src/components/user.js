import React from 'react'
import { NavLink, Route } from '../react-router-dom'
import Add from './add'
import List from './list'
import Detail from './detail'

export default function User() {
  return (
    <>
      用户中心
      <ul>
        <li><NavLink to="/user/add">新增</NavLink></li>
        <li><NavLink to="/user/list">列表</NavLink></li>
      </ul>
      <Route path="/user/add" component={Add} />
      <Route path="/user/list" component={List} />
      <Route path="/user/detail/:id" component={Detail} />
    </>
  )
}