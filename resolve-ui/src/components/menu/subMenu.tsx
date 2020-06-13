import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuContext, IMenuContext, MenuItemProps } from '.'

export interface SubMenuProps {
  title: string;
  index?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ title, index, children }) => {
  // 检测子元素是否是MenuItem 或者SubMenu
  function renderChild() {
    const childrens = React.Children.map(children, (child, index) => {
      const childInstance = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childInstance.type
      if (displayName === 'MenuItem') {
        return child
      } else {
        console.error('Menu Component has a child which is not MenuItem')
        return null
      }
    })
    return (
      <li className='submenu'>
        <p className='submenu-title'>
          { title }
        </p>
        <ul className='resolve-menu'>
          { children }
        </ul>
      </li>
    )
  }
  return renderChild()
}

SubMenu.displayName = 'SubMenu'

export default SubMenu