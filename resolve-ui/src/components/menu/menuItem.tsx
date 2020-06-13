import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuContext, IMenuContext } from './menu'

export interface MenuItemProps {
  disabled?: boolean;
  index: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { disabled, index, children } = props
  const context: IMenuContext = useContext(MenuContext)
  const classes = classnames('menu-item', {
    'active': context.index === index,
    'disabled': disabled
  })

  function handleClick() {
    context.onSelect(index)
  }

  return (
    <li className={classes} onClick={handleClick}>
      { children }
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem