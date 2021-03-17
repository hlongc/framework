import { Component, PureComponent } from './Component'
import { useState, useMemo, useCallback, memo, useReducer, useEffect, useLayoutEffect, useRef, forwardRef, useImperativeHandle } from '../react-dom'
import { wrapVNode } from '../shared/utils'
import { createContext, useContext } from './Context'

/**
 * 创建虚拟dom
 * @param {*} type 元素类型
 * @param {*} config 属性
 * @param {*} children 孩子节点
 */
function createElement(type, config, children) {
  let key, ref
  if (config) {
    key = config.key
    ref = config.ref || null
    delete config.__self
    delete config.__source
    delete config.key
    delete config.ref
  }
  const props = { ...config }
  if (children !== null || children !== undefined) {
    props.children = arguments.length > 3 ? [].slice.call(arguments, 2).map(wrapVNode) : wrapVNode(children)  
  } else {
    props.children = null
  }
  return {
    type,
    props,
    key,
    ref
  }
}

/**
 * render返回的内容及渲染的结果如下：
1、React elements. Typically created via JSX. For example, <div /> and <MyComponent /> are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
2、Arrays and fragments. Let you return multiple elements from render. See the documentation on fragments for more details.
3、Portals. Let you render children into a different DOM subtree. See the documentation on portals for more details.
4、String and numbers. These are rendered as text nodes in the DOM.
5、Booleans or null. Render nothing. (Mostly exists to support return test && <Child /> pattern, where test is boolean.)
 */

/**
 * 返回一个克隆的target元素并合并属性
 * @param {*} target 被克隆的react元素
 * @param {*} props 需要合并的属性
 * @param {*} children 新增的儿子
 */
function cloneElement(target, props, ...children) {
  let allChildren = []
  let oldChildren = props.children
  if (Array.isArray(oldChildren)) {
    allChildren = [...oldChildren]
  } else if (typeof oldChildren === 'object' && oldChildren !== null) {
    allChildren = [oldChildren]
  } else if (typeof oldChildren === 'number' || typeof oldChildren === 'string') {
    allChildren = [oldChildren]
  }
  
  if (Array.isArray(children)) {
    allChildren.push(...children)
  } else if (typeof oldChildren === 'object' && oldChildren !== null) {
    allChildren.push(oldChildren)
  } else if (typeof oldChildren === 'number' || typeof oldChildren === 'string') {
    allChildren.push(oldChildren)
  }
  allChildren = allChildren.map(wrapVNode)
  if (allChildren.length === 0) {
    props.children = undefined
  } else if (allChildren.length === 1) {
    props.children = allChildren[0]
  } else {
    props.children = allChildren
  }
  const allProps = { ...target.props, ...props }
  return {
    ...target,
    props: allProps
  }
}

function createRef() {
  return { current: null }
}

const React = {
  createElement,
  Component,
  PureComponent,
  createRef,
  createContext,
  useContext,
  cloneElement,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  memo
}

export {
  createElement,
  Component,
  PureComponent,
  createRef,
  createContext,
  useContext,
  cloneElement,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  memo
}

export default React